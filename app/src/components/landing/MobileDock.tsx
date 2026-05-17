"use client";

import { WhatsappLogo, Phone } from "@phosphor-icons/react";
import { WHATSAPP_URL, PHONE } from "@/data/content";
import { useScrollY } from "@/lib/hooks/useScrollY";
import { track } from "@/lib/track";

export default function MobileDock() {
  const y = useScrollY();
  const show = y > 200;

  return (
    <nav
      className={`mobile-dock ${show ? "is-shown" : "is-hidden"}`}
      aria-label="פעולות מהירות"
      aria-hidden={!show}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="dock-btn dock-wa"
        onClick={() => track("cta_whatsapp_click", { location: "mobile_dock" })}
        aria-label="דבר עם ספיר בוואטסאפ"
        tabIndex={show ? 0 : -1}
      >
        <WhatsappLogo size={22} weight="fill" />
        <span>וואטסאפ</span>
      </a>
      <a
        href={`tel:${PHONE}`}
        className="dock-btn dock-call"
        onClick={() => track("cta_call_click", { location: "mobile_dock" })}
        aria-label="התקשרי לספיר"
        tabIndex={show ? 0 : -1}
      >
        <Phone size={22} weight="fill" />
        <span>שיחה</span>
      </a>
    </nav>
  );
}
