"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, X } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/data/content";
import { track } from "@/lib/track";

const STORAGE_KEY = "sapir-announcement-dismissed-v1";
const ANNOUNCEMENT_TEXT = "החודש פתחתי 4 משרות חדשות במפעלים בישראל";
const ANNOUNCEMENT_CTA = "רוצה אחת? בוא נדבר";

export default function AnnouncementBar() {
  // SSR-stable: render visually-empty 36px stub to avoid CLS. After hydration,
  // hide entirely if user previously dismissed.
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) setDismissed(true);
    } catch {}
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    track("announcement_bar_dismiss");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="announcement-bar" role="region" aria-label="הודעה חשובה">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="announcement-bar-link"
        onClick={() => track("announcement_bar_click")}
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
