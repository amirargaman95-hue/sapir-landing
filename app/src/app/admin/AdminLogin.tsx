"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { loginInitialState } from "./admin-types";

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState(
    login,
    loginInitialState
  );

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center px-4"
    >
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl"
      >
        <h1 className="mb-1 text-xl font-bold">ניהול</h1>
        <p className="mb-6 text-sm text-neutral-400">אזור פרטי. נדרשת סיסמה.</p>

        <label htmlFor="password" className="mb-2 block text-sm">
          סיסמה
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="mb-4 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-base outline-none focus:border-neutral-500"
        />

        {state.message ? (
          <p className="mb-4 text-sm text-red-400">{state.message}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-neutral-100 px-4 py-2 font-semibold text-neutral-900 transition hover:bg-white disabled:opacity-60"
        >
          {pending ? "בודק…" : "כניסה"}
        </button>
      </form>
    </main>
  );
}
