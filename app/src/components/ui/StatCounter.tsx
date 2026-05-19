"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  /** Hebrew suffix word (e.g., "שנים", "שלבים") rendered after the number in RTL flow */
  suffixWord?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up to `value` when scrolled into view.
 * Guaranteed-correct: the final value is always rendered. The count-up is a
 * progressive enhancement that can only ever lower `shown` transiently while
 * animating — it never leaves the number stuck at 0.
 */
export default function StatCounter({
  value,
  suffix = "",
  suffixWord,
  prefix = "",
  label,
  duration = 1400,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Always render the final value (SSR + client default). Never 0.
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // keep final value, no animation

    let raf = 0;
    let done = false;

    const animate = () => {
      if (done) return;
      done = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setShown(Math.round(value * eased));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setShown(value); // hard-snap to exact final value
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const r = el.getBoundingClientRect();
    const inViewport =
      r.top < window.innerHeight && r.bottom > 0 && r.height >= 0;

    if (typeof IntersectionObserver === "undefined") {
      // No IO — animate immediately, final value already safe.
      animate();
      return () => cancelAnimationFrame(raf);
    }

    if (inViewport) {
      animate();
      return () => cancelAnimationFrame(raf);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            animate();
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);

    // Safety net: if the observer never fires for any reason, the final
    // value is still on screen (shown === value), so nothing is stuck.
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <div ref={ref} className={`stat-counter ${className}`}>
      <span className="num">
        {suffixWord ? (
          <>
            <span dir="ltr">
              {prefix}
              {shown}
              {suffix}
            </span>
            <span className="num-word">{suffixWord}</span>
          </>
        ) : (
          <span dir="ltr">
            {prefix}
            {shown}
            {suffix}
          </span>
        )}
      </span>
      <span className="label">{label}</span>
    </div>
  );
}
