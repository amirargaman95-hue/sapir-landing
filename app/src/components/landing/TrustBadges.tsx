import { Star } from "@phosphor-icons/react/dist/ssr";
import { trustClients } from "@/data/content";

export default function TrustBadges() {
  return (
    <section
      id="trust"
      className="border-t border-[var(--color-border)]"
      aria-labelledby="trust-heading"
    >
      <div className="container-prose py-14 lg:py-20">
        <p id="trust-heading" className="eyebrow-amber text-center mb-8">
          מי גייס דרכי בשנים האחרונות
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:gap-x-10">
          {trustClients.map((c, i) => (
            <li
              key={c}
              className="text-lg lg:text-xl font-bold text-[var(--color-text)] flex items-center gap-x-6 lg:gap-x-10"
            >
              <span className="flex items-center gap-2">
                <Star size={16} weight="fill" color="var(--color-accent)" />
                {c}
              </span>
              {i < trustClients.length - 1 && (
                <span aria-hidden className="text-[var(--color-border)]">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
