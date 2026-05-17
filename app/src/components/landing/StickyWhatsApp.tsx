"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/data/content";
import { useScrollY } from "@/lib/hooks/useScrollY";
import { track } from "@/lib/track";

export default function StickyWhatsApp() {
  const y = useScrollY();
  const show = y > 200;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`sticky-wa ${show ? "is-shown" : "is-hidden"}`}
      aria-label="דבר עם ספיר בוואטסאפ"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      onClick={() => track("cta_whatsapp_click", { location: "sticky_wa" })}
    >
      <WhatsappLogo size={28} weight="fill" />
      <span className="label">דבר איתי</span>
    </a>
  );
}
