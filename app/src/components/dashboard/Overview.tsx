import { kpis, placements } from "@/data/mock";

export default function Overview() {
  return (
    <div className="space-y-10">
      <header>
        <p className="serif text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-2">
          ראשי
        </p>
        <h1 className="serif font-[700] text-3xl lg:text-4xl">
          שלום, ספיר.
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          תמונת מצב לתאריך 6 במאי 2026.
        </p>
      </header>

      {/* KPI cards */}
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <li
            key={k.label}
            className="surface-card rounded-sm p-5"
          >
            <p className="text-xs text-[var(--color-muted)]">{k.label}</p>
            <p
              className="serif font-[700] mt-2 text-[var(--color-charcoal)]"
              style={{ fontSize: "2rem", lineHeight: 1 }}
              dir="ltr"
            >
              {k.value}
            </p>
            {k.delta && (
              <p className="mt-1 text-xs text-[var(--color-teal)]">{k.delta}</p>
            )}
          </li>
        ))}
      </ul>

      {/* Recent placements table */}
      <section>
        <h2 className="serif font-[700] text-xl mb-4">השמות אחרונות</h2>
        <div className="surface-card rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-cream)] border-b border-[var(--color-border)]">
              <tr>
                <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                  מועמד
                </th>
                <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                  לקוח
                </th>
                <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                  תפקיד
                </th>
                <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                  התחיל
                </th>
                <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                  סטטוס
                </th>
              </tr>
            </thead>
            <tbody>
              {placements.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[var(--color-border)] last:border-0"
                >
                  <td className="py-3 px-4">{p.candidate}</td>
                  <td className="py-3 px-4">{p.client}</td>
                  <td className="py-3 px-4 text-[var(--color-muted)]">
                    {p.role}
                  </td>
                  <td className="py-3 px-4 text-[var(--color-muted)]" dir="ltr">
                    {p.startedAt}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs rounded-sm border ${
                        p.status === "תקופת התחייבות"
                          ? "border-[var(--color-teal)] text-[var(--color-teal)]"
                          : "border-[var(--color-border)] text-[var(--color-muted)]"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
