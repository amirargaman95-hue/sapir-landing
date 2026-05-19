import { ImageResponse } from "next/og";

export const alt = "ספיר אזולאי · גיוס למפעלים בישראל";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #09090B 0%, #18181B 60%, #27272A 100%)",
          color: "#FAFAFA",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#C6A15B",
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          SAPIR AZULAY
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 900,
            lineHeight: 1.05,
            textAlign: "right",
            maxWidth: 1000,
            color: "#FAFAFA",
          }}
        >
          ספיר אזולאי
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: "#C6A15B",
            marginTop: 16,
            textAlign: "right",
          }}
        >
          גיוס למפעלים בישראל
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.72)",
            marginTop: 32,
            textAlign: "right",
          }}
        >
          תשלום רק אחרי גיוס · אחריות בכתב
        </div>
      </div>
    ),
    { ...size }
  );
}
