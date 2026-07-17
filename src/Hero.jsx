import { useEffect } from "react";

const focusAreas = [
  { icon: "revenue", label: "Revenue" },
  { icon: "costs", label: "Costs" },
  { icon: "workflows", label: "Workflows" },
  { icon: "capacity", label: "Team Capacity" },
  { icon: "technology", label: "Technology" },
];

const roadmap = [
  {
    number: "01",
    title: "The Pre-Op",
    text: "Clinical-grade examination of your practice operations.",
  },
  {
    number: "02",
    title: "The Scan",
    text: "Operational failures quantified in dollars and hours.",
  },
  {
    number: "03",
    title: "The Protocol",
    text: "Prioritized correction protocol ranked by ROI.",
  },
];

const deliveryItems = [
  {
    title: "Implementation protocol.",
    text: "Who does what, when, and how you measure whether it worked. Whether you execute internally, hire a specialist, or engage Onyva.",
  },
  {
    title: "Prioritized corrections ranked by ROI.",
    text: "What to fix first, what to fix second, and what to leave alone. Based on your data, not industry averages.",
  },
  {
    title: "A ranked diagnostic report.",
    text: "Every operational failure quantified in dollars and hours. You see the full picture. Not a summary, not a deck, a diagnosis.",
  },
];

const journeyStages = [
  {
    stage: "01",
    title: "The Pre-Op",
    text: "A 15-question self-assessment. You confront the questions you can't answer about your own operation: revenue, costs, workflows, and team performance.",
  },
  {
    stage: "02",
    title: "The Scan",
    text: "A 15-minute call with our diagnostic team. We find out if we can help you and if we're a fit to work together.",
  },
  {
    stage: "03",
    title: "The Strategy",
    text: "A 45-minute solution design conversation. We pick up where The Scan left off, go deeper into your operation, and determine the scope, timeline, and investment for your Roadmap.",
  },
  {
    stage: "04",
    title: "The Roadmap",
    text: "A 2-4 week clinical-grade examination of your entire operation. Every operational failure quantified in dollars and hours. Delivered with a prioritized correction protocol ranked by ROI.",
  },
  {
    stage: "05",
    title: "The Intervention",
    text: "If we identify solutions in our wheelhouse, we propose a retainer to implement corrections. Ongoing re-diagnostics ensure they hold.",
  },
];

const fitItems = [
  "Your practice generates over $1.5 million in annual\u00a0revenue.",
  "You have a solid team in place.",
  "You have already invested in marketing, technology, or operational support, but the results still do not match the effort.",
  "You want to know exactly where revenue is leaking, and you are ready to invest in diagnostic clarity.",
];

const notFitItems = [
  "Your team size is under\u00a04.",
  "Your revenue is under $1.5 million.",
  "You want marketing execution without an operational diagnosis.",
  "You have already decided on a solution and just need an implementer.",
  "You are looking for a quick fix rather than a structural intervention.",
];

function useJourneyTrace() {
  useEffect(() => {
    const list = document.querySelector(".journey-list");
    if (!list) return undefined;

    const updateTrace = () => {
      const markers = Array.from(list.querySelectorAll("li > span"));
      const first = markers[0];
      const last = markers[markers.length - 1];
      if (!first || !last) return;

      const listRect = list.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const start = firstRect.top + firstRect.height / 2 - listRect.top;
      const end = lastRect.top + lastRect.height / 2 - listRect.top;
      const viewportTrigger = window.innerHeight * 0.58;
      const current = viewportTrigger - (listRect.top + start);
      const progress = Math.max(0, Math.min(1, current / Math.max(1, end - start)));

      list.style.setProperty("--journey-line-start", `${start}px`);
      list.style.setProperty("--journey-line-height", `${Math.max(0, end - start)}px`);
      list.style.setProperty("--journey-progress", progress.toFixed(4));
    };

    updateTrace();
    window.addEventListener("scroll", updateTrace, { passive: true });
    window.addEventListener("resize", updateTrace);

    return () => {
      window.removeEventListener("scroll", updateTrace);
      window.removeEventListener("resize", updateTrace);
    };
  }, []);
}

function FocusIcon({ type }) {
  const paths = {
    revenue: (
      <>
        <circle cx="16" cy="16" r="13" />
        <path d="M18.7 10.6c-1-.8-4.2-1.3-5.2.3-1.2 1.9.7 3.2 2.7 3.8 2.1.7 3.7 1.7 3.1 3.7-.7 2.3-4.7 2-6.3.8M16 8.1v15.8" />
      </>
    ),
    costs: (
      <>
        <circle cx="16" cy="16" r="13" />
        <path d="M16 3v13h13M16 16l8.7-9.6" />
      </>
    ),
    workflows: (
      <>
        <path d="M9 5h14v8H9zM4 21h10v7H4zM18 21h10v7H18zM16 13v5M9 18h14M9 18v3M23 18v3" />
      </>
    ),
    capacity: (
      <>
        <circle cx="16" cy="11" r="5" />
        <circle cx="7" cy="14" r="3.6" />
        <circle cx="25" cy="14" r="3.6" />
        <path d="M8.5 28c0-6 3.2-9.2 7.5-9.2s7.5 3.2 7.5 9.2M1.8 26c.4-4.1 2.3-6.3 5.8-6.7M30.2 26c-.4-4.1-2.3-6.3-5.8-6.7" />
      </>
    ),
    technology: (
      <>
        <rect x="3" y="5" width="26" height="18" rx="1" />
        <path d="M12 28h8M16 23v5" />
      </>
    ),
  };

  return (
    <svg className="focus-icon" viewBox="0 0 32 32" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

function DossierContent() {
  return (
    <section className="dossier" aria-label="Clinical diagnosis">
      <header className="masthead">
        <div className="brand">
          <img className="brand-logo" src="/assets/onyva-logo-purple.png" alt="Onyva" />
          <p className="descriptor">A DIAGNOSTIC PRACTICE<br />FOR REGENERATIVE MEDICINE</p>
        </div>
        <dl className="case-meta">
          <div><dt>CASE FILE:</dt><dd>001</dd></div>
          <div><dt>DATE:</dt><dd className="date-line" /></div>
        </dl>
      </header>

      <div className="message">
        <p className="kicker"><span aria-hidden="true">+</span> Clinical Diagnosis</p>
        <h1>
          Diagnosis before<br />
          <span>prescription.</span> <em>Always.</em>
        </h1>
        <p className="subcopy">
          Your patients get evidence-based care.<br />
          Your business gets guesswork.
        </p>
      </div>

      <div className="exam">
        <p><span>Examination Type:</span> Clinical-Grade Examination</p>
        <div className="focus">
          <span className="focus-label">Focus Areas:</span>
          {focusAreas.map((area) => (
            <div className="focus-area" key={area.label}>
              <FocusIcon type={area.icon} />
              <small><i />{area.label}</small>
            </div>
          ))}
        </div>
        <p className="objective"><span>Objective:</span> Operational failures quantified in<br /> dollars and hours.</p>
      </div>

      <div className="dossier-footer">
        <button
          className="schedule"
          type="button"
          onClick={() => {
            window.location.hash = "#/scan";
          }}
        >
          <span>Schedule The Scan</span>
        </button>
        <p className="confidential"><strong>Confidential</strong><br />For Internal Use Only</p>
      </div>
    </section>
  );
}

function HeroRoadmap() {
  return (
    <aside className="roadmap" aria-label="The roadmap">
      <header>
        <h2>The Roadmap</h2>
        <span aria-hidden="true">+</span>
      </header>
      <ol>
        {roadmap.map((step) => (
          <li key={step.number}>
            <b>{step.number}</b>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="outcome">
        <span aria-hidden="true">+</span>
        <p><strong>Outcome</strong><br />Stronger operations.<br />Better patient outcomes.<br />Sustainable growth.</p>
      </div>
    </aside>
  );
}

function FolderTab() {
  return (
    <div className="folder-tab" aria-hidden="true">
      <img className="folder-tab-brand" src="/assets/onyva-logo-white.png" alt="" />
      <div className="folder-tab-record">
        <span>Patient Chart</span>
        <b>001</b>
      </div>
      <div className="folder-tab-private">Confidential</div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-scene">
        <picture className="scene-picture" aria-hidden="true">
          <source
            media="(max-width: 900px)"
            srcSet="/assets/onyva-hero-background-mobile.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 900px)"
            srcSet="/assets/onyva-hero-background-mobile.png"
          />
          <source
            srcSet="/assets/onyva-hero-background.webp"
            type="image/webp"
          />
          <img
            className="scene-art"
            src="/assets/onyva-hero-background.png"
            alt=""
          />
        </picture>
        <FolderTab />
        <DossierContent />
        <HeroRoadmap />
      </div>
    </section>
  );
}

function SectionHeader({ caseId, title, note }) {
  return (
    <header className="section-header">
      <p>Case File: {caseId}</p>
      <h2>{title}</h2>
      {note ? <span>{note}</span> : null}
    </header>
  );
}

function PaperSection({ id, className = "", caseId, title, note, children }) {
  return (
    <section className={`paper-section ${className}`} id={id}>
      <SectionHeader caseId={caseId} title={title} note={note} />
      {children}
    </section>
  );
}

function DiagnosticQuestion() {
  return (
    <PaperSection
      id="diagnostic"
      className="diagnostic-question"
      caseId="002"
      title={<>A question for physicians<br />who run clinics.</>}
      note="Clinical Standard"
    >
      <div className="question-grid">
        <div className="question-copy">
          <p>When you treat a patient, diagnosis comes first. Always. No exceptions.</p>
          <p>You would never prescribe a treatment protocol based on a guess. You would never skip the workup because the patient seemed fine.</p>
          <p>Your marketing agency prescribed campaigns. Your consultant prescribed strategies. But who examined your intake? Your workflows? Your technology? <span className="nowrap">Your close rate?</span></p>
        </div>
        <aside className="chart-note">
          <b>Diagnostic prompt</b>
          <p>When was the last time anyone diagnosed your business before prescribing a solution?</p>
          <span>If the answer is "never," your business has been receiving treatment without a diagnosis.</span>
        </aside>
      </div>
    </PaperSection>
  );
}

function LeakFinding() {
  return (
    <PaperSection
      id="finding"
      className="leak-finding"
      caseId="003"
      title="One clinic. One diagnostic."
      note="Annual Leak"
    >
      <div className="finding-layout">
        <div className="finding-stamp">
          <span>$680,000</span>
          <small>a year</small>
        </div>
        <div className="recovery-slip">
          <b>Addressable recovery</b>
          <strong>$155,000-$310,000</strong>
          <span>
            <span>2 months to break even.</span>
            <span>2.8x-8.3x ROI in Year 1.</span>
          </span>
        </div>
        <div className="finding-copy">
          <p>One regenerative medicine clinic. 263 verified opportunities per month — potential patients who reached the clinic and never converted. A 68% miss rate on inbound volume.</p>
          <p>Seven operational failures identified across the intake system. Invisible from the outside, invisible to their marketing agency. The clinic owner <span className="nowrap">had no idea.</span> Their team <span className="nowrap">had no idea.</span></p>
          <p>The diagnostic revealed revenue leaking to voicemail, hold times, after-hours gaps, and broken workflows. That's the hole in the bucket.</p>
        </div>
      </div>
    </PaperSection>
  );
}

function PracticePosition() {
  return (
    <PaperSection
      id="practice"
      className="practice-position"
      caseId="004"
      title={<>We are not an agency.<br />We are not consultants.</>}
      note="Diagnostic Practice"
    >
      <div className="position-copy">
        <p>Most clinics that feel stuck hire a marketing agency. The agency prescribes a campaign. Revenue doesn't move. The clinic hires a consultant. The consultant prescribes a strategy. Revenue still doesn't move.</p>
        <p>The prescription was never the problem. The missing <span className="nowrap">diagnosis was.</span></p>
        <p>Onyva examines your entire operation: revenue, costs, workflows, team capacity, and technology. We identify the specific failures draining money, time, and effort.</p>
      </div>
      <div className="standard-mark">
        <span>Standard of Care</span>
        <p>We don't prescribe until we diagnose. And if we're not a fit, we'll tell you <span className="nowrap">that too.</span></p>
      </div>
    </PaperSection>
  );
}

function SystemSection() {
  return (
    <PaperSection
      id="system"
      className="system-section"
      caseId="005"
      title="The System"
      note={<>Two instruments.<br />Two levels of precision.</>}
    >
      <div className="system-grid">
        <article>
          <span>Stage 1</span>
          <h3>The Pre-Op</h3>
          <b>Free. 15 minutes. 15 questions.</b>
          <p>A diagnostic self-assessment that reveals the blind spots in your operation. Answer what you can. Skip what you can't. Your blind spots tell the story.</p>
          <a className="file-link" href="#/pre-op"><span>Take The Pre-Op</span><i aria-hidden="true">→</i></a>
        </article>
        <article>
          <span>Stage 2</span>
          <h3>The Roadmap</h3>
          <b>The verified diagnostic. 2-4 weeks.</b>
          <p>A clinical-grade examination of your entire operation. Every failure quantified in dollars and hours. Delivered with a prioritized correction protocol ranked by ROI.</p>
          <a className="file-link" href="#/scan"><span>Schedule The Scan</span><i aria-hidden="true">→</i></a>
        </article>
      </div>
      <p className="system-note">The Pre-Op shows you the questions you might not be able to answer. The Roadmap gives you the exact number, and the evidence to act on it.</p>
    </PaperSection>
  );
}

function DeliverablesSection() {
  return (
    <PaperSection
      id="deliverables"
      className="deliverables-section"
      caseId="006"
      title="What The Roadmap Delivers"
      note={<>The findings.<br />Not opinions.</>}
    >
      <div className="deliverables-list">
        {deliveryItems.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="clarity-note">Clarity on what comes next.</p>
    </PaperSection>
  );
}

function FitSection() {
  return (
    <PaperSection
      id="fit"
      className="fit-section"
      caseId="007"
      title={<>The Roadmap is a<br />diagnostic engagement.</>}
      note="Not every practice qualifies."
    >
      <p className="fit-intro">We built The Roadmap for regenerative medicine clinics with a structural problem.<br />Not a hustle problem.</p>
      <div className="fit-grid">
        <article className="fit-positive">
          <h3>You're likely a fit if:</h3>
          <ul>
            {fitItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
        <article className="fit-negative">
          <h3>You're not a fit if:</h3>
          <ul>
            {notFitItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </div>
      <div className="scan-note" id="scan">
        <h3>What happens in The Scan:</h3>
        <p>The Scan is a 15-minute confidential call. We find out if we can help you and if we're a fit to work together. Then we tell you honestly: are you a fit for The Strategy, or not.</p>
        <a className="scan-button" href="#/scan">Schedule The Scan</a>
      </div>
    </PaperSection>
  );
}

function JourneySection() {
  return (
    <PaperSection
      id="journey"
      className="journey-section"
      caseId="008"
      title="The Patient Journey"
      note="5 Clinical Stages"
    >
      <ol className="journey-list">
        {journeyStages.map((item) => (
          <li key={item.stage}>
            <span>{item.stage}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </PaperSection>
  );
}

function FinalCta() {
  return (
    <section className="final-cta" id="pre-op">
      <div className="final-card">
        <p>Case File: 009</p>
        <h2>How well do you actually know your own operation?</h2>
        <p>The Pre-Op is a 15-question diagnostic. It won't give you a score. It will show you the blind spots in your operation.</p>
        <p>Most clinic owners discover they can't answer half the questions with verified data. The ones they can't answer are usually where the biggest <span className="nowrap">revenue leaks hide.</span></p>
        <div className="cta-actions" id="final-scan">
          <a className="file-link" href="#/pre-op"><span>Take The Pre-Op</span><i aria-hidden="true">→</i></a>
          <a className="file-link" href="#/scan"><span>Schedule The Scan</span><i aria-hidden="true">→</i></a>
        </div>
      </div>
      <footer className="site-footer">
        <img src="/assets/onyva-logo-purple.png" alt="Onyva" />
        <span>A diagnostic practice for regenerative medicine clinic operations.</span>
        <small>Diagnosis before prescription. Always. © 2026</small>
      </footer>
    </section>
  );
}

export default function Hero() {
  useJourneyTrace();

  return (
    <main className="page">
      <HeroSection />
      <DiagnosticQuestion />
      <LeakFinding />
      <PracticePosition />
      <SystemSection />
      <DeliverablesSection />
      <FitSection />
      <JourneySection />
      <FinalCta />
    </main>
  );
}
