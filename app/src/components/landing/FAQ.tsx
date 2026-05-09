"use client";

import { useState } from "react";
import { CaretDown, Question } from "@phosphor-icons/react";
import { faqs } from "@/data/content";

export default function FAQ() {
  const initialOpen = faqs.findIndex((f) => f.openByDefault);
  const [open, setOpen] = useState<number>(initialOpen >= 0 ? initialOpen : -1);

  return (
    <section
      id="faq"
      className="faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="container-prose max-w-[920px]">
        <p className="eyebrow-amber inline-flex items-center gap-2">
          <Question size={18} weight="fill" color="#DCEB5C" />
          שאלות נפוצות
        </p>
        <h2 id="faq-heading">
          מה שואלים אותי <span className="accent">הכי הרבה.</span>
        </h2>

        <ul className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                className="faq-row"
                data-open={isOpen ? "true" : "false"}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span>{f.q}</span>
                  <span className="toggle" aria-hidden>
                    <CaretDown size={16} weight="bold" />
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="answer"
                  role="region"
                >
                  <div className="answer-inner">{f.a}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
