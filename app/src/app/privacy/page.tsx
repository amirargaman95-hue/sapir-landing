import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מדיניות פרטיות — ספיר אזולאי",
  description:
    "מדיניות פרטיות לפי חוק הגנת הפרטיות התשמ״א-1981 ותיקון 13 (חוק 7A).",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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
          מדיניות פרטיות
        </h1>

        <p style={{ opacity: 0.7 }}>
          טיוטה — יושלם לפני launch על ידי יועץ משפטי. הנוסח להלן הוא נוסח גנרי
          התואם את עקרונות חוק הגנת הפרטיות.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          כללי
        </h2>
        <p>
          מסמך זה מתאר את אופן איסוף, שימוש ושמירה של מידע אישי באתר.
          השימוש באתר מהווה הסכמה לתנאי מדיניות פרטיות זו.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          איסוף מידע
        </h2>
        <ul style={{ paddingInlineStart: "1.4rem" }}>
          <li>
            מידע שתמסור ביוזמתך בעת יצירת קשר (שם, טלפון, אימייל, פרטי משרה).
          </li>
          <li>
            מידע טכני אנונימי הנאסף אוטומטית (כתובת IP, סוג דפדפן, מערכת הפעלה,
            דפי ביקור) באמצעות Google Analytics ו-Microsoft Clarity.
          </li>
        </ul>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          עוגיות (Cookies)
        </h2>
        <p>
          האתר משתמש בעוגיות לצרכי ניתוח תנועה ושיפור החוויה. אישור או דחייה
          ניתנים דרך באנר העוגיות בכניסה הראשונה. ניתן לשנות החלטה בכל עת
          באמצעות ניקוי localStorage של הדפדפן.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          זכויותיך
        </h2>
        <p>
          לפי חוק הגנת הפרטיות, התשמ״א-1981 ותיקוניו, יש לך זכות לעיין במידע
          שנאסף עליך, לבקש את תיקונו או את מחיקתו. לפנייה: בוואטסאפ
          055-568-8102.
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
