"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead } from "@/app/actions/lead";
import {
  CV_ALLOWED_EXT,
  CV_MAX_BYTES,
  leadInitialState,
} from "@/app/actions/lead-types";
import { leadForm } from "@/data/content";
import { track } from "@/lib/track";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="lead-form-v2-submit"
      disabled={pending}
      aria-disabled={pending}
    >
      <span>{pending ? "שולח…" : "שליחה"}</span>
    </button>
  );
}

export default function CandidateBlock() {
  const [state, formAction] = useActionState(submitLead, leadInitialState);
  const [cvName, setCvName] = useState("");
  const [cvError, setCvError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function validateCv(file: File): string {
    const ext = (file.name.split(".").pop() ?? "").toLowerCase();
    if (!(CV_ALLOWED_EXT as readonly string[]).includes(ext)) {
      return "ניתן להעלות קובץ מסוג PDF או Word בלבד.";
    }
    if (file.size > CV_MAX_BYTES) {
      return "הקובץ גדול מדי. עד 5MB.";
    }
    return "";
  }

  function handleCvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setCvName("");
      setCvError("");
      return;
    }
    const err = validateCv(file);
    if (err) {
      setCvError(err);
      setCvName("");
      e.target.value = "";
      return;
    }
    setCvError("");
    setCvName(file.name);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Block submit if a chosen file is invalid (CV stays optional).
    const input = formRef.current?.elements.namedItem(
      "cv"
    ) as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (file) {
      const err = validateCv(file);
      if (err) {
        e.preventDefault();
        setCvError(err);
        return;
      }
    }
    track("lead_form_submit", { location: "candidate-block" });
  }

  return (
    <section
      id="candidate-block"
      aria-labelledby="candidate-heading"
      className="candidate-block"
    >
      <div className="candidate-inner">
        <h2 id="candidate-heading" className="candidate-heading">
          מחפשים עבודה במפעל?
        </h2>
        <p className="candidate-sub">
          אני עובדת מול מפעלים בכל הארץ. השאירו פרטים — אם יש התאמה אני חוזרת
          אליכם.
        </p>

        {state.ok ? (
          <p
            className="lead-form-success"
            role="status"
            aria-live="polite"
          >
            תודה. הפרטים אצלי — אם יש התאמה אני חוזרת אליכם.
          </p>
        ) : (
          <form
            ref={formRef}
            action={formAction}
            className="lead-form-v2"
            noValidate
            onSubmit={handleSubmit}
          >
            {/* Source tag — candidate channel (job seekers). */}
            <input type="hidden" name="kind" value="candidate" />

            <div className="lead-field">
              <label htmlFor="candidate-name" className="lead-field-label">
                שם מלא
              </label>
              <input
                id="candidate-name"
                type="text"
                name="name"
                required
                minLength={2}
                autoComplete="name"
                aria-label="שם מלא"
                placeholder="שם מלא"
                defaultValue={state.values?.name ?? ""}
              />
            </div>

            <div className="lead-field">
              <label htmlFor="candidate-phone" className="lead-field-label">
                טלפון
              </label>
              <input
                id="candidate-phone"
                type="tel"
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                aria-label="טלפון"
                placeholder="טלפון"
                defaultValue={state.values?.phone ?? ""}
              />
            </div>

            <div className="lead-field">
              <label htmlFor="candidate-industry" className="lead-field-label">
                תחום מבוקש
              </label>
              <select
                id="candidate-industry"
                name="industry"
                required
                aria-label="תחום מבוקש"
                defaultValue={state.values?.industry ?? ""}
              >
                <option value="" disabled>
                  בחרו תחום
                </option>
                {leadForm.industryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="lead-field">
              <label htmlFor="candidate-cv" className="lead-field-label">
                קורות חיים (PDF)
              </label>
              <div className="lead-file">
                <span className="lead-file-btn">בחרו קובץ</span>
                <span
                  className="lead-file-name"
                  data-has-file={cvName ? "true" : "false"}
                >
                  {cvName || "לא נבחר קובץ (אופציונלי)"}
                </span>
                <input
                  id="candidate-cv"
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  aria-label="קורות חיים (PDF)"
                  onChange={handleCvChange}
                />
              </div>
            </div>

            <label className="lead-consent">
              <input type="checkbox" name="consent" required />
              <span>
                קראתי ואני מאשר/ת שספיר תשמור את הפרטים והקובץ ליצירת קשר.{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  מדיניות פרטיות
                </a>
              </span>
            </label>

            {/* Honeypot — same field name as the owner form. */}
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
                whiteSpace: "nowrap",
              }}
            />

            <SubmitButton />
          </form>
        )}

        {!state.ok && cvError && (
          <p className="lead-form-error" role="alert" aria-live="assertive">
            {cvError}
          </p>
        )}

        {!state.ok && !cvError && state.message && (
          <p className="lead-form-error" role="alert" aria-live="assertive">
            {state.message}
          </p>
        )}
      </div>
    </section>
  );
}
