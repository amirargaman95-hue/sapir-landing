import Image from "next/image";
import { Briefcase, Buildings, Sparkle, Factory, Quotes } from "@phosphor-icons/react/dist/ssr";
import { aboutCopy, credentials } from "@/data/content";

const iconMap = {
  Briefcase,
  Buildings,
  Sparkle,
  Factory,
} as const;

export default function About() {
  return (
    <section
      id="about"
      className="sec-light section-y"
      aria-labelledby="about-heading"
    >
      <div className="container-prose">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-[440px] mx-auto amber-shadow rounded-[14px] overflow-hidden">
              <Image
                src={aboutCopy.imageSrc}
                alt={aboutCopy.imageAlt}
                fill
                sizes="(max-width: 1024px) 70vw, 35vw"
                className="object-cover"
              />
            </div>

            {/* Floating quote — desktop */}
            <aside
              className="hidden lg:block absolute -bottom-6 -left-10 max-w-[320px] surface-card p-5"
              aria-label="ציטוט לקוחה"
            >
              <Quotes size={22} weight="fill" color="var(--color-accent)" />
              <p className="text-base leading-snug text-[var(--color-text)] mt-2">
                {aboutCopy.quote.text}
              </p>
              <p className="mt-3 text-xs text-[var(--color-muted)]">
                — {aboutCopy.quote.author}, {aboutCopy.quote.role}
              </p>
            </aside>
          </div>

          {/* Text + Credentials */}
          <div className="lg:col-span-7">
            <p className="eyebrow-amber mb-4">עליי</p>
            <h2 id="about-heading" className="h-display-md max-w-[22ch]">
              {aboutCopy.heading}
            </h2>

            <div className="mt-6 space-y-4 leading-relaxed text-lg" style={{ color: "#D4D4D8" }}>
              {aboutCopy.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Credentials grid — pro-max */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((c) => {
                const Icon = iconMap[c.iconName as keyof typeof iconMap];
                return (
                  <li key={c.label} className="cred-card">
                    <span className="cred-icon-wrap">
                      <Icon size={22} weight="duotone" color="var(--color-accent)" />
                    </span>
                    <span className="cred-metric">{c.metric}</span>
                    <span className="cred-label">{c.label}</span>
                    {c.sub && <span className="cred-sub">{c.sub}</span>}
                  </li>
                );
              })}
            </ul>

            {/* Mobile-only quote */}
            <aside
              className="mt-8 lg:hidden surface-card p-5"
              aria-label="ציטוט לקוחה"
            >
              <Quotes size={22} weight="fill" color="var(--color-accent)" />
              <p className="text-base leading-snug mt-2">{aboutCopy.quote.text}</p>
              <p className="mt-3 text-xs text-[var(--color-muted)]">
                — {aboutCopy.quote.author}, {aboutCopy.quote.role}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
