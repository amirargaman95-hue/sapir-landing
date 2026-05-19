"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  FilmReel,
  ShieldCheck,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import Lightbox from "@/components/ui/Lightbox";
import PhoneFrame from "@/components/landing/PhoneFrame";
import { videos as allVideos, proofs } from "@/data/content";

const videos = allVideos.filter(
  (v) => v.src && v.src !== "TBD" && v.poster && v.poster !== "TBD"
);

// One coherent proof section: optional featured video + the FULL WhatsApp wall.
// proofs[0..3] are one employer's recurring thread → spotlighted as a connected
// mini case-study. The rest render as a refined editorial wall.
// Falls back gracefully when there are zero real videos and/or zero proofs.
export default function SocialProof() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [activeProof, setActiveProof] = useState<number | null>(null);

  const featured = videos[0];
  const showProofs = proofs.length > 0;

  const proofNext = useCallback(
    () => setActiveProof((i) => (i === null ? i : (i + 1) % proofs.length)),
    []
  );
  const proofPrev = useCallback(
    () =>
      setActiveProof((i) =>
        i === null ? i : (i - 1 + proofs.length) % proofs.length
      ),
    []
  );

  useEffect(() => {
    if (activeProof === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") proofPrev(); // RTL: right = previous
      if (e.key === "ArrowLeft") proofNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeProof, proofNext, proofPrev]);

  // Hide entire section when there's nothing real to show.
  if (!featured && !showProofs) return null;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: Math.min(i, 8) * 0.06,
        ease: [0.16, 0.84, 0.28, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="social-proof"
      className="section-y section-cream proof-lux"
      aria-labelledby="proof-heading"
    >
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 0.84, 0.28, 1] }}
          className="max-w-[760px] flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <FilmReel size={22} weight="duotone" color="var(--color-accent)" />
            <p className="eyebrow-amber">ראיות</p>
          </div>
          <h2 id="proof-heading" className="h-display-md max-w-[24ch]">
            המפעלים שגייסתי. <span className="cypress-text">במילים שלהם.</span>
          </h2>
          <p className="mt-1 text-[var(--color-muted)] leading-relaxed">
            הודעות וואטסאפ ישירות מבעלי מפעלים — תאריכים, תוצאות, בלי תסריט ובלי
            שחקנים. פרטים אישיים מטושטשים.
          </p>
        </motion.div>

        {/* Optional featured video — only when a real video exists */}
        {featured && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 0.84, 0.28, 1] }}
            whileHover={{ y: -4 }}
            onClick={() => setActiveVideo(0)}
            className="proof-bento-video mt-12 mx-auto max-w-[420px]"
            aria-label={`נגן וידאו: ${featured.caption}`}
          >
            <PhoneFrame>
              <Image
                src={featured.poster}
                alt={featured.caption}
                fill
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="play-badge">
                <span className="play-disc">
                  <Play size={32} weight="fill" color="#FFFFFF" />
                </span>
              </div>
            </PhoneFrame>
            <div className="proof-bento-video-caption">
              <p className="who">{featured.who}</p>
              <p className="what">{featured.caption}</p>
            </div>
          </motion.button>
        )}

        {/* One unified premium proof grid */}
        {showProofs && (
          <ul className="proof-grid mt-14">
            {proofs.map((p, i) => (
              <motion.li
                key={p.src}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="proof-grid-card"
              >
                <button
                  type="button"
                  onClick={() => setActiveProof(i)}
                  aria-label={`הגדל ${p.alt}`}
                  className="proof-shot group"
                >
                  <span className="proof-shot-meta">
                    <ShieldCheck size={14} weight="duotone" />
                    בעל מפעל מאומת
                  </span>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="proof-shot-mask" aria-hidden />
                  <span className="proof-shot-zoom" aria-hidden>
                    הגדלה
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <Lightbox
        open={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        label="נגן וידאו"
      >
        {activeVideo !== null && videos[activeVideo] && (
          <video
            key={videos[activeVideo].src}
            src={videos[activeVideo].src}
            poster={videos[activeVideo].poster}
            controls
            autoPlay
            playsInline
            className="max-h-[88vh] max-w-full rounded-[14px]"
          />
        )}
      </Lightbox>

      <Lightbox
        open={activeProof !== null}
        onClose={() => setActiveProof(null)}
        label="הודעת וואטסאפ"
      >
        {activeProof !== null && proofs[activeProof] && (
          <div className="proof-viewer" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={proofPrev}
              aria-label="הקודם"
              className="proof-viewer-nav proof-viewer-prev"
            >
              <CaretRight size={26} weight="bold" />
            </button>
            <Image
              key={proofs[activeProof].src}
              src={proofs[activeProof].src}
              alt={proofs[activeProof].alt}
              width={520}
              height={1040}
              className="proof-viewer-img"
            />
            <button
              type="button"
              onClick={proofNext}
              aria-label="הבא"
              className="proof-viewer-nav proof-viewer-next"
            >
              <CaretLeft size={26} weight="bold" />
            </button>
            <span className="proof-viewer-count" aria-hidden>
              {activeProof + 1} / {proofs.length}
            </span>
          </div>
        )}
      </Lightbox>
    </section>
  );
}
