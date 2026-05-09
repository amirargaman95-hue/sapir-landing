import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";

/** Animated dark gradient + subtle grid + lime glow that breathes. */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const breathe = interpolate(
    Math.sin(frame / 40),
    [-1, 1],
    [0.85, 1.0]
  );
  const drift = interpolate(frame, [0, 1080], [0, 80]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 70% 60% at 75% 20%, rgba(44, 81, 135, 0.55) 0%, transparent 60%),
          radial-gradient(ellipse 55% 65% at 18% 80%, rgba(220, 235, 92, ${0.20 *
            breathe}) 0%, transparent 65%),
          linear-gradient(160deg, ${COLORS.bgGrad1} 0%, ${
          COLORS.bgGrad2
        } 35%, ${COLORS.bgGrad3} 100%)`,
      }}
    >
      {/* Subtle grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: `${drift}px ${drift}px`,
          maskImage:
            "radial-gradient(ellipse at 50% 50%, #000 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, #000 25%, transparent 80%)",
        }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
