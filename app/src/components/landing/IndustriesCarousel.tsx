"use client";

import { industries } from "@/data/content";

export default function IndustriesCarousel() {
  // Duplicate the list once so the marquee can loop seamlessly (translateX -50%)
  const loop = [...industries, ...industries];

  return (
    <section
      id="industries"
      className="section-y relative overflow-hidden"
      aria-labelledby="industries-heading"
    >
      <div className="container-prose">
        <div className="flex flex-col items-start gap-3 mb-10">
          <p className="eyebrow-amber">12 השמות שעבדו · ב-3 השנים האחרונות</p>
          <h2 id="industries-heading" className="h-display-md max-w-[26ch]">
            באותם המפעלים. <span className="tint">אותם העובדים.</span>
          </h2>
        </div>
      </div>

      {/* Full-bleed marquee with edge fade mask */}
      <div className="industries-viewport">
        <div className="industries-track" role="list">
          {loop.map((it, i) => (
            <article
              key={`${it.title}-${i}`}
              className="industry-card"
              role="listitem"
            >
              <span className="ic-eyebrow">{it.niche}</span>
              <h3 className="ic-title">{it.title}</h3>
              <p className="ic-meta">{it.meta}</p>
              <p className="ic-quote">«{it.quote}»</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
