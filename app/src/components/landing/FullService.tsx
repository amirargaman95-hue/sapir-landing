"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  Megaphone,
  MagnifyingGlass,
  Users,
  FileText,
  PhoneCall,
  Target,
  HandHeart,
  ChatCircle,
  CaretDown,
} from "@phosphor-icons/react";
import { fullService } from "@/data/content";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

const iconMap = {
  Compass,
  Megaphone,
  MagnifyingGlass,
  Users,
  FileText,
  PhoneCall,
  Target,
  HandHeart,
  ChatCircle,
} as const;

export default function FullService() {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState(0);

  return (
    <section
      id="full-service"
      className="accordion-section"
      aria-labelledby="full-service-heading"
    >
      <div className="accordion-wrap">
        <header className="accordion-header">
          <p className="eyebrow-amber">{fullService.eyebrow}</p>
          <h2 id="full-service-heading">
            <span dir="ltr" className="accent">
              9
            </span>{" "}
            שלבים. <span className="accent">אני עושה הכל.</span>
          </h2>
          <p>{fullService.intro}</p>
        </header>

        <Stagger className="accordion-list" step={0.05}>
          {fullService.items.map((step, i) => {
            const Icon =
              iconMap[step.iconName as keyof typeof iconMap] ?? Compass;
            const numStr = String(i + 1).padStart(2, "0");
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const btnId = `${baseId}-btn-${i}`;

            return (
              <StaggerItem
                key={step.title}
                className={`accordion-item${isOpen ? " is-open" : ""}`}
              >
                <h3 className="accordion-h">
                  <button
                    id={btnId}
                    type="button"
                    className="accordion-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="acc-num" dir="ltr" aria-hidden>
                      {numStr}
                    </span>
                    <span className="acc-icon" aria-hidden>
                      <Icon size={26} weight="duotone" />
                    </span>
                    <span className="acc-title">{step.title}</span>
                    <span className="acc-caret" aria-hidden>
                      <CaretDown size={20} weight="bold" />
                    </span>
                  </button>
                </h3>

                {reduceMotion ? (
                  isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="accordion-panel"
                    >
                      <p>{step.body}</p>
                    </div>
                  )
                ) : (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className="accordion-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },
                          opacity: { duration: 0.22 },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <p>{step.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
