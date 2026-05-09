"use client";

import { useState } from "react";
import {
  House,
  Buildings,
  UsersThree,
  Tray,
  CalendarBlank,
  SignOut,
} from "@phosphor-icons/react";
import Login from "@/components/dashboard/Login";
import Overview from "@/components/dashboard/Overview";
import Clients from "@/components/dashboard/Clients";
import Candidates from "@/components/dashboard/Candidates";
import LeadsInbox from "@/components/dashboard/LeadsInbox";
import CalendarMini from "@/components/dashboard/CalendarMini";

type Tab = "overview" | "clients" | "candidates" | "leads" | "calendar";

const NAV: { id: Tab; label: string; Icon: typeof House }[] = [
  { id: "overview", label: "ראשי", Icon: House },
  { id: "clients", label: "לקוחות", Icon: Buildings },
  { id: "candidates", label: "מועמדים", Icon: UsersThree },
  { id: "leads", label: "לידים", Icon: Tray },
  { id: "calendar", label: "לוח שנה", Icon: CalendarBlank },
];

export default function DashboardPreviewPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");

  if (!authed) return <Login onEnter={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar — visually right in RTL */}
      <aside
        className="w-60 shrink-0 border-l border-[var(--color-border)] bg-[var(--color-card)] hidden md:flex flex-col"
        aria-label="ניווט"
      >
        <div className="p-6 border-b border-[var(--color-border)]">
          <p className="serif font-[700] text-lg">ספיר אזולאי</p>
          <p className="text-xs text-[var(--color-muted)] mt-1">פאנל ניהול · mock</p>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {NAV.map(({ id, label, Icon }) => {
              const active = tab === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm text-right transition-colors ${
                      active
                        ? "bg-[var(--color-cream)] text-[var(--color-teal)] font-[600]"
                        : "text-[var(--color-charcoal-soft)] hover:bg-[var(--color-cream)]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={18} weight={active ? "fill" : "regular"} />
                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-3 border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => setAuthed(false)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm text-right text-[var(--color-muted)] hover:bg-[var(--color-cream)] transition-colors"
          >
            <SignOut size={18} />
            יציאה
          </button>
          <a
            href="/"
            className="block w-full text-center mt-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-teal)] transition-colors"
          >
            ← חזרה לדף הציבורי
          </a>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between p-3">
          <p className="serif font-[700]">ספיר · פאנל</p>
          <a href="/" className="text-xs text-[var(--color-muted)]">
            ← בית
          </a>
        </div>
        <ul className="flex overflow-x-auto no-scrollbar gap-1 px-3 pb-2">
          {NAV.map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <li key={id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs whitespace-nowrap ${
                    active
                      ? "bg-[var(--color-cream)] text-[var(--color-teal)] font-[600]"
                      : "text-[var(--color-muted)]"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main content */}
      <main className="flex-1 p-5 md:p-8 lg:p-12 mt-24 md:mt-0 max-w-full overflow-x-hidden">
        {tab === "overview" && <Overview />}
        {tab === "clients" && <Clients />}
        {tab === "candidates" && <Candidates />}
        {tab === "leads" && <LeadsInbox />}
        {tab === "calendar" && <CalendarMini />}
      </main>
    </div>
  );
}
