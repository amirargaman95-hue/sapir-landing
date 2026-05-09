import { clients } from "@/data/mock";

export default function Clients() {
  return (
    <div className="space-y-8">
      <header>
        <p className="serif text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-2">
          לקוחות עסקיים
        </p>
        <h1 className="serif font-[700] text-3xl lg:text-4xl">
          5 לקוחות פעילים
        </h1>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((c) => (
          <li
            key={c.id}
            className="surface-card rounded-sm p-6 hover:border-[var(--color-teal)] transition-colors"
          >
            <p className="serif font-[700] text-lg">{c.name}</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              {c.industry}
            </p>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-[var(--color-muted)]">השמות</dt>
                <dd
                  className="serif font-[700] text-[var(--color-teal)]"
                  dir="ltr"
                >
                  {c.placements}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[var(--color-muted)]">פעילות אחרונה</dt>
                <dd className="text-[var(--color-charcoal-soft)]" dir="ltr">
                  {c.lastActivity}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[var(--color-muted)]">איש קשר</dt>
                <dd>{c.contact}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
