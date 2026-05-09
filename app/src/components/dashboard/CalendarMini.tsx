import { events } from "@/data/mock";

const MONTH_NAME = "מאי 2026";
const DAYS_IN_MONTH = 31;
// May 1, 2026 is a Friday. RTL Hebrew calendar starts Sunday at right.
// Day-of-week index for May 1: Sunday=0, Monday=1 ... Saturday=6
// May 1 2026 = Friday = index 5
const FIRST_DAY_OFFSET = 5;
const WEEK_DAYS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

const TYPE_COLOR: Record<string, string> = {
  interview: "var(--color-teal)",
  client: "#A06B30",
  followup: "#5A5A5C",
};

export default function CalendarMini() {
  const cells: (number | null)[] = [];
  for (let i = 0; i < FIRST_DAY_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="space-y-8">
      <header>
        <p className="serif text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-2">
          לוח שנה
        </p>
        <h1 className="serif font-[700] text-3xl lg:text-4xl">{MONTH_NAME}</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 surface-card rounded-sm p-4 lg:p-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEK_DAYS.map((d) => (
              <div
                key={d}
                className="text-xs text-center text-[var(--color-muted)] py-2"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              const dayEvents = d ? events.filter((e) => e.date === d) : [];
              return (
                <div
                  key={i}
                  className={`aspect-square border border-[var(--color-border)] rounded-sm p-1.5 text-xs flex flex-col ${
                    d ? "" : "opacity-30"
                  }`}
                >
                  <span className="text-[var(--color-muted)]" dir="ltr">
                    {d ?? ""}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="mt-auto flex gap-1 flex-wrap">
                      {dayEvents.map((e, idx) => (
                        <span
                          key={idx}
                          className="block w-1.5 h-1.5 rounded-full"
                          style={{ background: TYPE_COLOR[e.type] }}
                          aria-label={e.title}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events list */}
        <div className="surface-card rounded-sm p-5">
          <h2 className="serif font-[700] text-sm mb-4">פגישות החודש</h2>
          <ul className="space-y-3">
            {events.map((e, i) => (
              <li
                key={i}
                className="flex items-start gap-3 pb-3 border-b border-[var(--color-border)] last:border-0 last:pb-0"
              >
                <span
                  className="serif font-[700] text-2xl shrink-0"
                  style={{ color: TYPE_COLOR[e.type], lineHeight: 1 }}
                  dir="ltr"
                >
                  {e.date}
                </span>
                <div className="flex-1 text-sm">
                  <p>{e.title}</p>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    {e.type === "interview" && "ראיון"}
                    {e.type === "client" && "פגישת לקוח"}
                    {e.type === "followup" && "מעקב"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
