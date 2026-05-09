"use client";

import { useEffect, useRef, useState } from "react";
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
} from "@phosphor-icons/react";
import { fullService } from "@/data/content";

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(1);
  const total = fullService.items.length;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      const p = Math.max(0, Math.min(1, scrolled / span));
      setProgress(p);
      setReached(Math.min(total, Math.max(1, Math.ceil(p * total))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [total]);

  // Spotlight on cards
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".stack-card");
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
      id="full-service"
      ref={wrapRef}
      className="sticky-stack-section"
      aria-labelledby="full-service-heading"
    >
      <div className="sticky-stack-grid">
        {/* Sticky header */}
        <header className="sticky-stack-header">
          <p className="eyebrow-amber">{fullService.eyebrow}</p>
          <h2 id="full-service-heading">
            <span dir="ltr" className="accent">9</span> שלבים.{" "}
            <span className="accent">אני עושה הכל.</span>
          </h2>
          <p>{fullService.intro}</p>

          <div className="progress" aria-hidden>
            <span dir="ltr">
              {String(reached).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="bar">
              <span className="bar-fill" style={{ width: `${progress * 100}%` }} />
            </span>
          </div>
        </header>

        {/* Stack of cards */}
        <div className="sticky-stack-list">
          {fullService.items.map((step, i) => {
            const Icon =
              iconMap[step.iconName as keyof typeof iconMap] ?? Compass;
            const numStr = String(i + 1).padStart(2, "0");
            return (
              <article
                key={step.title}
                className="stack-card"
                style={{ ["--i" as string]: i }}
              >
                <span className="watermark-num" dir="ltr">
                  {numStr}
                </span>

                <div className="card-row">
                  <span className="step-tag">
                    <span>שלב</span>
                    <span className="num" dir="ltr">{numStr}</span>
                  </span>
                  <span className="lottie-icon" aria-hidden>
                    <span className="anim">
                      <Icon size={32} weight="duotone" color="#DCEB5C" />
                    </span>
                  </span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
