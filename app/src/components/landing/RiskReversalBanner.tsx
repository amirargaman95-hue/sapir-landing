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
          30 יום אחריות בכתב — מעוגן בחוזה. כולל מקרה של פיטור משמעתי בתוך התקופה. אם העובד עוזב, אני מחליפה אותו על חשבוני.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ask-link"
        >
          שאל/י אותי איך
          <span aria-hidden>←</span>
        </a>
      </div>
    </section>
  );
}
