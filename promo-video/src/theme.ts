// Sapir Azulay — promo video theme
// Synced with the landing page Industrial Steel + lime palette.

export const COLORS = {
  // Backgrounds
  bg: "#0E1A2E",
  bgDeep: "#08111E",
  bgGrad1: "#0E1A2E",
  bgGrad2: "#14213D",
  bgGrad3: "#1A365D",

  // Accents
  accent: "#1A365D",        // blueprint navy
  accentBright: "#2C5187",
  accentDeep: "#0C2347",

  // Lime accent (Adonis-style)
  lime: "#DCEB5C",
  limeBright: "#E6F66E",
  limeDeep: "#A8B83C",
  limeGlow: "rgba(220, 235, 92, 0.55)",

  // Text
  textPrimary: "#F5F1EA",
  textSecondary: "rgba(245, 241, 234, 0.72)",
  textMuted: "rgba(245, 241, 234, 0.50)",

  // Surfaces
  card: "rgba(245, 241, 234, 0.06)",
  cardBorder: "rgba(245, 241, 234, 0.12)",
  cardBorderStrong: "rgba(220, 235, 92, 0.30)",

  // Brand white pill
  white: "#FFFFFF",
} as const;

export const FONTS = {
  display: '"Heebo", system-ui, -apple-system, sans-serif',
  body: '"Heebo", system-ui, -apple-system, sans-serif',
} as const;

// Animation easings
export const EASING = {
  out: [0.2, 0.8, 0.2, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
} as const;

export const FPS = 30;

// Per-scene durations (in frames @30fps)
export const TIMING = {
  intro: 210,        // 7s — particle reveal + audience morph + final headline
  perStep: 100,      // ~3.3s × 9 = 30s
  outro: 90,         // 3s
};

// Total: 210 + 9 * 100 + 90 = 1200 frames = 40s
export const TOTAL_FRAMES = TIMING.intro + 9 * TIMING.perStep + TIMING.outro;
