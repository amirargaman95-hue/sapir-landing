import { leads } from "@/data/mock";
import { WhatsappLogo, Phone } from "@phosphor-icons/react/dist/ssr";

export default function LeadsInbox() {
  return (
    <div className="space-y-8">
      <header>
        <p className="serif text-sm uppercase tracking-[0.18em] text-[var(--color-muted)] mb-2">
          לידים מהדף
        </p>
        <h1 className="serif font-[700] text-3xl lg:text-4xl">
          {leads.length} לידים פעילים
        </h1>
      </header>

      <div className="surface-card rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[680px]">
          <thead className="bg-[var(--color-cream)] border-b border-[var(--color-border)]">
            <tr>
              <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                שם
              </th>
              <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                טלפון
              </th>
              <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                תפקיד מבוקש
              </th>
              <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                מקור
              </th>
              <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                התקבל
              </th>
              <th className="text-right py-3 px-4 text-[var(--color-muted)] font-[500]">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr
                key={l.id}
                className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-cream)] transition-colors"
              >
                <td className="py-3 px-4 serif font-[500]">{l.name}</td>
                <td className="py-3 px-4" dir="ltr">
                  {l.phone}
                </td>
                <td className="py-3 px-4 text-[var(--color-muted)]">
                  {l.role}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-0.5 text-xs rounded-sm border border-[var(--color-border)] text-[var(--color-muted)]">
                    {l.source}
                  </span>
                </td>
                <td className="py-3 px-4 text-[var(--color-muted)] text-xs" dir="ltr">
                  {l.receivedAt}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label="התקשרי"
                      className="p-1.5 rounded-sm border border-[var(--color-border)] hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] transition-colors"
                    >
                      <Phone size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="שלחי וואטסאפ"
                      className="p-1.5 rounded-sm border border-[var(--color-border)] hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] transition-colors"
                    >
                      <WhatsappLogo size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
