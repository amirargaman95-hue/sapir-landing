import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "תנאי שימוש — ספיר אזולאי",
  description: "תנאי שימוש באתר ספיר אזולאי — שירותי גיוס והשמה למפעלים.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
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
          תנאי שימוש
        </h1>

        <p style={{ opacity: 0.7 }}>
          טיוטה — יושלם לפני launch על ידי יועץ משפטי.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          כללי
        </h2>
        <p>
          השימוש באתר זה כפוף לתנאי השימוש המפורטים במסמך זה. עצם השימוש באתר
          מהווה הסכמה מלאה לתנאים אלה. אם אינך מסכים — הימנע משימוש באתר.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          השירות
        </h2>
        <p>
          האתר מציג שירותי גיוס והשמה הניתנים על ידי ספיר אזולאי לבעלי מפעלים
          ועסקים בישראל. תנאי ההתקשרות, התשלום והאחריות סוכמים בנפרד בכתב מול
          כל לקוח לפני תחילת ההתקשרות.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          קניין רוחני
        </h2>
        <p>
          כל התוכן באתר — לרבות טקסט, תמונות, סימני מסחר ועיצוב — הוא רכושה
          הבלעדי של ספיר אזולאי או של בעלי הזכויות הרלוונטיים. אין להעתיק, לשכפל
          או לעשות בו שימוש מסחרי ללא אישור מראש ובכתב.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          הגבלת אחריות
        </h2>
        <p>
          התוכן באתר ניתן AS IS. בעלת האתר אינה אחראית לנזק ישיר או עקיף
          הנובע מהשימוש באתר או מהסתמכות על המידע שבו, מלבד מקרים שנקבעו במפורש
          בהסכם בכתב.
        </p>

        <h2 style={{ fontSize: "1.4rem", marginTop: "2rem", fontWeight: 800 }}>
          דין וסמכות שיפוט
        </h2>
        <p>
          על תנאי שימוש אלה יחול הדין הישראלי בלבד. סמכות השיפוט הבלעדית נתונה
          לבתי המשפט המוסמכים במחוז תל-אביב.
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
