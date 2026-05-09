import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { WHATSAPP_URL } from "@/data/content";

export default function RiskReversalBanner() {
  return (
    <section
      id="risk"
      className="risk-banner"
      aria-labelledby="risk-heading"
    >
      <div className="container-prose">
        <div className="icon-wrap">
          <ShieldCheck size={32} weight="duotone" color="var(--color-accent)" />
        </div>
        <h2 id="risk-heading">
          אם העובד הולך — <span className="gold-gradient">אני מחליפה.</span>
        </h2>
        <p className="sub">
          תקופת התחייבות בכתב, חתומה. אף סוכנות בארץ לא נותנת את זה.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ask-link"
        >
          שאל אותי איך
          <span aria-hidden>←</span>
        </a>
      </div>
    </section>
  );
}
