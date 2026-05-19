// Admin dashboard — Server Component.
// Auth gate runs BEFORE any Supabase query: an unauthenticated request
// renders only the login form and fetches zero data.

import Link from "next/link";
import { cookies } from "next/headers";
import { isAdminConfigured, isAuthed } from "@/lib/admin-auth";
import { getAdminSupabase, LEAD_SELECT } from "@/lib/supabase-admin";
import { logout } from "./actions";
import AdminLogin from "./AdminLogin";
import LeadActions from "./LeadActions";
import NoteCell from "./NoteCell";
import SeenStamp from "./SeenStamp";
import StatusSelect from "./StatusSelect";

// Request-time only; never prerendered/cached (reads cookies + live data).
export const dynamic = "force-dynamic";

type LeadRow = {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  factory_name: string | null;
  industry: string | null;
  source: string | null;
  cv_url: string | null;
  status: string | null;
  admin_note: string | null;
};

type Filter = "all" | "owners" | "candidates";

const STATUS_LABEL: Record<string, string> = {
  new: "חדש",
  in_progress: "בטיפול",
  closed: "נסגר",
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  // 1) Not configured → graceful, leak nothing.
  if (!isAdminConfigured()) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center px-4"
      >
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center">
          <h1 className="mb-2 text-lg font-bold">האדמין לא מוגדר עדיין</h1>
          <p className="text-sm text-neutral-400">פנו למפתח להגדרה.</p>
        </div>
      </main>
    );
  }

  // 2) No valid session → login form only. No data fetched.
  if (!(await isAuthed())) {
    return <AdminLogin />;
  }

  // 3) Authed → load data (server-side, service role).
  const { filter: filterParam } = await searchParams;
  const filter: Filter =
    filterParam === "owners" || filterParam === "candidates"
      ? filterParam
      : "all";

  // A4: capture the previous-visit timestamp BEFORE SeenStamp updates it.
  // No cookie ⇒ treat everything as new (Number that compares true).
  const seenRaw = (await cookies()).get("admin_seen")?.value;
  const seenMs = seenRaw ? Date.parse(seenRaw) : NaN;
  const isNew = (iso: string): boolean => {
    if (Number.isNaN(seenMs)) return true;
    const t = Date.parse(iso);
    return !Number.isNaN(t) && t > seenMs;
  };

  const supabase = getAdminSupabase();
  let rows: LeadRow[] = [];
  let loadError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .select(LEAD_SELECT)
      .order("created_at", { ascending: false });
    if (error) loadError = true;
    else rows = (data ?? []) as LeadRow[];
  } else {
    loadError = true;
  }

  const ownersTotal = rows.filter(
    (r) => r.source !== "landing_candidate"
  ).length;
  const candidatesTotal = rows.filter(
    (r) => r.source === "landing_candidate"
  ).length;
  const newSinceVisit = rows.filter((r) => isNew(r.created_at)).length;

  const visible = rows.filter((r) => {
    if (filter === "owners") return r.source !== "landing_candidate";
    if (filter === "candidates") return r.source === "landing_candidate";
    return true;
  });

  const tabs: { key: Filter; label: string; href: string }[] = [
    { key: "all", label: "הכל", href: "/admin" },
    { key: "owners", label: "בעלי מפעלים", href: "/admin?filter=owners" },
    { key: "candidates", label: "מועמדים", href: "/admin?filter=candidates" },
  ];

  return (
    <main dir="rtl" className="mx-auto max-w-6xl px-4 py-8">
      {/* A4: stamp admin_seen=now once, after this render captured the old value */}
      <SeenStamp />

      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">לידים ומועמדים</h1>
          <p className="mt-1 text-sm text-neutral-400">
            {rows.length} סה״כ · {ownersTotal} בעלי מפעלים ·{" "}
            {candidatesTotal} מועמדים · {newSinceVisit} חדשים מאז ביקור
          </p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800"
          >
            התנתקות
          </button>
        </form>
      </header>

      <nav className="mb-4 flex gap-2">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={`rounded-lg px-3 py-1.5 text-sm transition ${
              filter === t.key
                ? "bg-neutral-100 text-neutral-900"
                : "border border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      {loadError ? (
        <p className="rounded-lg border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">
          שגיאה בטעינת הנתונים. בדקו את הגדרות ה-Supabase.
        </p>
      ) : visible.length === 0 ? (
        <p className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center text-sm text-neutral-400">
          אין רשומות להצגה.
        </p>
      ) : (
        <>
          {/* ── Mobile: stacked cards (below md). No horizontal scroll. ── */}
          <div className="flex flex-col gap-3 md:hidden">
            {visible.map((r) => {
              const isCandidate = r.source === "landing_candidate";
              const fresh = isNew(r.created_at);
              return (
                <div
                  key={r.id}
                  className={`rounded-xl border bg-neutral-900 p-4 ${
                    fresh
                      ? "border-sky-800 ring-1 ring-sky-900/60"
                      : "border-neutral-800"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {r.name ?? "—"}
                        </span>
                        {fresh ? (
                          <span className="rounded-md bg-sky-900 px-1.5 py-0.5 text-[10px] font-bold text-sky-200">
                            חדש
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-0.5 text-xs text-neutral-500">
                        {fmtDate(r.created_at)}
                      </div>
                    </div>
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs ${
                        isCandidate
                          ? "bg-sky-950 text-sky-300"
                          : "bg-amber-950 text-amber-300"
                      }`}
                    >
                      {isCandidate ? "מועמד" : "בעל מפעל"}
                    </span>
                  </div>

                  <div className="mb-2 text-sm text-neutral-300">
                    {r.factory_name || r.industry || "—"}
                  </div>

                  {r.phone ? (
                    <div className="mb-2" dir="ltr">
                      <a
                        href={`tel:${r.phone}`}
                        className="text-sm text-neutral-300 underline-offset-2 hover:underline"
                      >
                        {r.phone}
                      </a>
                    </div>
                  ) : null}

                  <div className="mb-3">
                    <LeadActions phone={r.phone} />
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <StatusSelect id={r.id} status={r.status ?? "new"} />
                    <span className="sr-only">
                      {STATUS_LABEL[r.status ?? "new"]}
                    </span>
                    {r.cv_url ? (
                      <a
                        href={`/admin/cv?id=${encodeURIComponent(r.id)}`}
                        className="flex min-h-[44px] items-center rounded-md border border-neutral-700 px-3 py-2 text-xs text-neutral-200 transition hover:bg-neutral-800"
                      >
                        הורד קו״ח
                      </a>
                    ) : null}
                  </div>

                  <NoteCell id={r.id} note={r.admin_note} />
                </div>
              );
            })}
          </div>

          {/* ── Desktop: full table (md and up). ── */}
          <div className="hidden overflow-x-auto rounded-xl border border-neutral-800 md:block">
            <table className="w-full text-right text-sm">
              <thead className="bg-neutral-900 text-neutral-400">
                <tr>
                  <th className="px-3 py-3 font-medium">תאריך</th>
                  <th className="px-3 py-3 font-medium">שם</th>
                  <th className="px-3 py-3 font-medium">טלפון</th>
                  <th className="px-3 py-3 font-medium">מפעל/תחום</th>
                  <th className="px-3 py-3 font-medium">סוג</th>
                  <th className="px-3 py-3 font-medium">פעולות</th>
                  <th className="px-3 py-3 font-medium">קו״ח</th>
                  <th className="px-3 py-3 font-medium">סטטוס</th>
                  <th className="px-3 py-3 font-medium">הערה</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => {
                  const isCandidate = r.source === "landing_candidate";
                  const fresh = isNew(r.created_at);
                  return (
                    <tr
                      key={r.id}
                      className={`border-t border-neutral-800 hover:bg-neutral-900/50 ${
                        fresh ? "bg-sky-950/20" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-3 py-3 text-neutral-400">
                        {fmtDate(r.created_at)}
                      </td>
                      <td className="px-3 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          {r.name ?? "—"}
                          {fresh ? (
                            <span className="rounded-md bg-sky-900 px-1.5 py-0.5 text-[10px] font-bold text-sky-200">
                              חדש
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3" dir="ltr">
                        {r.phone ? (
                          <a
                            href={`tel:${r.phone}`}
                            className="text-neutral-300 underline-offset-2 hover:underline"
                          >
                            {r.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-3 py-3 text-neutral-300">
                        {r.factory_name || r.industry || "—"}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-md px-2 py-0.5 text-xs ${
                            isCandidate
                              ? "bg-sky-950 text-sky-300"
                              : "bg-amber-950 text-amber-300"
                          }`}
                        >
                          {isCandidate ? "מועמד" : "בעל מפעל"}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <LeadActions phone={r.phone} />
                      </td>
                      <td className="px-3 py-3">
                        {r.cv_url ? (
                          <a
                            href={`/admin/cv?id=${encodeURIComponent(r.id)}`}
                            className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200 transition hover:bg-neutral-800"
                          >
                            הורד
                          </a>
                        ) : (
                          <span className="text-neutral-600">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <StatusSelect id={r.id} status={r.status ?? "new"} />
                        <span className="sr-only">
                          {STATUS_LABEL[r.status ?? "new"]}
                        </span>
                      </td>
                      <td className="px-3 py-3 align-top">
                        <NoteCell id={r.id} note={r.admin_note} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
