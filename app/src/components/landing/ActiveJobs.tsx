"use client";

import { activeJobs, WHATSAPP_URL_MID } from "@/data/content";
import { track } from "@/lib/track";

export default function ActiveJobs() {
  return (
    <section className="active-jobs section-y" aria-labelledby="active-jobs-heading">
      <div className="container-prose">
        <p className="eyebrow-amber">משרות פעילות החודש</p>
        <h2 id="active-jobs-heading" className="active-jobs-heading">
          {activeJobs.length} תפקידים פתוחים אצל הלקוחות שלי.
        </h2>
        <p className="active-jobs-sub">
          זה רק חלק. אם התפקיד שלך לא ברשימה — דברי איתי, אני בודקת התאמה.
        </p>

        <ul className="active-jobs-grid" role="list">
          {activeJobs.map((job, i) => (
            <li className="job-card" key={`${job.title}-${i}`}>
              <span className="job-pulse" aria-hidden />
              <div className="job-body">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-sector">{job.sector}</span>
              </div>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL_MID}
          target="_blank"
          rel="noopener noreferrer"
          className="active-jobs-cta"
          onClick={() => track("cta_whatsapp_click", { location: "active_jobs" })}
        >
          יש לי תפקיד שלא ברשימה — דברי איתי
        </a>
      </div>
    </section>
  );
}
