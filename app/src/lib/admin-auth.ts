// Server-only admin auth. Single user (Sapir), single password.
// The cookie value is an HMAC signature of a fixed payload — NOT the
// password itself — so the password never travels in / lives in a cookie.
import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "sapir_admin";

// Fixed payload that gets signed. Rotating ADMIN_PASSWORD (and therefore the
// derived secret) automatically invalidates every existing cookie.
const COOKIE_PAYLOAD = "sapir-admin-v1";

// 7 days. Re-login after that.
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

// True only when ADMIN_PASSWORD is configured. When false the admin page
// renders a graceful "not configured yet" state and loads zero data.
export function isAdminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

function cookieSecret(): string {
  // Dedicated secret if provided, else derive from the password so a single
  // env var is enough to stand the admin up.
  return (
    process.env.ADMIN_COOKIE_SECRET ||
    process.env.ADMIN_PASSWORD ||
    ""
  );
}

function sign(payload: string): string {
  return createHmac("sha256", cookieSecret()).update(payload).digest("hex");
}

function expectedToken(): string {
  return sign(COOKIE_PAYLOAD);
}

// Constant-time compare; never throws on length mismatch.
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

// Verify the submitted password against ADMIN_PASSWORD (constant-time).
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

// Read the request cookie and confirm it carries a valid signature.
// Returns false when admin is not configured (=> no data ever loads).
export async function isAuthed(): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, expectedToken());
}

// Set the signed session cookie. httpOnly + secure + sameSite=strict.
export async function setSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
