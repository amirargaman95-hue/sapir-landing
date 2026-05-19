"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  /**
   * Motion variant. "fade-up" = legacy 700ms rise.
   * "reveal" = nm-ambition section entrance (580ms, ease-out).
   * "reveal-stagger" = same, with staggered direct children (~95-190ms cadence).
   * "curtain" = nm-ambition 3-layer curtain wipe (RTL right→left).
   */
  variant?: "fade-up" | "reveal" | "reveal-stagger" | "curtain";
};

/** Scroll-triggered entrance. The base CSS class handles the transition. */
export default function FadeUp({
  children,
  className = "",
  delay = 0,
  once = true,
  variant = "fade-up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsIn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsIn(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setIsIn(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`${variant} ${isIn ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
