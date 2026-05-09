import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./components/Background";
import { Intro } from "./scenes/Intro";
import { StepScene } from "./scenes/StepScene";
import { Outro } from "./scenes/Outro";
import { TIMING, FPS } from "./theme";
import { STEPS } from "./data";

export const SapirPromo: React.FC = () => {
  let cursor = 0;
  const introFrom = cursor;
  cursor += TIMING.intro;

  const stepFroms: number[] = [];
  for (let i = 0; i < STEPS.length; i++) {
    stepFroms.push(cursor);
    cursor += TIMING.perStep;
  }

  const outroFrom = cursor;

  return (
    <AbsoluteFill style={{ fontFamily: "Heebo, system-ui, sans-serif" }}>
      <Background />

      <Sequence from={introFrom} durationInFrames={TIMING.intro}>
        <Intro />
      </Sequence>

      {STEPS.map((s, i) => (
        <Sequence
          key={s.id}
          from={stepFroms[i]}
          durationInFrames={TIMING.perStep}
        >
          <StepScene index={i} totalSteps={STEPS.length} />
        </Sequence>
      ))}

      <Sequence from={outroFrom} durationInFrames={TIMING.outro}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

export const SAPIR_FPS = FPS;
