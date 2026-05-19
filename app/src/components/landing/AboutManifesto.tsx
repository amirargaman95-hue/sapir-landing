"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Quotes, WhatsappLogo } from "@phosphor-icons/react";
import { aboutManifesto, excellenceBadge, WHATSAPP_URL } from "@/data/content";

// Alternating-section pattern: dark half (portrait) | cream half (manifesto).
// The two halves meet at the vertical center — visual contrast at the seam.
export default function AboutManifesto() {
  const [imgSrc, setImgSrc] = useState(aboutManifesto.imageSrc);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.08,
        ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="about"
      className="about-split"
      aria-labelledby="about-manifesto-heading"
    >
      {/* Left: dark half with portrait */}
      <motion.div
        className="about-split-dark"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="about-split-stack">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
            className="about-split-photo"
          >
            <Image
              src={imgSrc}
              alt={aboutManifesto.imageAlt}
              fill
              sizes="(max-width: 1024px) 80vw, 42vw"
              className="object-cover"
              onError={() => {
                if (imgSrc !== aboutManifesto.imageFallback) {
                  setImgSrc(aboutManifesto.imageFallback);
                }
              }}
            />
            <span className="about-split-quote-icon" aria-hidden>
              <Quotes size={32} weight="fill" />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="about-split-aside"
          >
            {aboutManifesto.secondary.map((s) => (
              <span key={s.src} className="about-aside-photo">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 1024px) 40vw, 18vw"
                  className="object-cover"
                />
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right: cream half with manifesto */}
      <div className="about-split-cream">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="about-split-content"
        >
          <motion.p custom={0} variants={fadeUp} className="eyebrow-amber">
            {aboutManifesto.eyebrow}
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            id="about-manifesto-heading"
            className="h-display-md max-w-[24ch]"
          >
            {aboutManifesto.heading}
          </motion.h2>

          <motion.div
            custom={2}
            variants={fadeUp}
            className="mt-6 space-y-4 text-[var(--color-muted)] leading-relaxed text-lg max-w-[60ch]"
          >
            {aboutManifesto.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <motion.blockquote
            custom={3}
            variants={fadeUp}
            className="about-highlight-v3"
          >
            {aboutManifesto.highlight}
          </motion.blockquote>

          {/* Excellence badge — MAOF "פרילנסרית מצטיינת". Quiet credit, separate from CTA. */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-7 flex items-center gap-4 surface-card p-4 max-w-[440px]"
          >
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] border border-[var(--color-border)]">
              <Image
                src={excellenceBadge.src}
                alt={excellenceBadge.alt}
                fill
                sizes="64px"
                className="object-cover object-top"
              />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--color-text)]">
                נבחרתי {excellenceBadge.title}
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">
                הוקרה מטעם {excellenceBadge.org} על עבודה מסורה ותוצאות בזמן שיא
              </p>
            </div>
          </motion.div>

          <motion.a
            custom={5}
            variants={fadeUp}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-7"
            style={{ padding: "1rem 1.75rem" }}
          >
            <WhatsappLogo size={20} weight="fill" />
            <span>בוא נדבר 5 דקות</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
