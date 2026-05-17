"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/data/content";
import { useScrollY } from "@/lib/hooks/useScrollY";
import { track } from "@/lib/track";

export default function StickyMobileCTA() {
  const y = useScrollY();
  const show = y > 600;

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
          onClick={() =>
            track("cta_whatsapp_click", { location: "sticky_mobile" })
          }
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
