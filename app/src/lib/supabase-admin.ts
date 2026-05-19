// Server-only Supabase admin client (service-role key).
// `server-only` makes the build FAIL if this module is ever imported into a
// client bundle — the service key must never reach the browser.
import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Private Storage bucket for candidate CVs (same as the lead form uses).
export const CV_BUCKET = "cv-uploads";

// Returns null when env is missing so callers can render a graceful
// "admin not configured" state instead of crashing.
export function getAdminSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
