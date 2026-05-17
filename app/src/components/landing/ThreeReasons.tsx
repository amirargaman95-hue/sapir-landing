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
  // Spotlight cursor + 3D tilt — sets --x/--y/--rx/--ry CSS vars
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".reason-glass-card");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const TILT = reduceMotion ? 0 : 6;

    const onMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const r = target.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      target.style.setProperty("--x", `${px}px`);
      target.style.setProperty("--y", `${py}px`);
      const dx = (px / r.width - 0.5) * 2;
      const dy = (py / r.height - 0.5) * 2;
      target.style.setProperty("--ry", `${dx * TILT}deg`);
      target.style.setProperty("--rx", `${-dy * TILT}deg`);
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.setProperty("--rx", "0deg");
      target.style.setProperty("--ry", "0deg");
    };
    cards.forEach((c) => {
      c.addEventListener("mousemove", onMove as EventListener);
      c.addEventListener("mouseleave", onLeave as EventListener);
    });
    return () => {
      cards.forEach((c) => {
        c.removeEventListener("mousemove", onMove as EventListener);
        c.removeEventListener("mouseleave", onLeave as EventListener);
      });
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
          <p className="eyebrow-amber mb-4" style={{ color: "#3B82F6" }}>
            למה אני
          </p>
          <h2 id="reasons-heading" className="h-display-md max-w-[22ch]" style={{ color: "#FAFAFA" }}>
            3 דברים{" "}
            <span style={{ color: "#3B82F6", textShadow: "0 4px 32px rgba(59, 130, 246, 0.30)" }}>
              שאצל אחרים לא תקבל.
            </span>
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {usps.map((u) => {
            const Icon = iconMap[u.iconName as keyof typeof iconMap] ?? UserCircle;
            return (
              <li key={u.title} className="reason-glass-card">
                <span className="border-beam" aria-hidden />
                <span className="shine-sweep" aria-hidden />
                <div className="reason-card-content">
                  <span className="reason-icon" aria-hidden>
                    <Icon size={28} weight="duotone" color="#3B82F6" />
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
