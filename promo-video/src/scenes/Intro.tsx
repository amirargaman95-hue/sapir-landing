import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const AUDIENCE = ["מפעלים", "בוטיקים", "עסקים משפחתיים", "צוותי תפעול"];

/** Cinematic intro: dot particles → wordmark → audience morph → "9 שלבים." */
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase 1: 0-30  — dots form, "ספיר אזולאי" slides up
  // Phase 2: 30-110 — "מגייסת ל" + morphing audience word
  // Phase 3: 110-end — "9 שלבים. אני עושה הכל."

  // Wordmark
  const wordA = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 110 },
  });
  const wordOut = interpolate(frame, [85, 115], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wordOpacity = Math.min(wordA, wordOut);

  // Audience phase: 30-110
  const audPhaseProgress = interpolate(frame, [30, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const audIdx = Math.min(
    AUDIENCE.length - 1,
    Math.floor(audPhaseProgress * AUDIENCE.length * 0.999)
  );
  const audPosInWord = (audPhaseProgress * AUDIENCE.length) % 1;
  const audIn = interpolate(audPosInWord, [0, 0.2], [0, 1], {
    extrapolateRight: "clamp",
  });
  const audOut = interpolate(audPosInWord, [0.7, 1], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const audWordOpacity = Math.min(audIn, audOut);

  const audPhaseA = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const audPhaseOut = interpolate(frame, [105, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const audPhaseOpacity = Math.min(audPhaseA, audPhaseOut);

  // Phase 3: "9 שלבים." final
  const finalA = spring({
    fps,
    frame: frame - 130,
    config: { damping: 14, stiffness: 100 },
  });
  const finalSubA = spring({
    fps,
    frame: frame - 150,
    config: { damping: 18, stiffness: 130 },
  });

  // Particle dots (orbit around brand)
  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2 + frame / 80;
    const radius = 380 + Math.sin(frame / 30 + i) * 30;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.55;
    const a = interpolate(frame, [0, 40 + i * 2], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(frame, [180, 240], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return {
      x,
      y,
      opacity: a * fadeOut,
      size: 4 + (i % 3) * 2,
      key: i,
    };
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 8%",
      }}
    >
      {/* Particle orbit */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {particles.map((p) => (
          <div
            key={p.key}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: p.size,
              height: p.size,
              borderRadius: 999,
              background: COLORS.lime,
              boxShadow: `0 0 ${p.size * 3}px ${COLORS.limeGlow}`,
              transform: `translate(${p.x}px, ${p.y}px)`,
              opacity: p.opacity * 0.7,
            }}
          />
        ))}
      </div>

      {/* PHASE 1: Wordmark */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%)`,
          opacity: wordOpacity,
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 156,
            height: 156,
            borderRadius: 32,
            background: COLORS.white,
            border: `3px solid ${COLORS.lime}`,
            boxShadow: `0 0 0 8px rgba(220, 235, 92, 0.20), 0 0 80px ${COLORS.limeGlow}`,
            transform: `scale(${0.6 + wordA * 0.4}) rotate(${
              (1 - wordA) * -8
            }deg)`,
            margin: "0 auto",
          }}
        >
          <span
            dir="ltr"
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize: 88,
              color: COLORS.accent,
              letterSpacing: "-0.05em",
            }}
          >
            S.
          </span>
        </div>
        <h1
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: 102,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: COLORS.textPrimary,
            margin: "32px 0 0",
            transform: `translateY(${(1 - wordA) * 28}px)`,
          }}
        >
          ספיר אזולאי
        </h1>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            color: COLORS.lime,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: "10px 0 0",
            opacity: wordA,
          }}
        >
          BOUTIQUE RECRUITMENT
        </p>
      </div>

      {/* PHASE 2: "מגייסת ל" + morphing audience */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%)`,
          opacity: audPhaseOpacity,
          textAlign: "center",
          width: "100%",
        }}
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 38,
            color: COLORS.textSecondary,
            fontWeight: 600,
            letterSpacing: 1.5,
            margin: 0,
          }}
        >
          מגייסת ל-
        </p>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: 168,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: COLORS.lime,
            textShadow: `0 6px 60px ${COLORS.limeGlow}`,
            margin: "20px 0 0",
            opacity: audWordOpacity,
            transform: `translateY(${(1 - audIn) * 30}px) scale(${
              0.9 + audIn * 0.1
            })`,
          }}
        >
          {AUDIENCE[audIdx]}
        </h2>
      </div>

      {/* PHASE 3: "9 שלבים. אני עושה הכל." */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%)`,
          opacity: finalA,
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: 196,
            lineHeight: 0.96,
            letterSpacing: "-0.05em",
            color: COLORS.textPrimary,
            margin: 0,
            transform: `translateY(${(1 - finalA) * 36}px) scale(${
              0.92 + finalA * 0.08
            })`,
          }}
        >
          <span
            dir="ltr"
            style={{
              color: COLORS.lime,
              textShadow: `0 6px 60px ${COLORS.limeGlow}`,
            }}
          >
            9
          </span>{" "}
          שלבים.
        </h1>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 44,
            color: COLORS.textSecondary,
            fontWeight: 600,
            margin: "28px 0 0",
            opacity: finalSubA,
            transform: `translateY(${(1 - finalSubA) * 18}px)`,
          }}
        >
          אני עושה הכל. אתה ממשיך לנהל את העסק.
        </p>
      </div>
    </AbsoluteFill>
  );
};
