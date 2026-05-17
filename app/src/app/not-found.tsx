import Link from "next/link";

export default function NotFound() {
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
          404
        </p>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "0.8rem",
          }}
        >
          הדף לא נמצא
        </h1>
        <p
          style={{
            opacity: 0.75,
            marginBottom: "1.8rem",
            lineHeight: 1.6,
          }}
        >
          הקישור שביקשת לא קיים או הוסר. אפשר לחזור לדף הבית ולהמשיך משם.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#C49A65",
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
    </main>
  );
}
