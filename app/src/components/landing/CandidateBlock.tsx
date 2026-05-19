"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead } from "@/app/actions/lead";
import { leadInitialState } from "@/app/actions/lead-types";
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
            action={formAction}
            className="lead-form-v2"
            noValidate
            onSubmit={() =>
              track("lead_form_submit", { location: "candidate-block" })
            }
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

        {!state.ok && state.message && (
          <p className="lead-form-error" role="alert" aria-live="assertive">
            משהו השתבש. נסו שוב מאוחר יותר.
          </p>
        )}
      </div>
    </section>
  );
}
