"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, FilmReel } from "@phosphor-icons/react";
import Lightbox from "@/components/ui/Lightbox";
import { videos } from "@/data/content";

export default function VideoWall() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="videos"
      className="section-y border-t border-[var(--color-border)]"
      aria-labelledby="videos-heading"
    >
      <div className="container-prose">
        <div className="max-w-[760px] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <FilmReel size={22} weight="duotone" color="var(--color-accent)" />
            <p className="eyebrow-amber">עדויות וידאו</p>
          </div>
          <h2 id="videos-heading" className="h-display-md max-w-[24ch]">
            המעסיקים. <span className="tint">במילים שלהם.</span>
          </h2>
          <p className="mt-1 text-[var(--color-muted)] leading-relaxed">
            6 סרטונים אמיתיים. בלי תסריט, בלי שחקנים, בלי צבע על חיוכים.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {videos.map((v, i) => (
            <li key={v.src} className="group">
              <button
                type="button"
                onClick={() => setActiveIdx(i)}
                className="block w-full text-right"
                aria-label={`נגן וידאו: ${v.caption}`}
              >
                <div className="video-frame aspect-[9/16]">
                  <Image
                    src={v.poster}
                    alt={v.caption}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="play-badge">
                    <span className="play-disc">
                      <Play size={26} weight="fill" color="#FFFFFF" />
                    </span>
                  </div>
                  <span className="duration-badge">0:42</span>
                </div>
                <div className="mt-4">
                  <p className="text-base font-bold text-[var(--color-text)] leading-snug">
                    {v.caption}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mt-1">{v.who}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        open={activeIdx !== null}
        onClose={() => setActiveIdx(null)}
        label="נגן וידאו"
      >
        {activeIdx !== null && (
          <video
            key={videos[activeIdx].src}
            src={videos[activeIdx].src}
            poster={videos[activeIdx].poster}
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
