"use client";

import { useEffect } from "react";
import { X } from "@phosphor-icons/react";

type LightboxProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label?: string;
};

export default function Lightbox({ open, onClose, children, label }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label ?? "תצוגה מוגדלת"}
      className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="סגירה"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 text-[var(--color-cream)] hover:opacity-80 transition-opacity"
      >
        <X size={32} weight="light" />
      </button>
      <div
        className="relative max-w-[1200px] w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
