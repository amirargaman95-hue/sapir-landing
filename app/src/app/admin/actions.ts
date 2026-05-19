"use server";

// Admin Server Actions: login, logout, status update.
// All gated server-side; no data path runs without a valid session.

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  clearSessionCookie,
  isAdminConfigured,
  isAuthed,
  setSessionCookie,
  verifyPassword,
} from "@/lib/admin-auth";
import { getAdminSupabase } from "@/lib/supabase-admin";
import {
  type AdminStatus,
  type LoginState,
  VALID_STATUS,
} from "./admin-types";

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { ok: false, message: "האדמין לא מוגדר עדיין." };
  }
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return { ok: false, message: "סיסמה שגויה." };
  }
  await setSessionCookie();
  revalidatePath("/admin");
  return { ok: true, message: "" };
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  revalidatePath("/admin");
}

export async function updateStatus(formData: FormData): Promise<void> {
  // Re-check the session on every mutation — never trust the client.
  if (!(await isAuthed())) return;

  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  if (!id || !VALID_STATUS.includes(status as AdminStatus)) return;

  const supabase = getAdminSupabase();
  if (!supabase) return;

  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin");
}

// Persist a free-text admin note on a lead. Same pattern as updateStatus:
// re-check the session, validate input, write server-side only.
export async function updateNote(formData: FormData): Promise<void> {
  // Re-check the session on every mutation — never trust the client.
  // Controlled early-returns on any failure: never throw to the client.
  if (!(await isAuthed())) return;

  const id = String(formData.get("id") ?? "").trim();
  const rawNote = formData.get("note");
  if (!id || typeof rawNote !== "string") return;

  // Trim + cap length. Empty string clears the note.
  const note = rawNote.trim().slice(0, 2000);

  const supabase = getAdminSupabase();
  if (!supabase) return;

  const { error } = await supabase
    .from("leads")
    .update({ admin_note: note })
    .eq("id", id);
  if (error) return;

  revalidatePath("/admin");
}

// A4: stamp the "last seen" cookie. Called once from a client effect on an
// authed page render. Cookies cannot be written during Server Component
// render in Next 16, so this tiny Server Action does it. Re-checks auth.
export async function touchSeen(): Promise<void> {
  if (!(await isAuthed())) return;
  const store = await cookies();
  store.set("admin_seen", new Date().toISOString(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 90, // ~90 days
  });
}
