import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תצוגה מקדימה — פאנל אדמין · ספיר אזולאי",
  description: "תצוגה מקדימה (mock) של פאנל הניהול — לקוחות, מועמדים, לידים.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">{children}</div>
  );
}
