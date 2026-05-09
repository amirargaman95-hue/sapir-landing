"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

/** Scroll-triggered fade + translate-up. CSS class .fade-up handles the transition. */
export default function FadeUp({
  children,
  className = "",
  delay = 0,
  once = true,
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
      className={`fade-up ${isIn ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
