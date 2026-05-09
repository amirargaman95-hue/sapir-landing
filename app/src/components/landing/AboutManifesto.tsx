"use client";

import Image from "next/image";
import { useState } from "react";
import { Quotes, WhatsappLogo } from "@phosphor-icons/react";
import { aboutManifesto, WHATSAPP_URL } from "@/data/content";

export default function AboutManifesto() {
  const [imgSrc, setImgSrc] = useState(aboutManifesto.imageSrc);

  return (
    <section
      id="about"
      className="section-y border-t border-[var(--color-border)]"
      aria-labelledby="about-manifesto-heading"
    >
      <div className="container-prose">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo with subtle glow */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <div className="about-photo-frame">
              <Image
                src={imgSrc}
                alt={aboutManifesto.imageAlt}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
                onError={() => {
                  if (imgSrc !== aboutManifesto.imageFallback) {
                    setImgSrc(aboutManifesto.imageFallback);
                  }
                }}
              />
              <span className="about-photo-quote" aria-hidden>
                <Quotes size={28} weight="fill" color="var(--color-accent)" />
              </span>
            </div>
          </div>

          {/* Manifesto */}
          <div className="lg:col-span-7 order-2 lg:order-2">
            <p className="eyebrow-amber mb-4">{aboutManifesto.eyebrow}</p>
            <h2 id="about-manifesto-heading" className="h-display-md max-w-[24ch]">
              {aboutManifesto.heading}
            </h2>

            <div className="mt-6 space-y-4 text-[var(--color-muted)] leading-relaxed text-lg max-w-[60ch]">
              {aboutManifesto.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <blockquote className="about-highlight">
              {aboutManifesto.highlight}
            </blockquote>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7"
              style={{ padding: "1rem 1.75rem" }}
            >
              <WhatsappLogo size={20} weight="fill" />
              <span>נשמע טוב? בואו נדבר</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
