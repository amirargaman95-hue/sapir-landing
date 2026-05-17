"use client";

import { useEffect, useState } from "react";
import {
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import { WHATSAPP_URL, INSTAGRAM_URL, FACEBOOK_URL } from "@/data/content";
import { useScrollY } from "@/lib/hooks/useScrollY";
import { track } from "@/lib/track";

const ANNOUNCEMENT_STORAGE_KEY = "sapir-announcement-dismissed-v1";

export default function TopHeader() {
  const y = useScrollY();
  const scrolled = y > 24;

  // Push header down by AnnouncementBar height (36px) unless the bar was
  // previously dismissed. Fixes z-fight where AnnouncementBar overlapped header.
  const [barVisible, setBarVisible] = useState(true);
  useEffect(() => {
    try {
      if (localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY)) setBarVisible(false);
    } catch {}
  }, []);

  const topOffset = barVisible ? 36 : 0;

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(15,23,41,0.92)] backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ top: topOffset }}
    >
      <div className="container-prose flex items-center justify-between py-3 lg:py-4">
        {/* Wordmark */}
        <a
          href="#hero"
          className="brand-mark group"
          aria-label="ספיר אזולאי — דף הבית"
        >
          {/* Wordmark — text-first brand */}
          <span className="brand-mark-accent" aria-hidden />
          <span className="brand-text">
            <span className="brand-name">ספיר אזולאי</span>
            <span className="brand-tagline">מגייסת למפעלים בישראל</span>
          </span>
        </a>

        {/* Center nav — section anchors */}
        <nav className="header-nav hidden sm:flex" aria-label="ניווט בעמוד">
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
            onClick={() => track("cta_whatsapp_click", { location: "header" })}
          >
            <WhatsappLogo size={18} weight="fill" />
            <span className="hidden sm:inline">וואטסאפ</span>
          </a>
        </div>
      </div>
    </header>
  );
}
