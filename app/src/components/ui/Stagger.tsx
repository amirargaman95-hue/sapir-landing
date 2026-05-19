"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/**
 * Quiet, boutique-grade scroll-in stagger for grid/list items.
 * - framer-motion (house lib, React 19), whileInView + once.
 * - transform/opacity only (GPU), gentle 18px rise, 0.66s, soft ease.
 * - prefers-reduced-motion → renders instantly, no transform/opacity anim.
 * Sits on its own wrapper element, so it never double-drives an element
 * already animated by FadeUp's .reveal wrapper.
 */

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** seconds between each child entrance */
  step?: number;
  /** initial delay before the first child (seconds) */
  delayStart?: number;
  /** viewport rootMargin */
  margin?: string;
  /** render as this element (default ul) */
  as?: "ul" | "div";
  /** ARIA role passthrough (e.g. "list") */
  role?: string;
};

export function Stagger({
  children,
  className = "",
  step = 0.08,
  delayStart = 0,
  margin = "-60px",
  as = "ul",
  role,
}: StaggerProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: reduce
        ? {}
        : { staggerChildren: step, delayChildren: delayStart },
    },
  };

  const MotionTag = as === "ul" ? motion.ul : motion.div;

  return (
    <MotionTag
      className={className}
      role={role}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
  /** small extra rise distance override (px) */
  rise?: number;
};

export function StaggerItem({
  children,
  className = "",
  as = "li",
  rise = 18,
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: rise },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.66, ease: EASE },
        },
      };

  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
}
