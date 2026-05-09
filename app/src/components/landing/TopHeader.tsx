"use client";

import { useEffect, useState } from "react";
import {
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import { WHATSAPP_URL, INSTAGRAM_URL, FACEBOOK_URL } from "@/data/content";

export default function TopHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,15,0.88)] backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-prose flex items-center justify-between py-3 lg:py-4">
        {/* Wordmark */}
        <a
          href="#hero"
          className="brand-mark group"
          aria-label="ספיר אזולאי — דף הבית"
        >
          {/* Real logo — bigger, sharper, glowing pill */}
          <span className="brand-monogram" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sapir/logo.webp"
              alt=""
              width={144}
              height={144}
              className="brand-logo-img"
              draggable={false}
            />
          </span>
          {/* Wordmark text */}
          <span className="brand-text">
            <span className="brand-name">ספיר אזולאי</span>
            <span className="brand-tagline">בוטיק גיוס · מפעלים ועסקים</span>
          </span>
        </a>

        {/* Center nav — section anchors */}
        <nav className="header-nav hidden md:flex" aria-label="ניווט בעמוד">
          <a href="#reasons">למה אני</a>
          <a href="#full-service">תהליך העבודה</a>
          <a href="#social-proof">המלצות</a>
          <a href="#contact">צרו קשר</a>
        </nav>

        {/* Right side: socials + CTA */}
        <div className="flex items-center gap-2 lg:gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="social-icon hidden sm:inline-flex"
            style={{ width: 38, height: 38, borderRadius: 10 }}
          >
            <InstagramLogo size={18} weight="fill" />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="social-icon hidden sm:inline-flex"
            style={{ width: 38, height: 38, borderRadius: 10 }}
          >
            <FacebookLogo size={18} weight="fill" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-header"
            aria-label="דבר איתי בוואטסאפ"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span className="hidden sm:inline">וואטסאפ</span>
          </a>
        </div>
      </div>
    </header>
  );
}
