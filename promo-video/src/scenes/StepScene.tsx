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
import { STEPS } from "../data";
import { StepIcon } from "../components/StepIcon";

type Props = {
  index: number;
  totalSteps: number;
};

/** Step scene with wipe-in transition + count-up + camera pan. */
export const StepScene: React.FC<Props> = ({ index, totalSteps }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const step = STEPS[index];

  // ----- Master in/out
  const inAnim = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 110 },
  });
  const outAnim = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const masterOpacity = Math.min(inAnim, outAnim);

  // ----- Wipe overlay (lime swoosh) at start
  const wipeProgress = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // ----- Count-up on the big number (0 → step.id)
  const countProgress = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const numShown = Math.round(countProgress * step.id);
  const numAnim = spring({
    fps,
    frame: frame - 4,
    config: { damping: 18, stiffness: 130 },
  });

  // ----- Title + body anim
  const titleAnim = spring({
    fps,
    frame: frame - 14,
    config: { damping: 20, stiffness: 130 },
  });
  const bodyAnim = spring({
    fps,
    frame: frame - 24,
    config: { damping: 22, stiffness: 140 },
  });
  const iconAnim = spring({
    fps,
    frame: frame - 6,
    config: { damping: 14, stiffness: 130 },
  });

  // ----- Camera pan (subtle parallax)
  const camX = interpolate(frame, [0, durationInFrames], [-12, 12]);
  const camScale = interpolate(frame, [0, durationInFrames], [1.0, 1.025]);

  // ----- Total progress
  const totalFill =
    ((index + interpolate(frame, [0, durationInFrames], [0, 1])) /
      totalSteps) *
    100;

  const numStr = String(step.id).padStart(2, "0");
  const numShownStr = String(numShown).padStart(2, "0");

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: masterOpacity,
      }}
    >
      {/* Lime wipe at start */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(110deg, transparent ${
            wipeProgress * 100 - 10
          }%, ${COLORS.lime} ${wipeProgress * 100}%, ${COLORS.lime} ${
            wipeProgress * 100 + 12
          }%, transparent ${wipeProgress * 100 + 24}%)`,
          opacity: wipeProgress < 1 ? 0.85 : 0,
          mixBlendMode: "screen",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      <div
        style={{
          width: 1320,
          padding: "60px 72px",
          background:
            "linear-gradient(160deg, rgba(245, 241, 234, 0.08) 0%, rgba(245, 241, 234, 0.03) 100%)",
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: 32,
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden",
          transform: `translateX(${camX}px) scale(${camScale})`,
        }}
      >
        {/* Top progress */}
        <div
          style={{
            position: "absolute",
            top: 0,
            insetInline: 0,
            height: 6,
            background: "rgba(245, 241, 234, 0.06)",
          }}
        >
          <div
            style={{
              position: "absolute",
              insetBlock: 0,
              insetInlineStart: 0,
              width: `${totalFill}%`,
              background: `linear-gradient(90deg, ${COLORS.lime}, ${COLORS.limeBright})`,
              boxShadow: `0 0 12px ${COLORS.limeGlow}`,
            }}
          />
        </div>

        {/* Live tag */}
        <div
          style={{
            position: "absolute",
            top: 22,
            insetInlineStart: 22,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(220, 235, 92, 0.10)",
            border: `1px solid ${COLORS.cardBorderStrong}`,
            color: COLORS.lime,
            fontFamily: FONTS.body,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 1.4,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#DC3545",
              boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.20)",
              opacity: 0.5 + 0.5 * Math.abs(Math.sin(frame / 6)),
            }}
          />
          חי
        </div>

        {/* Step counter top-right */}
        <div
          dir="ltr"
          style={{
            position: "absolute",
            top: 22,
            insetInlineEnd: 22,
            fontFamily: FONTS.display,
            fontSize: 22,
            fontWeight: 800,
            color: COLORS.textSecondary,
            letterSpacing: 1.2,
          }}
        >
          {numStr} / {String(totalSteps).padStart(2, "0")}
        </div>

        {/* Number (count-up) + Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 14,
          }}
        >
          <div
            dir="ltr"
            style={{
              fontFamily: FONTS.display,
              fontWeight: 900,
              fontSize: 240,
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              color: COLORS.lime,
              textShadow: `0 6px 60px ${COLORS.limeGlow}`,
              opacity: numAnim,
              transform: `translateX(${(1 - numAnim) * -40}px) scale(${
                0.92 + numAnim * 0.08
              })`,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {numShownStr}
          </div>

          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 32,
              background: "rgba(220, 235, 92, 0.12)",
              border: `2px solid ${COLORS.cardBorderStrong}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 24px 60px -16px ${COLORS.limeGlow}`,
              opacity: iconAnim,
              transform: `scale(${0.8 + iconAnim * 0.2}) rotate(${
                (1 - iconAnim) * -8 + Math.sin(frame / 12) * 2
              }deg)`,
            }}
          >
            <StepIcon kind={step.iconKind} size={92} color={COLORS.lime} />
          </div>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: FONTS.display,
            fontWeight: 900,
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: COLORS.textPrimary,
            margin: "32px 0 0",
            opacity: titleAnim,
            transform: `translateY(${(1 - titleAnim) * 30}px)`,
          }}
        >
          {step.title}
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 32,
            lineHeight: 1.55,
            color: COLORS.textSecondary,
            margin: "20px 0 0",
            maxWidth: 980,
            opacity: bodyAnim,
            transform: `translateY(${(1 - bodyAnim) * 18}px)`,
          }}
        >
          {step.body}
        </p>

        {/* Bottom progress */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 40,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 4,
              background: "rgba(245, 241, 234, 0.10)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${totalFill}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${COLORS.lime}, ${COLORS.limeBright})`,
                borderRadius: 999,
              }}
            />
          </div>
          <div
            dir="ltr"
            style={{
              fontFamily: FONTS.body,
              fontSize: 18,
              fontWeight: 800,
              color: COLORS.textSecondary,
              letterSpacing: 1,
            }}
          >
            {Math.round(totalFill)}%
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
