import { Briefcase, ChartLineUp, Clock } from "@phosphor-icons/react/dist/ssr";
import { valueProp } from "@/data/content";

const iconMap = { Briefcase, ChartLineUp, Clock } as const;

export default function ValueProp() {
  return (
    <section
      id="value-prop"
      className="section-y border-t border-[var(--color-border)]"
      aria-labelledby="value-heading"
    >
      <div className="container-prose">
        <div className="max-w-[760px]">
          <p className="eyebrow-amber mb-4">{valueProp.eyebrow}</p>
          <h2 id="value-heading" className="h-display-md max-w-[26ch]">
            {valueProp.title}
          </h2>
          <div className="mt-6 space-y-4 text-[var(--color-muted)] leading-relaxed text-lg max-w-[64ch]">
            {valueProp.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProp.pillars.map((p) => {
            const Icon = iconMap[p.iconName as keyof typeof iconMap];
            return (
              <li
                key={p.title}
                className="surface-card flex flex-col gap-3"
                style={{ padding: "clamp(1.75rem, 3vw, 2.25rem)" }}
              >
                <span
                  className="cred-icon-wrap"
                  style={{ width: 50, height: 50, borderRadius: 14 }}
                >
                  <Icon size={26} weight="duotone" color="var(--color-accent)" />
                </span>
                <h3 className="font-extrabold mt-3 leading-snug text-[var(--color-text)] text-xl">
                  {p.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  {p.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
