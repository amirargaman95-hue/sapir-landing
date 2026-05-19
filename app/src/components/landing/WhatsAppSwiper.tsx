"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  WhatsappLogo,
  CheckCircle,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import Lightbox from "@/components/ui/Lightbox";
import { proofs } from "@/data/content";

export default function WhatsAppSwiper() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Track scroll position to update active index (for dots / arrows)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = track.querySelectorAll<HTMLElement>(".wa-wall-card");
      if (!cards.length) return;
      const trackRect = track.getBoundingClientRect();
      const mid = trackRect.left + trackRect.width / 2;
      let nearest = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const cMid = r.left + r.width / 2;
        const d = Math.abs(cMid - mid);
        if (d < bestDist) {
          bestDist = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile center-focus: mark the card closest to the horizontal center
  // of the track as `.is-center` via IntersectionObserver with a narrow
  // centered root margin. Only active on mobile viewport.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const mq = window.matchMedia("(max-width: 768px)");
    let obs: IntersectionObserver | null = null;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".wa-wall-card")
    );

    const teardown = () => {
      obs?.disconnect();
      obs = null;
      cards.forEach((c) => c.classList.remove("is-center"));
    };

    const setup = () => {
      teardown();
      if (!mq.matches) return;
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              cards.forEach((c) => {
                if (c !== el) c.classList.remove("is-center");
              });
              el.classList.add("is-center");
            }
          });
        },
        {
          root: track,
          // Narrow horizontal band in the middle of the track.
          rootMargin: "0px -45% 0px -45%",
          threshold: 0.01,
        }
      );
      cards.forEach((c) => obs!.observe(c));
    };

    setup();
    const onChange = () => setup();
    mq.addEventListener?.("change", onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      teardown();
    };
  }, []);

  const nudge = (dir: "next" | "prev") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".wa-wall-card");
    if (!card) return;
    const w = card.offsetWidth + 24;
    track.scrollBy({
      left: dir === "next" ? -w : w, // RTL: visual next = scroll left
      behavior: "smooth",
    });
  };

  const proofCount: number = proofs.length;
  if (proofCount === 0) return null;

  return (
    <div className="wa-wall">
      <div className="wa-wall-header">
        <span className="stat">
          <span className="dot" />
          <WhatsappLogo size={14} weight="fill" />
          {proofs.length} הודעות אמיתיות אחרי השמה
        </span>
        <h2>
          המעסיקים שלי. <span className="accent">במילים שלהם.</span>
        </h2>
        <p>
          הודעות וואטסאפ אמיתיות ממעסיקים אחרי שתקופת האחריות עברה והעובד נשאר. גלול ימינה/שמאלה לראות הכל.
        </p>
      </div>

      <div className="wa-wall-track" ref={trackRef} dir="rtl">
        {proofs.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setLightbox(i)}
            className="wa-wall-card"
            aria-label={`הגדל הודעה ${i + 1}`}
          >
            <div className="img-wrap">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 360px"
                className="object-contain"
                draggable={false}
              />
            </div>
            <div className="meta">
              <span className="badge">
                <CheckCircle size={16} weight="fill" />
                השמה הצליחה
              </span>
              <span className="num" dir="ltr">
                {String(i + 1).padStart(2, "0")} / {String(proofs.length).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Controls — manual only */}
      <div className="wa-wall-controls">
        <button
          type="button"
          className="wa-swiper-btn"
          onClick={() => nudge("prev")}
          aria-label="הקודם"
        >
          <CaretRight size={18} weight="bold" />
        </button>
        <div className="wa-swiper-dots" role="tablist">
          {proofs.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`wa-swiper-dot ${active === i ? "is-active" : ""}`}
              onClick={() => {
                const track = trackRef.current;
                if (!track) return;
                const cards = track.querySelectorAll<HTMLElement>(".wa-wall-card");
                cards[i]?.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              aria-label={`עבור להודעה ${i + 1}`}
              role="tab"
              aria-selected={active === i}
            />
          ))}
        </div>
        <button
          type="button"
          className="wa-swiper-btn"
          onClick={() => nudge("next")}
          aria-label="הבא"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
      </div>

      <Lightbox
        open={lightbox !== null}
        onClose={() => setLightbox(null)}
        label="הודעת וואטסאפ מוגדלת"
      >
        {lightbox !== null && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={proofs[lightbox].src}
            alt={proofs[lightbox].alt}
            className="max-h-[88vh] max-w-full object-contain rounded-[14px]"
          />
        )}
      </Lightbox>
    </div>
  );
}
