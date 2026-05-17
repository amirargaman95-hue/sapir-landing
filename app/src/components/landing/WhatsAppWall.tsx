"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Lightbox from "@/components/ui/Lightbox";
import { proofs } from "@/data/content";

// Bento grid spans — desktop: 4-2-3 mosaic
const spans = [
  "md:col-span-2 md:row-span-2", // 1 — large
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2", // 4 — tall
  "md:col-span-2 md:row-span-1", // 5 — wide
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1", // 8 — wide
  "md:col-span-1 md:row-span-1",
];

export default function WhatsAppWall() {
  const gridRef = useRef<HTMLUListElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    let cleanup: (() => void) | null = null;

    (async () => {
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const items = gridRef.current!.querySelectorAll<HTMLElement>("li");

      const ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            immediateRender: false,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }, gridRef);

      cleanup = () => ctx.revert();
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section
      id="whatsapp"
      className="section-y border-t border-[var(--color-border)] bg-[var(--color-card)]"
      aria-labelledby="whatsapp-heading"
    >
      <div className="container-prose">
        <div className="max-w-[760px] flex flex-col gap-3">
          <p className="eyebrow-amber">הוכחה כתובה</p>
          <h2 id="whatsapp-heading" className="h-display-md max-w-[24ch]">
            מה כתבו לי המעסיקים <span className="tint">אחרי ההשמה.</span>
          </h2>
          <p className="mt-1 text-[var(--color-muted)] leading-relaxed">
            תאריכים, שמות, תוצאות. בלי קלישאות, בלי פוטושופ.
          </p>
        </div>

        <ul
          ref={gridRef}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] lg:auto-rows-[240px] gap-3 md:gap-4"
        >
          {proofs.map((p, i) => (
            <li
              key={p.src}
              className={`relative overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface-2)] transition-colors hover:border-[rgba(196,154,101,0.5)] ${spans[i] ?? ""}`}
            >
              <button
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-label={`הגדל הודעת וואטסאפ ${i + 1}`}
                className="block w-full h-full group"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        open={activeIdx !== null}
        onClose={() => setActiveIdx(null)}
        label="הודעת וואטסאפ מוגדלת"
      >
        {activeIdx !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={proofs[activeIdx].src}
            alt={proofs[activeIdx].alt}
            className="max-h-[88vh] max-w-full object-contain rounded-sm"
          />
        )}
      </Lightbox>
    </section>
  );
}
