"use client";

import { useEffect, useRef, useState } from "react";

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
    label: "ניסיון בגיוס והשמה",
    sub: "אקס-מנפאואר + מחלקת HR שהקמתי מאפס",
  },
  {
    value: 9,
    word: "שלבים",
    label: "תהליך מקצה לקצה",
    sub: "מהגדרת המשרה ועד שהעובד נשאר במפעל",
  },
  {
    value: 100,
    suffix: "%",
    label: "אחריות בכתב",
    sub: "תשלום רק לאחר הצלחה. החלפה בלי תוספת.",
  },
];

function CountUpNum({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setStarted(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(stat.value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, stat.value]);

  return (
    <div ref={ref} className="num">
      <span dir="ltr">
        {shown}
        {stat.suffix ?? ""}
      </span>
      {stat.word && <span className="word">{stat.word}</span>}
    </div>
  );
}

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
              <CountUpNum stat={stat} />
              <span className="label">{stat.label}</span>
              <p className="sub">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
