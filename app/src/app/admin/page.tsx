// Admin dashboard — Server Component.
// Auth gate runs BEFORE any Supabase query: an unauthenticated request
// renders only the login form and fetches zero data.

import Link from "next/link";
import { isAdminConfigured, isAuthed } from "@/lib/admin-auth";
import { getAdminSupabase } from "@/lib/supabase-admin";
import { logout } from "./actions";
import AdminLogin from "./AdminLogin";
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

  const supabase = getAdminSupabase();
  let rows: LeadRow[] = [];
  let loadError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .select(
        "id,created_at,name,phone,factory_name,industry,source,cv_url,status"
      )
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
  const newTotal = rows.filter((r) => (r.status ?? "new") === "new").length;

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
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">לידים ומועמדים</h1>
          <p className="mt-1 text-sm text-neutral-400">
            {rows.length} סה״כ · {ownersTotal} בעלי מפעלים ·{" "}
            {candidatesTotal} מועמדים · {newTotal} חדשים
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
        <div className="overflow-x-auto rounded-xl border border-neutral-800">
          <table className="w-full text-right text-sm">
            <thead className="bg-neutral-900 text-neutral-400">
              <tr>
                <th className="px-3 py-3 font-medium">תאריך</th>
                <th className="px-3 py-3 font-medium">שם</th>
                <th className="px-3 py-3 font-medium">טלפון</th>
                <th className="px-3 py-3 font-medium">מפעל/תחום</th>
                <th className="px-3 py-3 font-medium">סוג</th>
                <th className="px-3 py-3 font-medium">קו״ח</th>
                <th className="px-3 py-3 font-medium">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => {
                const isCandidate = r.source === "landing_candidate";
                return (
                  <tr
                    key={r.id}
                    className="border-t border-neutral-800 hover:bg-neutral-900/50"
                  >
                    <td className="whitespace-nowrap px-3 py-3 text-neutral-400">
                      {fmtDate(r.created_at)}
                    </td>
                    <td className="px-3 py-3 font-medium">{r.name ?? "—"}</td>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
