"use client";

import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { activeJobs, WHATSAPP_URL_MID } from "@/data/content";
import { track } from "@/lib/track";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export default function ActiveJobs() {
  return (
    <section className="active-jobs section-y" aria-labelledby="active-jobs-heading">
      <div className="container-prose">
        <p className="eyebrow-amber">משרות פעילות החודש</p>
        <h2 id="active-jobs-heading" className="active-jobs-heading">
          {activeJobs.length} תפקידים פתוחים אצל הלקוחות שלי.
        </h2>
        <p className="active-jobs-sub">
          זה רק חלק. אם התפקיד שאתה צריך לאייש לא כאן — דבר איתי, אני בודקת התאמה.
        </p>

        <Stagger className="active-jobs-grid" step={0.05} role="list">
          {activeJobs.map((job, i) => (
            <StaggerItem className="job-card" key={`${job.title}-${i}`}>
              <span className="job-pulse" aria-hidden />
              <div className="job-body">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-sector">{job.sector}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <a
          href={WHATSAPP_URL_MID}
          target="_blank"
          rel="noopener noreferrer"
          className="active-jobs-cta"
          onClick={() => track("cta_whatsapp_click", { location: "active_jobs" })}
        >
          <WhatsappLogo size={18} weight="fill" />
          <span>יש לך משרה שלא ברשימה? דבר איתי</span>
        </a>
      </div>
    </section>
  );
}
