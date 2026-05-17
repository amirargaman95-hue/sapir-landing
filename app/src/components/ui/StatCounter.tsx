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

/** Counts up from 0 to `value` once the element is in view. SSR-safe: renders final value on server. */
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
  // SSR renders the final value so server output is not 0.
  const [shown, setShown] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Respect reduced motion — keep final value, skip animation.
    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      // No IO support — just leave the final value rendered (already set).
      return;
    }

    const r = ref.current.getBoundingClientRect();
    const inViewport = r.top < window.innerHeight && r.bottom > 0;

    if (inViewport) {
      // Already visible on mount (e.g. Hero stats): skip the count-up,
      // keep the final value that SSR already rendered.
      setStarted(true);
      return;
    }

    // Not yet visible — reset to 0 and animate when it scrolls in.
    setShown(0);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    // If we never reset to 0 (in-viewport-on-mount case), don't re-animate.
    if (shown === value) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setShown(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, value, duration]);

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
