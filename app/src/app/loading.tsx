export default function Loading() {
  return (
    <main
      dir="rtl"
      aria-live="polite"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090B",
        color: "#FAFAFA",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          aria-hidden
          style={{
            width: 36,
            height: 36,
            border: "3px solid rgba(59, 130, 246, 0.25)",
            borderTopColor: "#3B82F6",
            borderRadius: "50%",
            margin: "0 auto 1rem",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>טוען...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </main>
  );
}
