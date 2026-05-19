// Shared admin types/constants. NOT a "use server" file — Server Action
// modules may export async functions only, so non-function values live here
// (same pattern as lead-types.ts).

export type LoginState = { ok: boolean; message: string };
export const loginInitialState: LoginState = { ok: false, message: "" };

export type AdminStatus = "new" | "in_progress" | "closed";
export const VALID_STATUS: readonly AdminStatus[] = [
  "new",
  "in_progress",
  "closed",
];
