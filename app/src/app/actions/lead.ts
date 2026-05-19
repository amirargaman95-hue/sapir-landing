"use server";

// Lead form Server Action (Next 16 / React 19 useActionState signature).
// Signature: (prevState: LeadState, formData: FormData) => Promise<LeadState>
//
// NOTE: a "use server" module may export async functions ONLY.
// LeadState / leadInitialState live in ./lead-types (no "use server").
//
// Source of truth = Supabase (insert first), Resend = notification only.
// Success (ok:true + "תודה") is returned ONLY if BOTH the Supabase insert
// AND the Resend email succeed. Any failure — including missing Supabase
// OR Resend env — is a failure: ok:false + WhatsApp fallback, never "תודה".
// Failures are logged so we can see the reason in e2e.

import { createClient } from "@supabase/supabase-js";
import {
  LEAD_INDUSTRIES,
  type LeadIndustry,
  type LeadState,
  type LeadValues,
} from "./lead-types";

// Israeli phone: optional +972, 9-10 digits, allow spaces/dashes.
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  const local = digits.replace(/^\+?972/, "0");
  if (/^0\d{8,9}$/.test(local)) return local;
  return null;
}

type LeadRecord = {
  name: string;
  phone: string;
  factory_name: string | null;
  industry: LeadIndustry;
  region: null;
  message: null;
  source: "landing_lead_form";
};

// Insert into Supabase `leads`. Missing env => throw (lead not saved).
async function insertLead(record: LeadRecord): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error(
      `[lead] supabase insert failed (env missing). name=${record.name} phone=${record.phone}`
    );
    throw new Error("Supabase env missing");
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // status omitted — DB default ('new') applies.
  const { error } = await supabase.from("leads").insert(record);
  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
}

// Notification email. Blocking: failure here fails the submit.
async function notifyByEmail(record: LeadRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "leads@sapirazulay.co.il";

  if (!apiKey || !to) {
    console.error(
      `[lead] email delivery failed (env missing). name=${record.name} phone=${record.phone}`
    );
    throw new Error("Resend env missing");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `ליד חדש מהאתר — ${record.name}`,
      text: `שם: ${record.name}\nטלפון: ${record.phone}\nשם המפעל: ${
        record.factory_name ?? "-"
      }\nתחום: ${record.industry}\nמקור: ${record.source}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${detail}`);
  }
}

export async function submitLead(
  _prevState: LeadState,
  formData: FormData
): Promise<LeadState> {
  const name = String(formData.get("name") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const factoryName = String(formData.get("factory_name") ?? "").trim();
  const industryRaw = String(formData.get("industry") ?? "").trim();
  // Honeypot — renamed from `company` so it never collides with "שם המפעל".
  const honeypot = String(formData.get("_hp") ?? "").trim();

  const values: LeadValues = {
    name,
    phone: phoneRaw,
    factory_name: factoryName,
    industry: industryRaw,
  };

  if (honeypot) {
    // Silently accept to avoid signaling the bot it was caught.
    return { ok: true, message: "" };
  }

  if (name.length < 2) {
    return { ok: false, message: "נא להזין שם.", values };
  }

  const phone = normalizePhone(phoneRaw);
  if (!phone) {
    return { ok: false, message: "נא להזין מספר טלפון תקין.", values };
  }

  if (!LEAD_INDUSTRIES.includes(industryRaw as LeadIndustry)) {
    return { ok: false, message: "נא לבחור תחום מהרשימה.", values };
  }

  const record: LeadRecord = {
    name,
    phone,
    factory_name: factoryName || null,
    industry: industryRaw as LeadIndustry,
    region: null,
    message: null,
    source: "landing_lead_form",
  };

  // Order: Supabase first (source of truth). A DB failure fails the submit.
  try {
    await insertLead(record);
  } catch (err) {
    console.error("[lead] supabase error", err);
    return {
      ok: false,
      message:
        "משהו השתבש בשליחה. אפשר גם ישירות בוואטסאפ:",
      values,
    };
  }

  // Resend is blocking — a failure fails the submit (no admin in phase 1,
  // so without the email Sapir never sees the lead).
  try {
    await notifyByEmail(record);
  } catch (err) {
    console.error("[lead] email error", err);
    return {
      ok: false,
      message:
        "משהו השתבש בשליחה. אפשר גם ישירות בוואטסאפ:",
      values,
    };
  }

  return {
    ok: true,
    message:
      "תודה. קיבלתי את הפרטים — אני חוזרת אליך אישית, בשעות הפעילות לרוב תוך שעה.",
  };
}
