"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, X } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/data/content";

const STORAGE_KEY = "sapir-announcement-dismissed-v1";
const ANNOUNCEMENT_TEXT = "החודש פתחתי 4 משרות חדשות במפעלים בישראל";
const ANNOUNCEMENT_CTA = "רוצה אחת? בוא נדבר";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="announcement-bar" role="region" aria-label="הודעה חשובה">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="announcement-bar-link"
      >
        <span className="announcement-bar-dot" aria-hidden />
        <span className="announcement-bar-text">{ANNOUNCEMENT_TEXT}</span>
        <span className="announcement-bar-cta">
          {ANNOUNCEMENT_CTA}
          <ArrowLeft size={14} weight="bold" />
        </span>
      </a>
      <button
        type="button"
        className="announcement-bar-close"
        onClick={handleDismiss}
        aria-label="סגור הודעה"
      >
        <X size={14} weight="bold" />
      </button>
    </div>
  );
}
