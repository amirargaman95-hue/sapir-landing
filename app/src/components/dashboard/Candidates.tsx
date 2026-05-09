import { candidates, CandidateStatus } from "@/data/mock";

const COLUMNS: CandidateStatus[] = [
  "חדש",
  "בשיחה",
  "נשלח למעסיק",
  "הושמה",
  "תקופת התחייבות",
];

export default function Candidates() {
  return (
    <div className="space-y-8">
      <header>
        <p className="serif text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-2">
          פייפליין מועמדים
        </p>
        <h1 className="serif font-[700] text-3xl lg:text-4xl">
          {candidates.length} מועמדים בתהליך
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {COLUMNS.map((col) => {
          const items = candidates.filter((c) => c.status === col);
          return (
            <div key={col} className="flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="serif font-[500] text-sm">{col}</h2>
                <span
                  className="text-xs text-[var(--color-muted)]"
                  dir="ltr"
                >
                  {items.length}
                </span>
              </div>
              <ul className="space-y-2 min-h-[120px]">
                {items.map((c) => (
                  <li
                    key={c.id}
                    className="surface-card rounded-sm p-3 hover:border-[var(--color-teal)] transition-colors"
                  >
                    <p className="serif font-[500] text-sm">{c.name}</p>
                    <p className="text-xs text-[var(--color-muted)] mt-1">
                      {c.role}
                    </p>
                    {c.client && (
                      <p className="text-xs text-[var(--color-teal)] mt-2">
                        ↳ {c.client}
                      </p>
                    )}
                    {c.note && (
                      <p className="text-xs text-[var(--color-muted)] mt-2 italic">
                        {c.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
