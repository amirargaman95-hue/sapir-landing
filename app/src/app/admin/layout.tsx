import type { Metadata } from "next";

// Internal tool — never indexed, never followed.
export const metadata: Metadata = {
  title: "ניהול — ספיר אזולאי",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-neutral-950 text-neutral-100">{children}</div>;
}
