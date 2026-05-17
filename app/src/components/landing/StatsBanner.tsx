"use client";

import StatCounter from "@/components/ui/StatCounter";

type StatItem = {
  value: number;
  suffix?: string;
  word?: string;
  label: string;
  sub: string;
};

const STATS: StatItem[] = [
  {
    value: 10,
    word: "שנים",
    label: "ניסיון בגיוס",
    sub: "כמעט עשור של ניהול תהליכי גיוס מקצה לקצה",
  },
  {
    value: 9,
    word: "שלבים",
    label: "תהליך מסודר",
    sub: "מהגדרת התפקיד ועד שהעובד נקלט במפעל שלך",
  },
  {
    value: 30,
    word: "יום",
    label: "אחריות בכתב",
    sub: "מעוגן בחוזה. עזב? אני מחליפה על חשבוני.",
  },
];

export default function StatsBanner() {
  return (
    <section
      className="stats-banner"
      aria-labelledby="stats-banner-heading"
    >
      <div className="row">
        <h2 id="stats-banner-heading" className="heading">
          המספרים שמדברים. <span className="accent">בכתב.</span>
        </h2>

        <div className="stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                suffixWord={stat.word}
                label={stat.label}
              />
              <p className="sub">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
