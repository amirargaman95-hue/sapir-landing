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
        right: "1rem",
        bottom: "1rem",
        zIndex: 80,
        maxWidth: "22rem",
        background: "rgba(26, 34, 56, 0.97)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#F5EDE0",
        padding: "0.9rem 1rem",
        borderRadius: 14,
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        fontFamily: "var(--font-heebo), system-ui, sans-serif",
        fontSize: "0.85rem",
        lineHeight: 1.5,
      }}
    >
      <p style={{ margin: 0, marginBottom: "0.7rem" }}>
        אנחנו משתמשים בעוגיות לשיפור החוויה ולמדידת תנועה.{" "}
        <a
          href="/privacy"
          style={{ textDecoration: "underline", color: "#E8B574" }}
        >
          מדיניות פרטיות
        </a>
        .
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={() => decide(true)}
          style={{
            flex: 1,
            background: "#C49A65",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 999,
            padding: "0.5rem 0.9rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          אישור
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          style={{
            flex: 1,
            background: "transparent",
            color: "#F5EDE0",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 999,
            padding: "0.5rem 0.9rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          דחייה
        </button>
      </div>
    </div>
  );
}
