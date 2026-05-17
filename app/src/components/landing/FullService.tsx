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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(1);
  const total = fullService.items.length;

  // GSAP ScrollTrigger: per-card reveal + progress rail
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: show everything active immediately
    if (reduceMotion) {
      cardsRef.current.forEach((li) => li?.classList.add("is-active"));
      setProgress(1);
      setReached(total);
      return;
    }

    let triggers: Array<{ kill: () => void }> = [];
    let gsapMod: typeof import("gsap").gsap | null = null;

    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapMod = gsap;

      // Per-card reveal — only hide cards that are below the fold at mount.
      // Cards already in viewport stay visible immediately (fail-safe if
      // ScrollTrigger never fires onEnter for an already-visible element).
      cardsRef.current.forEach((li, i) => {
        if (!li) return;

        const rect = li.getBoundingClientRect();
        const isInView =
          rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

        if (isInView) {
          li.classList.add("is-active");
          gsap.set(li, { opacity: 1, y: 0 });
          setReached((r) => Math.max(r, i + 1));
        } else {
          gsap.set(li, { opacity: 0, y: 32 });
        }

        const t = ScrollTrigger.create({
          trigger: li,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            li.classList.add("is-active");
            gsap.to(li, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto",
            });
            setReached((r) => Math.max(r, i + 1));
          },
          onEnterBack: () => {
            li.classList.add("is-active");
            gsap.to(li, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
            setReached((r) => Math.max(r, i + 1));
          },
          onLeaveBack: () => {
            li.classList.remove("is-active");
            gsap.to(li, {
              opacity: 0,
              y: 32,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
            });
            setReached((r) => Math.min(r, i));
          },
        });
        triggers.push(t);
      });

      // Section-level progress reporter for the rail
      const progressTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 80%",
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
      triggers.push(progressTrigger);

      // Refresh once measurements settle
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill());
      triggers = [];
      // Reset cards in case of HMR
      if (gsapMod) {
        cardsRef.current.forEach((li) => li && gsapMod!.set(li, { clearProps: "all" }));
      }
    };
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
      ref={sectionRef}
      className="sticky-stack-section"
      aria-labelledby="full-service-heading"
    >
      <div className="sticky-stack-grid" ref={wrapRef}>
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

        {/* Vertical Timeline */}
        <div className="sticky-stack-list">
          <div className="timeline">
            <span className="timeline-rail" aria-hidden />
            <span
              className="timeline-progress"
              style={{ height: `${progress * 100}%` }}
              aria-hidden
            />
            <ol className="timeline-cards">
              {fullService.items.map((step, i) => {
                const Icon =
                  iconMap[step.iconName as keyof typeof iconMap] ?? Compass;
                const numStr = String(i + 1).padStart(2, "0");

                return (
                  <li
                    key={step.title}
                    ref={(el) => {
                      cardsRef.current[i] = el;
                    }}
                    className="timeline-card"
                  >
                    <span className="timeline-node" aria-hidden />
                    <article
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
                            <Icon size={32} weight="duotone" color="#3B82F6" />
                          </span>
                        </span>
                      </div>

                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
