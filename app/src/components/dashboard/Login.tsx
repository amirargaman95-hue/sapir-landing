"use client";

import { FormEvent, useState } from "react";
import { Lock, EnvelopeSimple } from "@phosphor-icons/react";

export default function Login({ onEnter }: { onEnter: () => void }) {
  const [email, setEmail] = useState("sapir@demo.local");
  const [password, setPassword] = useState("demo");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onEnter();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="surface-card w-full max-w-[420px] rounded-sm p-8 lg:p-10"
      >
        <p className="serif text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-2">
          תצוגה מקדימה — פאנל ניהול
        </p>
        <h1
          className="serif font-[700]"
          style={{ fontSize: "1.875rem", lineHeight: 1.15 }}
        >
          כניסה לאזור האישי
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          זוהי תצוגת mock להמחשה. אין צורך בסיסמה אמיתית — לחצי "כניסה".
        </p>

        <div className="mt-8 space-y-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-[var(--color-muted)]">דוא״ל</span>
            <span className="relative">
              <EnvelopeSimple
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[var(--color-border)] bg-[var(--color-cream)] pl-3 pr-10 py-2 rounded-sm focus:border-[var(--color-teal)] focus:outline-none"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-[var(--color-muted)]">סיסמה</span>
            <span className="relative">
              <Lock
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[var(--color-border)] bg-[var(--color-cream)] pl-3 pr-10 py-2 rounded-sm focus:border-[var(--color-teal)] focus:outline-none"
              />
            </span>
          </label>
        </div>

        <button type="submit" className="btn-primary w-full mt-6">
          כניסה
        </button>

        <p className="mt-6 text-xs text-center text-[var(--color-muted)]">
          ←{" "}
          <a href="/" className="hover:text-[var(--color-teal)]">
            חזרה לדף הבית
          </a>
        </p>
      </form>
    </div>
  );
}
