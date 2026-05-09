import { WhatsappLogo, PhoneCall, UserList, HandCoins } from "@phosphor-icons/react/dist/ssr";

const procedure = [
  { step: "01", label: "שלח לי הודעה בוואטסאפ", time: "30 שניות", icon: WhatsappLogo },
  { step: "02", label: "אני חוזרת אליך, שיחה קצרה", time: "באותו יום", icon: PhoneCall },
  { step: "03", label: "אני מציגה לך 1-2 מועמדים", time: "3-10 ימי עבודה", icon: UserList },
  { step: "04", label: "אתה פוגש, מחליט, מתחייבים בכתב", time: "אחרי הראיון אצלך", icon: HandCoins },
];

export default function HowItWorks() {
  return (
    <section
      id="process"
      className="section-y border-t border-[var(--color-border)]"
      aria-labelledby="process-heading"
    >
      <div className="container-prose">
        <div className="max-w-[720px]">
          <p className="eyebrow-amber mb-4">התהליך</p>
          <h2 id="process-heading" className="h-display-md max-w-[20ch]">
            ככה זה עובד. <span className="tint">בלי הפתעות.</span>
          </h2>
        </div>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {procedure.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.step} className="surface-card p-6 flex flex-col gap-3 relative">
                <div className="flex items-center justify-between">
                  <span
                    className="font-black text-[var(--color-accent)] tnum"
                    style={{ fontSize: "2.25rem", lineHeight: 1, letterSpacing: "-0.03em" }}
                    dir="ltr"
                  >
                    {p.step}
                  </span>
                  <span className="cred-icon-wrap" style={{ width: 38, height: 38 }}>
                    <Icon size={20} weight="duotone" color="var(--color-accent)" />
                  </span>
                </div>
                <p className="font-bold text-base leading-snug text-[var(--color-text)] mt-2">
                  {p.label}
                </p>
                <p className="text-sm text-[var(--color-muted)]">⏱ {p.time}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
