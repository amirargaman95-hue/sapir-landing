// Shared types/constants for the lead form.
// NOT a "use server" file — Server Action modules may export async functions only,
// so the state shape lives here and is imported by both the action and the client form.

export type LeadValues = {
  name: string;
  phone: string;
  factory_name: string;
  industry: string;
};

export type LeadState = {
  ok: boolean;
  message: string;
  // Echoed back so the client can keep field values on validation error.
  values?: LeadValues;
};

export const leadInitialState: LeadState = { ok: false, message: "" };

// Candidate CV upload constraints.
export const CV_MAX_BYTES = 5 * 1024 * 1024; // 5MB
export const CV_ALLOWED_EXT = ["pdf", "doc", "docx"] as const;
export const CV_ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

// Allowed industry options — must match the <select> in LeadForm and content.industries.
export const LEAD_INDUSTRIES = [
  "ברזל ומתכת",
  "פלסטיק",
  "נגרות",
  "לוגיסטיקה",
  "מזון",
  "אחר",
] as const;

export type LeadIndustry = (typeof LEAD_INDUSTRIES)[number];
