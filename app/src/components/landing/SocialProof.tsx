"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, FilmReel, ChatTeardropDots } from "@phosphor-icons/react";
import Lightbox from "@/components/ui/Lightbox";
import PhoneFrame from "@/components/landing/PhoneFrame";
import WhatsAppSwiper from "@/components/landing/WhatsAppSwiper";
import { videos, proofs } from "@/data/content";

export default function SocialProof() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const showVideos = videos.length > 0;
  const showProofs = proofs.length > 0;

  // Layout for videos based on count
  const videoGridClass =
    videos.length >= 6
      ? "grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
      : videos.length >= 3
        ? "grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10"
        : "flex flex-wrap gap-8 max-w-3xl mx-auto justify-center";

  return (
    <section
      id="social-proof"
      className="section-y border-t border-[var(--color-border)]"
      aria-labelledby="proof-heading"
    >
      <div className="container-prose">
        {showVideos && (
          <div className="max-w-[760px] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FilmReel size={22} weight="duotone" color="var(--color-accent)" />
              <p className="eyebrow-amber">ראיות</p>
            </div>
            <h2 id="proof-heading" className="h-display-md max-w-[24ch]">
              המפעלים שגייסתי. <span className="gold-gradient">במילים שלהם.</span>
            </h2>
            <p className="mt-1 text-[var(--color-muted)] leading-relaxed">
              סרטונים אמיתיים וצילומי וואטסאפ. בלי תסריט, בלי שחקנים.
            </p>
          </div>
        )}

        {/* Videos — phone mockups */}
        {showVideos && (
          <ul className={`mt-14 ${videoGridClass}`}>
            {videos.map((v, i) => (
              <li key={v.src} className="group flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setActiveVideo(i)}
                  className="block w-full text-right"
                  aria-label={`נגן וידאו: ${v.caption}`}
                >
                  <PhoneFrame>
                    <Image
                      src={v.poster}
                      alt={v.caption}
                      fill
                      sizes="(max-width: 1024px) 60vw, 280px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="play-badge">
                      <span className="play-disc">
                        <Play size={28} weight="fill" color="#0E0E10" />
                      </span>
                    </div>
                  </PhoneFrame>
                  <div className="phone-caption">
                    <p className="who">{v.who}</p>
                    <p className="what">{v.caption}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* WhatsApp cinematic stage */}
      {showProofs && (
        <div className="container-prose mt-20">
          <div className="max-w-[760px] flex flex-col gap-3 mx-auto text-center items-center">
            <div className="flex items-center gap-2">
              <ChatTeardropDots size={22} weight="duotone" color="var(--color-accent)" />
              <p className="eyebrow-amber">עדויות אמיתיות</p>
            </div>
            <h3 className="h-display-md max-w-[26ch]">
              ההודעות שקיבלתי אחרי ההשמה. <span className="gold-gradient">מהלקוחות עצמם.</span>
            </h3>
            <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
              {proofs.length} הודעות וואטסאפ מבעלי מפעלים ועסקים שונים. אמיתיות. בלי תסריט. פרטים אישיים מטושטשים.
            </p>
          </div>
        </div>
      )}
      {showProofs && <WhatsAppSwiper />}

      <Lightbox
        open={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        label="נגן וידאו"
      >
        {activeVideo !== null && (
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
    </section>
  );
}
