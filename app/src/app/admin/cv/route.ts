// CV download — generates a short-lived Supabase Storage signed URL and
// redirects to it. Auth-gated; never exposes the service key or a public URL.

import { NextResponse, type NextRequest } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { CV_BUCKET, getAdminSupabase } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const SIGNED_URL_TTL = 60; // seconds

export async function GET(request: NextRequest) {
  if (!(await isAuthed())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return new NextResponse("Missing id", { status: 400 });
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return new NextResponse("Not configured", { status: 503 });
  }

  // Resolve the storage key from the row — clients never pass paths directly.
  const { data: row, error: rowErr } = await supabase
    .from("leads")
    .select("cv_url")
    .eq("id", id)
    .single();

  if (rowErr || !row?.cv_url) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { data: signed, error: signErr } = await supabase.storage
    .from(CV_BUCKET)
    .createSignedUrl(row.cv_url as string, SIGNED_URL_TTL);

  if (signErr || !signed?.signedUrl) {
    return new NextResponse("Signed URL failed", { status: 500 });
  }

  return NextResponse.redirect(signed.signedUrl);
}
