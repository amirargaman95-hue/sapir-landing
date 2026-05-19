"use client";

import { useEffect, useRef } from "react";
import { touchSeen } from "./actions";

// A4: after an authed page renders, stamp the `admin_seen` cookie to "now"
// exactly once. Cookies cannot be written during Server Component render in
// Next 16, so this fires the tiny `touchSeen` Server Action from an effect.
// The page already captured the *previous* seen value for the "new" badges,
// so updating it here does not affect the current view's highlighting.
export default function SeenStamp() {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    void touchSeen();
  }, []);
  return null;
}
