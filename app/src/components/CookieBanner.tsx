"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent =
      typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const decide = (accept: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, accept ? "granted" : "denied");
    } catch {}
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: accept ? "granted" : "denied",
        analytics_storage: accept ? "granted" : "denied",
        ad_user_data: accept ? "granted" : "denied",
        ad_personalization: accept ? "granted" : "denied",
      });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="הודעת עוגיות"
      style={{
        position: "fixed",
        insetInline: 0,
        bottom: 0,
        zIndex: 55,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
        background: "rgba(24, 24, 27, 0.97)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        color: "#FAFAFA",
        padding: "0.6rem 1rem",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.35)",
        fontFamily: "var(--font-heebo), system-ui, sans-serif",
        fontSize: "0.82rem",
        lineHeight: 1.35,
      }}
    >
      <p style={{ margin: 0, flex: "1 1 auto", minWidth: 0 }}>
        אנחנו משתמשים בעוגיות לשיפור החוויה ולמדידת תנועה.{" "}
        <a
          href="/privacy"
          style={{ textDecoration: "underline", color: "#60A5FA" }}
        >
          מדיניות פרטיות
        </a>
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => decide(true)}
          style={{
            background: "#3B82F6",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 999,
            padding: "0 1rem",
            minHeight: 44,
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          אישור
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          style={{
            background: "transparent",
            color: "#FAFAFA",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 999,
            padding: "0 1rem",
            minHeight: 44,
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          דחייה
        </button>
      </div>
    </div>
  );
}
