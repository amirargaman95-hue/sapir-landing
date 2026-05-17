"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        background: "#0F1729",
        color: "#F5EDE0",
      }}
    >
      <div style={{ maxWidth: "32rem" }}>
        <p
          style={{
            color: "#C49A65",
            letterSpacing: 3,
            fontSize: "0.85rem",
            marginBottom: "0.8rem",
          }}
        >
          שגיאה
        </p>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "0.8rem",
          }}
        >
          קרתה תקלה
        </h1>
        <p
          style={{
            opacity: 0.75,
            marginBottom: "1.8rem",
            lineHeight: 1.6,
          }}
        >
          משהו השתבש. אפשר לנסות שוב או לחזור לדף הבית.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              background: "#C49A65",
              color: "#FFFFFF",
              border: "none",
              padding: "0.7rem 1.4rem",
              borderRadius: 999,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            נסה שוב
          </button>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "transparent",
              color: "#F5EDE0",
              border: "1px solid rgba(42,31,61,0.25)",
              padding: "0.7rem 1.4rem",
              borderRadius: 999,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            דף הבית
          </Link>
        </div>
      </div>
    </main>
  );
}
