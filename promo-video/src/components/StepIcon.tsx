import React from "react";
import { COLORS } from "../theme";
import type { Step } from "../data";

type Props = {
  kind: Step["iconKind"];
  size?: number;
  color?: string;
};

/** Inline SVG icons (Phosphor-inspired) so Remotion bundler can render them deterministically. */
export const StepIcon: React.FC<Props> = ({
  kind,
  size = 56,
  color = COLORS.lime,
}) => {
  const stroke = color;
  const sw = 1.6;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9.5L13 13.5L9 15L10.5 11L14.5 9.5z" fill={stroke} fillOpacity="0.18" />
          <circle cx="12" cy="12" r="0.9" fill={stroke} />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
          <path d="M15 8a4 4 0 0 1 0 8" />
          <path d="M18 5a8 8 0 0 1 0 14" />
        </svg>
      );
    case "magnifier":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4 4" />
          <path d="M11 7.5a3.5 3.5 0 0 0-3.5 3.5" opacity="0.5" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3.2" />
          <circle cx="17" cy="10" r="2.4" />
          <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
          <path d="M14.5 19c0-2 1.7-3.5 4-3.5s2.5 1.5 2.5 3.5" />
        </svg>
      );
    case "filetext":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6" />
          <path d="M9 17h4" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M21 16.5v3a2 2 0 0 1-2.18 2 19 19 0 0 1-8.27-2.94 18.7 18.7 0 0 1-5.78-5.79A19 19 0 0 1 1.83 4.5 2 2 0 0 1 3.82 2.3h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.6 10.4a16 16 0 0 0 6 6l1.45-1.46a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7 2 2 0 0 1 1.72 2z" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill={stroke} />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
  }
};
