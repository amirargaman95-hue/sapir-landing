"use client";

import { useEffect } from "react";
import {
  Briefcase,
  Buildings,
  ShieldCheck,
  UserCircle,
  Wrench,
} from "@phosphor-icons/react";
import { usps } from "@/data/content";

const iconMap = {
  Briefcase,
  Buildings,
  ShieldCheck,
  UserCircle,
  Wrench,
} as const;

export default function ThreeReasons() {
  // Spotlight cursor effect — sets --x / --y CSS vars on hover
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".reason-glass-card");
    const onMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--x", `${e.clientX - r.left}px`);
      target.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    cards.forEach((c) => c.addEventListener("mousemove", onMove as EventListener));
    return () => {
      cards.forEach((c) =>
        c.removeEventListener("mousemove", onMove as EventListener)
      );
    };
  }, []);

  return (
    <section
      id="reasons"
      className="reasons-section"
      aria-labelledby="reasons-heading"
    >
      <div className="container-prose">
        <div className="max-w-[760px]">
          <p className="eyebrow-amber mb-4" style={{ color: "#DCEB5C" }}>
            למה אני
          </p>
          <h2 id="reasons-heading" className="h-display-md max-w-[22ch]" style={{ color: "#F5F1EA" }}>
            3 דברים{" "}
            <span style={{ color: "#DCEB5C", textShadow: "0 4px 32px rgba(220, 235, 92, 0.30)" }}>
              שאף סוכנות לא נותנת.
            </span>
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {usps.map((u) => {
            const Icon = iconMap[u.iconName as keyof typeof iconMap] ?? UserCircle;
            return (
              <li key={u.title} className="reason-glass-card">
                <div className="reason-card-content">
                  <span className="reason-icon" aria-hidden>
                    <Icon size={28} weight="duotone" color="#DCEB5C" />
                  </span>
                  <h3 className="reason-title">{u.title}</h3>
                  <p className="reason-body">{u.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
