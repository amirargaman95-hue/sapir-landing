import { ShieldCheck, Factory, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { usps } from "@/data/content";

const iconMap = {
  ShieldCheck,
  Factory,
  UserCircle,
} as const;

export default function USPs() {
  return (
    <section
      id="usps"
      className="section-y border-t border-[var(--color-border)]"
      aria-labelledby="usps-heading"
    >
      <div className="container-prose">
        <div className="max-w-[760px]">
          <p className="eyebrow-amber mb-4">ההבטחה</p>
          <h2 id="usps-heading" className="h-display-md max-w-[26ch]">
            לא מועמדים. <span className="tint">עובדים שנשארים.</span>
          </h2>
          <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
            שלוש הבטחות. בכתב, אמיתיות, נמדדות.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {usps.map((u) => {
            const Icon = iconMap[u.iconName as keyof typeof iconMap];
            return (
              <li
                key={u.title}
                className="surface-card p-7 lg:p-8 flex flex-col gap-3"
              >
                <span className="cred-icon-wrap" style={{ width: 52, height: 52, borderRadius: 14 }}>
                  <Icon size={26} weight="duotone" color="var(--color-accent)" />
                </span>
                <h3 className="text-2xl font-extrabold mt-4 leading-snug text-[var(--color-text)]">
                  {u.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  {u.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
