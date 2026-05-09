import {
  CheckCircle,
  ShieldCheck,
  UserCheck,
} from "@phosphor-icons/react/dist/ssr";
import { businessModel } from "@/data/content";

const iconMap = {
  CheckCircle,
  ShieldCheck,
  UserCheck,
} as const;

export default function BusinessModel() {
  return (
    <section
      id="business-model"
      className="risk-banner"
      aria-labelledby="model-heading"
    >
      <div className="container-prose">
        <p className="eyebrow-amber" style={{ display: "inline-block" }}>
          {businessModel.eyebrow}
        </p>
        <h2 id="model-heading" className="mt-3">
          {businessModel.title}
        </h2>
        <p className="sub">{businessModel.sub}</p>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {businessModel.highlights.map((h) => {
            const Icon = iconMap[h.iconName as keyof typeof iconMap];
            return (
              <li
                key={h.label}
                className="chip-pro inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold"
                style={{
                  background: "rgba(26, 54, 93, 0.06)",
                  border: "1px solid rgba(26, 54, 93, 0.22)",
                  color: "var(--color-accent-deep)",
                }}
              >
                <Icon size={18} weight="duotone" color="var(--color-accent)" />
                {h.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
