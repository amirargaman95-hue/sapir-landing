"use server";

// Admin Server Actions: login, logout, status update.
// All gated server-side; no data path runs without a valid session.

import { revalidatePath } from "next/cache";
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
