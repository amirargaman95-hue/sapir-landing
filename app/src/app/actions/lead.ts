"use server";

// Lead form Server Action (Next 16 / React 19 useActionState signature).
// Signature: (prevState: LeadState, formData: FormData) => Promise<LeadState>
//
// NOTE: a "use server" module may export async functions ONLY.
// LeadState / leadInitialState live in ./lead-types (no "use server").
//
// Source of truth = Supabase. Success (ok:true + "תודה") is returned if the
// Supabase insert succeeds (and, for a candidate with a file, the Storage
// upload succeeds). Resend email is best-effort only: if it fails or its env
// is missing we log and continue — still ok:true. A real failure is ONLY a
// failed Supabase insert (or candidate CV upload) / missing Supabase env =>
// ok:false. Sapir views every lead in the protected /admin, so a missing
// email no longer blocks a working submit. Failures are logged for e2e.

import { createClient } from "@supabase/supabase-js";
import {
  CV_ALLOWED_EXT,
  CV_ALLOWED_MIME,
  CV_MAX_BYTES,
  LEAD_INDUSTRIES,
  type LeadIndustry,
  type LeadState,
  type LeadValues,
} from "./lead-types";

// Private Supabase Storage bucket for candidate CVs.
const CV_BUCKET = "cv-uploads";

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
  source: "landing_lead_form" | "landing_candidate";
  cv_url: string | null;
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

// Upload candidate CV to a private Storage bucket. Missing env / upload
// failure => throw (submit fails, no fake success). Returns the storage key.
async function uploadCv(file: File): Promise<string> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("[lead] cv upload failed (supabase env missing).");
    throw new Error("Supabase env missing");
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  const safeExt = (CV_ALLOWED_EXT as readonly string[]).includes(ext)
    ? ext
    : "bin";
  const randomShort = Math.random().toString(36).slice(2, 10);
  const key = `${Date.now()}-${randomShort}.${safeExt}`;

  const { data, error } = await supabase.storage
    .from(CV_BUCKET)
    .upload(key, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error || !data?.path) {
    throw new Error(`Supabase storage upload failed: ${error?.message ?? "no path"}`);
  }
  return data.path;
}

// Notification email. Best-effort: failure here does NOT fail the submit.
async function notifyByEmail(record: LeadRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "leads@sapirazulay.co.il";

  if (!apiKey || !to) {
    console.info(
      `[lead] email skipped (Resend env missing) — lead saved in Supabase, visible in /admin. name=${record.name} phone=${record.phone}`
    );
    return;
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
      subject:
        record.source === "landing_candidate"
          ? `מועמד חדש מהאתר — ${record.name}`
          : `ליד חדש מהאתר — ${record.name}`,
      text: `שם: ${record.name}\nטלפון: ${record.phone}\nשם המפעל: ${
        record.factory_name ?? "-"
      }\nתחום: ${record.industry}\nמקור: ${record.source}${
        record.cv_url
          ? `\nצורף קובץ קו״ח (Storage): ${CV_BUCKET}/${record.cv_url}`
          : ""
      }`,
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
  // Source tag. Owner is the default when the field is missing/anything else.
  const isCandidate = String(formData.get("kind") ?? "").trim() === "candidate";
  // Honeypot — renamed from `company` so it never collides with "שם המפעל".
  const honeypot = String(formData.get("_hp") ?? "").trim();
  // Candidate-only fields.
  const consent = String(formData.get("consent") ?? "").trim() !== "";
  const cvRaw = formData.get("cv");
  const cvFile =
    cvRaw instanceof File && cvRaw.size > 0 ? cvRaw : null;

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

  // Candidate-only gates: privacy consent + optional CV validation.
  if (isCandidate) {
    if (!consent) {
      return { ok: false, message: "יש לאשר את מדיניות הפרטיות.", values };
    }
    if (cvFile) {
      const ext = (cvFile.name.split(".").pop() ?? "").toLowerCase();
      const typeOk =
        (CV_ALLOWED_MIME as readonly string[]).includes(cvFile.type) ||
        (CV_ALLOWED_EXT as readonly string[]).includes(ext);
      if (!typeOk) {
        return {
          ok: false,
          message: "ניתן להעלות קובץ מסוג PDF או Word בלבד.",
          values,
        };
      }
      if (cvFile.size > CV_MAX_BYTES) {
        return {
          ok: false,
          message: "הקובץ גדול מדי. עד 5MB.",
          values,
        };
      }
    }
  }

  // Upload CV first (candidate only). Failure => fail the submit, no fake
  // success. Done before insert so cv_url is part of the saved record.
  let cvUrl: string | null = null;
  if (isCandidate && cvFile) {
    try {
      cvUrl = await uploadCv(cvFile);
    } catch (err) {
      console.error("[lead] cv upload error", err);
      return {
        ok: false,
        message: "משהו השתבש. נסו שוב מאוחר יותר.",
        values,
      };
    }
  }

  const record: LeadRecord = {
    name,
    phone,
    // Candidates have no factory; owners keep their (optional) factory name.
    factory_name: isCandidate ? null : factoryName || null,
    industry: industryRaw as LeadIndustry,
    region: null,
    message: null,
    source: isCandidate ? "landing_candidate" : "landing_lead_form",
    // Owners never upload a CV.
    cv_url: isCandidate ? cvUrl : null,
  };

  // Order: Supabase first (source of truth). A DB failure fails the submit.
  // Candidate channel has no WhatsApp fallback — it's not the sales channel.
  const failMessage = isCandidate
    ? "משהו השתבש. נסו שוב מאוחר יותר."
    : "משהו השתבש בשליחה. אפשר גם ישירות בוואטסאפ:";

  try {
    await insertLead(record);
  } catch (err) {
    console.error("[lead] supabase error", err);
    return { ok: false, message: failMessage, values };
  }

  // Resend is best-effort: the lead is already saved (source of truth) and
  // visible in /admin, so an email failure must NOT fail the submit.
  try {
    await notifyByEmail(record);
  } catch (err) {
    console.error("[lead] email error (non-blocking, lead saved)", err);
  }

  return {
    ok: true,
    message: isCandidate
      ? "תודה. הפרטים אצלי — אם יש התאמה אני חוזרת אליכם."
      : "תודה. קיבלתי את הפרטים — אני חוזרת אליך אישית, בשעות הפעילות לרוב תוך שעה.",
  };
}
