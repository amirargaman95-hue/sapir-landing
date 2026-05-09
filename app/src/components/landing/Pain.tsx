import { Warning, Clock, UserMinus } from "@phosphor-icons/react/dist/ssr";
import { pains } from "@/data/content";

const icons = [Warning, Clock, UserMinus];

export default function Pain() {
  return (
    <section
      id="pain"
      className="section-y border-t border-[var(--color-border)]"
      aria-labelledby="pain-heading"
    >
      <div className="container-prose">
        <div className="max-w-[640px]">
          <p className="eyebrow-amber mb-4">הכאב</p>
          <h2 id="pain-heading" className="h-display-md max-w-[20ch]">
            הכרת את התסריט הזה?
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((p, i) => {
            const Icon = icons[i] ?? Warning;
            return (
              <li
                key={p.number}
                className="surface-card p-7 flex flex-col gap-3"
              >
                <div className="flex items-baseline justify-between">
                  <span className="editorial-number" dir="ltr">
                    {p.number}
                  </span>
                  <Icon size={28} weight="duotone" color="var(--color-accent)" />
                </div>
                <h3 className="text-xl font-extrabold mt-4 leading-snug text-[var(--color-text)]">
                  {p.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{p.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
