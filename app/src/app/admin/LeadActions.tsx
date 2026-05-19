// Quick actions for a lead with a phone number: WhatsApp + call.
// Pure presentational (no client state) — safe in a Server Component.

// Normalize an IL phone to international digits for wa.me:
// strip non-digits; a leading 0 becomes 972.
function toIntl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return "972" + digits.slice(1);
  return digits;
}

const WA_TEXT = "שלום, מדברת ספיר בנוגע לפנייה שלך באתר.";

export default function LeadActions({ phone }: { phone: string | null }) {
  if (!phone) return <span className="text-neutral-600">—</span>;

  const intl = toIntl(phone);
  const waHref = `https://wa.me/${intl}?text=${encodeURIComponent(WA_TEXT)}`;
  const telHref = `tel:+${intl}`;

  return (
    <div className="flex gap-2">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שליחת וואטסאפ"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-emerald-900 bg-emerald-950 px-3 py-2 text-xs text-emerald-300 transition hover:bg-emerald-900"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="M12.04 2a9.9 9.9 0 0 0-8.49 14.96L2 22l5.18-1.36A9.9 9.9 0 1 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.34-.5.04-1.13.06-1.82-.11a14.5 14.5 0 0 1-1.65-.61c-2.9-1.25-4.79-4.17-4.94-4.37-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36l.56.01c.18.01.42-.07.66.5.24.59.83 2.03.9 2.18.07.14.12.31.02.51-.1.2-.15.31-.29.48-.14.17-.3.38-.43.5-.14.14-.29.3-.12.58.17.29.74 1.22 1.59 1.98 1.1.97 2.02 1.28 2.31 1.42.29.14.46.12.63-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.66.78 1.95.93.29.14.48.21.55.33.07.12.07.69-.17 1.36Z" />
        </svg>
        וואטסאפ
      </a>
      <a
        href={telHref}
        aria-label="חיוג"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs text-neutral-200 transition hover:bg-neutral-700"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.5-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.3 2.3Z" />
        </svg>
        חיוג
      </a>
    </div>
  );
}
