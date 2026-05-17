"use client";

import { useEffect, useState } from "react";

// rAF-throttled scrollY hook. One listener per consumer, but each call is
// cheap — single window listener registered per mount.
export function useScrollY(): number {
  const [y, setY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setY(window.scrollY);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return y;
}
