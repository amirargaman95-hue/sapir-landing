import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "הצהרת נגישות — ספיר אזולאי",
  description:
    "הצהרת נגישות לפי חוק שוויון זכויות לאנשים עם מוגבלות ותקנות שירות, התשע״ג-2013.",
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <main
      id="main"
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#09090B",
        color: "#FAFAFA",
        padding: "5rem 1.5rem",
      }}
    >
      <article
        style={{
          maxWidth: "44rem",
          margin: "0 auto",
          lineHeight: 1.75,
          fontSize: "1rem",
        }}
      >
        <p
          style={{
            color: "#3B82F6",
            letterSpacing: 3,
            fontSize: "0.8rem",
            marginBottom: "0.6rem",
          }}
        >
          מידע משפטי
        </p>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "1.2rem",
          }}
        >
          הצהרת נגישות
        </h1>

        <p>
          הצהרת נגישות לפי חוק שוויון זכויות לאנשים עם מוגבלות, תקנות שירות,
          התשע״ג-2013.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          המחויבות שלנו לנגישות
        </h2>
        <p>
          אנחנו רואים חשיבות עליונה במתן שירות נגיש לכלל האוכלוסייה, לרבות
          אנשים עם מוגבלות. האתר תוכנן ונבנה כך שיהיה נגיש בהתאם להנחיות
          WCAG 2.1 ברמת AA, ככל הניתן.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          התאמות נגישות באתר
        </h2>
        <ul style={{ paddingInlineStart: "1.4rem" }}>
          <li>תמיכה בקוראי מסך וניווט במקלדת.</li>
          <li>טקסט חלופי לתמונות.</li>
          <li>ניגודיות צבעים תואמת לתקן.</li>
          <li>תמיכה ב-prefers-reduced-motion להפחתת אנימציות.</li>
          <li>מבנה כותרות סמנטי.</li>
        </ul>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          פנייה לרכז הנגישות
        </h2>
        <p>
          אם נתקלתם בבעיית נגישות, אנא צרו קשר ונטפל בכך בהקדם.
          <br />
          ספיר אזולאי · רכזת נגישות
          <br />
          וואטסאפ:{" "}
          <a
            href="https://wa.me/972555688102"
            style={{ color: "#3B82F6", textDecoration: "underline" }}
          >
            055-568-8102
          </a>
        </p>

        <p style={{ marginTop: "2rem", opacity: 0.6, fontSize: "0.85rem" }}>
          תאריך עדכון אחרון: {new Date().toLocaleDateString("he-IL")}
        </p>

        <div style={{ marginTop: "3rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "#3B82F6",
              color: "#FFFFFF",
              padding: "0.7rem 1.4rem",
              borderRadius: 999,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            חזרה לדף הבית
          </Link>
        </div>
      </article>
    </main>
  );
}
