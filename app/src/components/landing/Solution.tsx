"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChatCircle, MagnifyingGlass, HandHeart } from "@phosphor-icons/react";
import { steps } from "@/data/content";

const stepIcons = [ChatCircle, MagnifyingGlass, HandHeart];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stepsRef.current) return;

    let ctxCleanup: (() => void) | null = null;

    (async () => {
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const stepEls = stepsRef.current!.querySelectorAll<HTMLElement>("li");

      const ctx = gsap.context(() => {
        // Set initial dim state explicitly (we need full fromTo)
        gsap.set(stepEls, { opacity: 0.18 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=80",
            end: "+=1600",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        stepEls.forEach((el) => {
          tl.fromTo(
            el,
            { opacity: 0.18 },
            { opacity: 1, duration: 1, ease: "power1.out", immediateRender: false },
            "+=0.4"
          );
        });
      }, sectionRef);

      ctxCleanup = () => ctx.revert();
    })();

    return () => {
      if (ctxCleanup) ctxCleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="section-y border-t border-[var(--color-border)]"
      aria-labelledby="solution-heading"
    >
      <div className="container-prose">
        <div className="max-w-[700px]">
          <p className="eyebrow-amber mb-4">כך אני עובדת</p>
          <h2 id="solution-heading" className="h-display-md max-w-[20ch]">
            שלושה צעדים. <span className="tint">בלי טפסים.</span>
          </h2>
        </div>

        <ol
          ref={stepsRef}
          className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {steps.map((s, i) => {
            const Icon = stepIcons[i] ?? ChatCircle;
            return (
              <li key={s.number} className="surface-card p-7 lg:p-8 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <span className="editorial-number" dir="ltr">
                    {s.number}
                  </span>
                  <Icon size={32} weight="duotone" color="var(--color-accent)" />
                </div>
                <h3 className="text-2xl font-extrabold mt-4 leading-snug text-[var(--color-text)]">
                  {s.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  {s.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
