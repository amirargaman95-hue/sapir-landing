import React from "react";
import { Composition } from "remotion";
import { SapirPromo } from "./Composition";
import { TOTAL_FRAMES, FPS } from "./theme";
import { loadFont } from "@remotion/google-fonts/Heebo";

loadFont();

export const Root: React.FC = () => {
  return (
    <>
      {/* 1080p landscape (16:9) */}
      <Composition
        id="SapirPromo"
        component={SapirPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* 9:16 vertical (Reels / Shorts / TikTok) */}
      <Composition
        id="SapirPromoVertical"
        component={SapirPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
