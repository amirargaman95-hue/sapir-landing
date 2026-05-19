"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { submitLead } from "@/app/actions/lead";
import { leadInitialState } from "@/app/actions/lead-types";
import { leadForm, WHATSAPP_URL } from "@/data/content";
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
      <span>{pending ? leadForm.submitPending : leadForm.submitIdle}</span>
      {!pending && <ArrowRight size={18} weight="bold" aria-hidden />}
    </button>
  );
}

export default function LeadForm() {
  const [state, formAction] = useActionState(submitLead, leadInitialState);

  return (
    <section
      id="lead-form"
      aria-labelledby="lead-form-heading"
      className="lead-form-section"
    >
      <div className="lead-form-inner">
        <span className="hero-quick-form-label">{leadForm.eyebrow}</span>
        <h2 id="lead-form-heading" className="lead-form-heading">
          {leadForm.heading}
        </h2>
        <p className="lead-form-sub">{leadForm.sub}</p>

        {state.ok ? (
          <p className="lead-form-success" role="status" aria-live="polite">
            {leadForm.successMsg}
          </p>
        ) : (
          <form
            action={formAction}
            className="lead-form-v2"
            noValidate
            onSubmit={() => track("lead_form_submit", { location: "lead-form" })}
          >
            <div className="lead-field">
              <label htmlFor="lead-name" className="lead-field-label">
                {leadForm.nameLabel}
              </label>
              <input
                id="lead-name"
                type="text"
                name="name"
                required
                minLength={2}
                autoComplete="name"
                aria-label={leadForm.nameLabel}
                placeholder={leadForm.nameLabel}
                defaultValue={state.values?.name ?? ""}
              />
            </div>
            <div className="lead-field">
              <label htmlFor="lead-factory" className="lead-field-label">
                {leadForm.factoryLabel}
              </label>
              <input
                id="lead-factory"
                type="text"
                name="factory_name"
                autoComplete="organization"
                aria-label={leadForm.factoryLabel}
                placeholder={leadForm.factoryLabel}
                defaultValue={state.values?.factory_name ?? ""}
              />
            </div>
            <div className="lead-field">
              <label htmlFor="lead-phone" className="lead-field-label">
                {leadForm.phoneLabel}
              </label>
              <input
                id="lead-phone"
                type="tel"
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                aria-label={leadForm.phoneLabel}
                placeholder={leadForm.phoneLabel}
                defaultValue={state.values?.phone ?? ""}
              />
            </div>
            <div className="lead-field">
              <label htmlFor="lead-industry" className="lead-field-label">
                {leadForm.industryLabel}
              </label>
              <select
                id="lead-industry"
                name="industry"
                required
                aria-label={leadForm.industryLabel}
                defaultValue={state.values?.industry ?? ""}
              >
                <option value="" disabled>
                  {leadForm.industryLabel}
                </option>
                {leadForm.industryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            {/* Honeypot — renamed to _hp so it can't collide with "שם המפעל". */}
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
            {state.message}
          </p>
        )}

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lead-form-wa-link"
          onClick={() =>
            track("cta_whatsapp_click", { location: "lead-form-fallback" })
          }
        >
          <WhatsappLogo size={18} weight="fill" aria-hidden />
          <span>{leadForm.whatsappFallback}</span>
        </a>
      </div>
    </section>
  );
}
