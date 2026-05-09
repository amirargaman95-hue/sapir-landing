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

/** Counts up from 0 to `value` once the element is in view. */
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
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
    // If already in viewport on mount (Hero stats), trigger immediately.
    const r = ref.current.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setStarted(true);
      return;
    }
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
