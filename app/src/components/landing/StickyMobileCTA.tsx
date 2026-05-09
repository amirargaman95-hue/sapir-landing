"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/data/content";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 lg:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="p-3 bg-[var(--color-cream)]/95 backdrop-blur border-t border-[var(--color-border)]">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full"
        >
          <WhatsappLogo size={20} weight="fill" />
          <span>דבר איתי בוואטסאפ</span>
          <span className="arrow" aria-hidden>
            ←
          </span>
        </a>
      </div>
    </div>
  );
}
