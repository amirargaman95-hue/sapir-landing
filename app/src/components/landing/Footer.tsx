import {
  WhatsappLogo,
  EnvelopeSimple,
  Phone,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import {
  WHATSAPP_URL,
  PHONE,
  EMAIL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "@/data/content";

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border)]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        כותרת תחתונה
      </h2>

      <div className="container-prose py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand + socials */}
          <div>
            <p className="text-xl font-extrabold text-[var(--color-text)]">
              ספיר אזולאי
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed max-w-[34ch]">
              מגייסת אישית למפעלים ועסקים בישראל.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram של ספיר אזולאי"
                className="social-icon"
              >
                <InstagramLogo size={22} weight="fill" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook של ספיר אזולאי"
                className="social-icon"
              >
                <FacebookLogo size={22} weight="fill" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-icon"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <WhatsappLogo size={22} weight="fill" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow-amber mb-3">צרו קשר</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  <span>וואטסאפ</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Phone size={16} weight="fill" />
                  <span dir="ltr">{PHONE}</span>
                </a>
                <p className="text-xs text-[var(--color-muted)] mt-1 mr-6">
                  א׳–ה׳ 08:00–18:00 · מענה אישי בשעות פעילות
                </p>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <EnvelopeSimple size={16} weight="fill" />
                  <span>{EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="eyebrow-amber mb-3">מידע</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/accessibility"
                  className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  הצהרת נגישות
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  תנאי שימוש
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  עליי
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between gap-2 text-xs text-[var(--color-muted)]">
          <p>© 2026 ספיר אזולאי. כל הזכויות שמורות.</p>
          <p>
            בנייה ועיצוב:{" "}
            <span className="text-[var(--color-text)]">אמיר ארגמן</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
