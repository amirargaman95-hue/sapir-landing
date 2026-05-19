import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { WHATSAPP_URL, finalCta } from "@/data/content";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="section-y border-t border-[var(--color-border)] relative overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Radial gold glow as focal point */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(37, 99, 235,0.18) 0%, rgba(37, 99, 235,0.06) 30%, transparent 70%)",
        }}
      />

      <div className="container-prose relative">
        <div className="text-center max-w-[760px] mx-auto">
          <p className="eyebrow-amber mb-4">צרו קשר</p>
          <h2
            id="final-cta-heading"
            className="font-black"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
            }}
          >
            מעוניין? <span className="gold-gradient">בוא נדבר 5 דקות.</span>
          </h2>
          <p className="mt-5 text-[var(--color-muted)] leading-relaxed text-lg">
            {finalCta.sub}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: "1.25rem 3rem",
                fontSize: "1.25rem",
                fontWeight: 800,
                boxShadow: "0 0 90px rgba(37, 99, 235,0.55)",
              }}
              aria-label="פתח שיחה בוואטסאפ עם ספיר"
            >
              <WhatsappLogo size={26} weight="fill" />
              <span>דבר איתי בוואטסאפ</span>
            </a>
            <p className="text-sm text-[var(--color-muted)] mt-2">
              ספיר עונה אישית — לא בוט, לא מזכירה.
            </p>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              א׳–ה׳ 08:00–18:00 · מענה אישי בשעות פעילות
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
