import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { COLORS, FONTS } from "../theme";

/** End card — brand wordmark + CTA. */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const a = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 110 },
  });
  const ctaA = spring({
    fps,
    frame: frame - 18,
    config: { damping: 22, stiffness: 130 },
  });
  const dotPulse = interpolate(Math.sin(frame / 4), [-1, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 8%",
      }}
    >
      {/* Logo monogram */}
      <div
        style={{
          width: 132,
          height: 132,
          borderRadius: 30,
          background: COLORS.white,
          border: `3px solid ${COLORS.lime}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 0 8px rgba(220, 235, 92, 0.18), 0 24px 60px -10px ${COLORS.limeGlow}`,
          opacity: a,
          transform: `scale(${0.85 + a * 0.15}) rotate(${(1 - a) * -6}deg)`,
        }}
      >
        <span
          dir="ltr"
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: 64,
            color: COLORS.accent,
            letterSpacing: "-0.05em",
          }}
        >
          S.
        </span>
      </div>

      {/* Wordmark */}
      <h2
        style={{
          fontFamily: FONTS.display,
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1.05,
          color: COLORS.textPrimary,
          margin: "32px 0 0",
          opacity: a,
          transform: `translateY(${(1 - a) * 24}px)`,
        }}
      >
        ספיר אזולאי
      </h2>

      {/* Tagline */}
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 30,
          color: COLORS.textSecondary,
          fontWeight: 600,
          margin: "12px 0 0",
          letterSpacing: 1.2,
          opacity: a,
        }}
      >
        בוטיק גיוס · מפעלים ועסקים בישראל
      </p>

      {/* CTA pill */}
      <div
        style={{
          marginTop: 56,
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          padding: "22px 52px",
          borderRadius: 999,
          background: `linear-gradient(105deg, ${COLORS.lime} 0%, ${COLORS.limeBright} 100%)`,
          boxShadow: `0 18px 44px -10px ${COLORS.limeGlow}, 0 0 0 1px rgba(220, 235, 92, 0.30) inset`,
          color: COLORS.bgGrad1,
          fontFamily: FONTS.display,
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: "-0.01em",
          opacity: ctaA,
          transform: `translateY(${(1 - ctaA) * 18}px) scale(${
            0.95 + ctaA * 0.05
          })`,
        }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#25D366",
            boxShadow: `0 0 0 ${5 * dotPulse}px rgba(37, 211, 102, 0.30)`,
          }}
        />
        דבר איתי בוואטסאפ
      </div>
    </AbsoluteFill>
  );
};
