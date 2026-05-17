"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, FilmReel, ChatTeardropDots } from "@phosphor-icons/react";
import Lightbox from "@/components/ui/Lightbox";
import PhoneFrame from "@/components/landing/PhoneFrame";
import { videos as allVideos, proofs } from "@/data/content";

const videos = allVideos.filter(
  (v) => v.src && v.src !== "TBD" && v.poster && v.poster !== "TBD"
);

// Bento grid: 1 big video + 3 WhatsApp screenshots around it.
// Falls back gracefully when there are zero real videos.
export default function SocialProof() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [activeProof, setActiveProof] = useState<number | null>(null);

  const featured = videos[0];
  const showProofs = proofs.length > 0;
  const bentoProofs = proofs.slice(0, 3); // exactly 3 screenshots around the video

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
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
      id="social-proof"
      className="section-y section-cream"
      aria-labelledby="proof-heading"
    >
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
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
            סרטון אמיתי + הודעות וואטסאפ ישירות מבעלי מפעלים. בלי תסריט, בלי שחקנים.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="proof-bento">
          {/* Featured video — large left tile */}
          {featured ? (
            <motion.button
              type="button"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={() => setActiveVideo(0)}
              className="proof-bento-video"
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
          ) : (
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="proof-bento-video proof-bento-video-empty"
            >
              <div className="proof-bento-video-empty-inner">
                <FilmReel size={48} weight="duotone" color="var(--color-accent)" />
                <p className="eyebrow-amber">סרטונים בקרוב</p>
                <p>מקליטים עדויות אמיתיות מהמפעלים. בינתיים — תקרא את ההודעות.</p>
              </div>
            </motion.div>
          )}

          {/* 3 WhatsApp screenshots — right column */}
          {bentoProofs.map((p, i) => (
            <motion.button
              type="button"
              key={p.src}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={() => setActiveProof(i)}
              className={`proof-bento-card proof-bento-card-${i + 1}`}
              aria-label={p.alt}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 300px"
                className="object-cover"
              />
              <div className="proof-bento-card-mask" aria-hidden />
              <span className="proof-bento-card-tag">
                <ChatTeardropDots size={14} weight="duotone" />
                הודעת וואטסאפ
              </span>
            </motion.button>
          ))}
        </div>

        {showProofs && proofs.length > 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="proof-bento-footnote"
          >
            עוד {proofs.length - 3} הודעות מבעלי מפעלים. אמיתיות. פרטים אישיים מטושטשים.
          </motion.p>
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
          <Image
            src={proofs[activeProof].src}
            alt={proofs[activeProof].alt}
            width={520}
            height={1040}
            className="max-h-[88vh] w-auto rounded-[14px]"
          />
        )}
      </Lightbox>
    </section>
  );
}
