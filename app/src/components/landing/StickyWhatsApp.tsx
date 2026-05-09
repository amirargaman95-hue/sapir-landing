"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/data/content";

export default function StickyWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`sticky-wa ${show ? "is-shown" : "is-hidden"}`}
      aria-label="דבר עם ספיר בוואטסאפ"
      aria-hidden={!show}
    >
      <WhatsappLogo size={28} weight="fill" />
      <span className="label">דבר איתי</span>
    </a>
  );
}
