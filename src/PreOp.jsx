import { useState } from "react";
import { submitPreOp } from "./webhooks";

const questions = [
  {
    n: 1,
    phase: "Revenue",
    label: "Inquiry Volume",
    prompt: "How many total patient inquiries did you receive last month, across all channels?",
    type: "text",
    placeholder: "e.g. 240",
  },
  {
    n: 2,
    phase: "Revenue",
    label: "Dropped Inquiries",
    prompt: "How many inquiries from the last 90 days received no response or follow-up?",
    type: "text",
    placeholder: "e.g. 35",
  },
  {
    n: 3,
    phase: "Revenue",
    label: "Consult Conversion",
    prompt: "What percentage of inquiries convert to scheduled consultations?",
    type: "text",
    placeholder: "e.g. 22%",
  },
  {
    n: 4,
    phase: "Revenue",
    label: "Treatment Conversion",
    prompt: "What is your consultation-to-treatment conversion rate?",
    type: "text",
    placeholder: "e.g. 40%",
  },
  {
    n: 5,
    phase: "Revenue",
    label: "Patient Value Yr 1",
    prompt: "What is your average revenue per patient in the first 12 months?",
    type: "text",
    placeholder: "e.g. $4,300",
  },
  {
    n: 6,
    phase: "Revenue",
    label: "Return Rate",
    prompt: "What percentage of patients return for additional treatments within 12 months?",
    type: "text",
    placeholder: "e.g. 30%",
  },
  {
    n: 7,
    phase: "Revenue",
    label: "Lifetime Value",
    prompt: "What is your average lifetime value per patient?",
    type: "text",
    placeholder: "e.g. $9,500",
  },
  {
    n: 8,
    phase: "Revenue",
    label: "Referral Rate",
    prompt: "What percentage of new patients come from direct referrals?",
    type: "text",
    placeholder: "e.g. 15%",
  },
  {
    n: 9,
    phase: "Operational",
    label: "Software Waste",
    prompt: "How much do you spend monthly on software tools your team isn't fully using?",
    type: "text",
    placeholder: "e.g. $800",
  },
  {
    n: 10,
    phase: "Operational",
    label: "Data Silos",
    prompt: "How many of your systems share data automatically, versus requiring manual entry?",
    type: "text",
    placeholder: "e.g. 2 of 6",
  },
  {
    n: 11,
    phase: "Operational",
    label: "Manual Hours",
    prompt: "How many hours per week does your team spend on tasks that could be automated?",
    type: "text",
    placeholder: "e.g. 25",
  },
  {
    n: 12,
    phase: "Operational",
    label: "Role Misalignment",
    prompt: "Which role is doing the most work outside their job description?",
    type: "text",
    placeholder: "e.g. Front desk lead",
  },
  {
    n: 13,
    phase: "Operational",
    label: "SOP Documentation",
    prompt: "Do you have documented SOPs for your 3 highest-volume workflows?",
    type: "choice",
    choices: ["Yes", "No"],
  },
  {
    n: 14,
    phase: "Operational",
    label: "Team Friction",
    prompt: "Could you predict what every team member would say is most frustrating about their workflow?",
    type: "choice",
    choices: ["Yes", "No", "Not sure"],
  },
  {
    n: 15,
    phase: "Operational",
    label: "Feedback Loop",
    prompt: "When did you last ask each team member what's working and what isn't?",
    type: "choice",
    choices: ["Last month", "Last quarter", "6+ months ago", "Never"],
  },
];

function readout(blind) {
  if (blind === 0) {
    return {
      headline: "You Know Your Operation",
      sub: "Every pivot point answered with hard data. That level of visibility is rare — The Scan can tell you whether the numbers themselves are healthy.",
    };
  }
  if (blind <= 2) {
    return {
      headline: "You're Close",
      sub: "A few blind spots remain. The questions you can't answer with verified data are usually where the revenue leaks hide.",
    };
  }
  if (blind <= 5) {
    return {
      headline: "Precision Is Breaking Down",
      sub: "Several operational pivot points are running on guesswork. Each blind spot is a place where revenue can leak unmeasured.",
    };
  }
  return {
    headline: "What You Can't See",
    sub: "Most of your operation is invisible to you right now. This is exactly the condition where the biggest revenue leaks hide.",
  };
}

export default function PreOp() {
  const [stage, setStage] = useState("start"); // start | quiz | interstitial | capture | done
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // {n, label, value|null}
  const [draft, setDraft] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState("idle"); // idle | sending | sent | error

  const record = (value) => {
    const q = questions[index];
    const next = [...answers, { n: q.n, label: q.label, value }];
    setAnswers(next);
    setDraft("");
    if (index === 7) {
      setStage("interstitial");
    } else if (index === questions.length - 1) {
      setStage("capture");
    } else {
      setIndex(index + 1);
    }
  };

  const blindSpots = answers.filter((a) => a.value === null);
  const verified = answers.filter((a) => a.value !== null);
  const readoutInfo = readout(blindSpots.length);
  const q = questions[index];

  const unlock = async (e) => {
    e.preventDefault();
    setSubmitState("sending");
    const formatAnswer = (a) => `${String(a.n).padStart(2, "0")}. ${a.label}: ${a.value}`;
    const formatBlindSpot = (a) => `${String(a.n).padStart(2, "0")}. ${a.label}`;
    // Plain-text (\n) copies are what the CRM contact record shows; the *Html copies
    // exist only so the readout email renders line breaks in Outlook, which ignores
    // white-space:pre-line.
    const escapeHtml = (s) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const asHtml = (lines) =>
      lines.length ? lines.map(escapeHtml).join("<br>") : "(none)";
    const verifiedLines = verified.map(formatAnswer);
    const blindSpotLines = blindSpots.map(formatBlindSpot);
    const result = await submitPreOp({
      name: name.trim() || null,
      email: email.trim(),
      resultHeadline: readoutInfo.headline,
      verifiedCount: verified.length,
      blindSpotCount: blindSpots.length,
      verifiedAnswers: verifiedLines.join("\n") || "(none)",
      blindSpots: blindSpotLines.join("\n") || "(none)",
      verifiedAnswersHtml: asHtml(verifiedLines),
      blindSpotsHtml: asHtml(blindSpotLines),
    });
    setSubmitState(result.ok || result.skipped ? "sent" : "error");
    setStage("done");
  };

  return (
    <main className="flow-page">
      <header className="flow-masthead">
        <a className="flow-return" href="#/">
          ← Return to Diagnostic Overview
        </a>
        <img src="/assets/onyva-logo-purple.png" alt="Onyva" />
        {stage === "quiz" ? (
          <span className="flow-progress">
            {answers.length}/{questions.length}
          </span>
        ) : (
          <span className="flow-progress">Case File: 010</span>
        )}
      </header>

      {stage === "start" && (
        <section className="flow-card">
          <p className="flow-kicker">Stage 01</p>
          <h1>The Pre-Op</h1>
          <p className="flow-body">
            No guesses. No estimates. We are tracking data fidelity across 15
            operational pivot points. If you do not have hard data for a
            question, record it as a blind spot ("Skip / Don't Know"). False
            confidence here compromises the entire diagnostic.
          </p>
          <button
            className="flow-primary"
            type="button"
            onClick={() => setStage("quiz")}
          >
            Initiate Diagnostic Sequence →
          </button>
          <p className="flow-note">Takes ~2 minutes. Free. No score — a readout.</p>
        </section>
      )}

      {stage === "interstitial" && (
        <section className="flow-card">
          <p className="flow-kicker">Phase 1 Complete</p>
          <h1>Revenue visibility recorded.</h1>
          <p className="flow-body">
            Next: verifying operational infrastructure — systems, workflows,
            and team capacity.
          </p>
          <button
            className="flow-primary"
            type="button"
            onClick={() => {
              setIndex(8);
              setStage("quiz");
            }}
          >
            Continue →
          </button>
        </section>
      )}

      {stage === "quiz" && (
        <section className="flow-card">
          <p className="flow-kicker">
            {String(q.n).padStart(2, "0")}. {q.label}
            <em>{q.phase}</em>
          </p>
          <h1 className="flow-question">{q.prompt}</h1>
          {q.type === "text" ? (
            <form
              className="flow-answer"
              onSubmit={(e) => {
                e.preventDefault();
                if (draft.trim()) record(draft.trim());
              }}
            >
              <input
                className="flow-input"
                value={draft}
                placeholder={q.placeholder}
                autoFocus
                onChange={(e) => setDraft(e.target.value)}
              />
              <button
                className="flow-primary"
                type="submit"
                disabled={!draft.trim()}
              >
                Record Data →
              </button>
            </form>
          ) : (
            <div className="flow-choices">
              {q.choices.map((c) => (
                <button
                  key={c}
                  className="flow-choice"
                  type="button"
                  onClick={() => record(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <button
            className="flow-skip"
            type="button"
            onClick={() => record(null)}
          >
            Skip / Don't Know — record as blind spot
          </button>
        </section>
      )}

      {stage === "capture" && (
        <section className="flow-card">
          <p className="flow-kicker">Sequence Complete</p>
          <h1>Get your Diagnostic Readout.</h1>
          <p className="flow-body">
            {verified.length} pivot points verified. {blindSpots.length} blind
            spots recorded. Enter your email to unlock the full readout — which
            pivot points are critical vulnerabilities, and which are verified
            baselines.
          </p>
          <form className="flow-answer" onSubmit={unlock}>
            <input
              className="flow-input"
              type="text"
              value={name}
              placeholder="Name (optional)"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="flow-input"
              type="email"
              value={email}
              placeholder="doctor@clinic.com"
              required
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="flow-primary"
              type="submit"
              disabled={!email.trim() || submitState === "sending"}
            >
              {submitState === "sending" ? "Unlocking…" : "Unlock Readout →"}
            </button>
          </form>
        </section>
      )}

      {stage === "done" && (
        <section className="flow-card flow-readout">
          <p className="flow-kicker">Diagnostic Readout</p>
          <h1>{readoutInfo.headline}</h1>
          <p className="flow-body">{readoutInfo.sub}</p>
          {submitState === "error" && (
            <p className="flow-note flow-note-error">
              Your readout is shown below, but we couldn't reach our system to
              save a copy — try Schedule The Scan directly instead.
            </p>
          )}
          <div className="readout-counts">
            <div>
              <b>{verified.length}</b>
              <span>Verified Data</span>
            </div>
            <div>
              <b>{blindSpots.length}</b>
              <span>Blind Spots</span>
            </div>
          </div>
          <div className="readout-lists">
            <article>
              <h2>Critical Vulnerabilities</h2>
              {blindSpots.length ? (
                <ul>
                  {blindSpots.map((a) => (
                    <li key={a.n}>
                      {String(a.n).padStart(2, "0")}. {a.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>None recorded. Every pivot point verified.</p>
              )}
            </article>
            <article>
              <h2>Verified Baselines</h2>
              {verified.length ? (
                <ul>
                  {verified.map((a) => (
                    <li key={a.n}>
                      {String(a.n).padStart(2, "0")}. {a.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>None recorded.</p>
              )}
            </article>
          </div>
          <p className="flow-body">
            The Pre-Op reveals the blind spots. The Scan determines if we can
            fix them.
          </p>
          <a className="flow-primary" href="#/scan">
            Schedule The Scan →
          </a>
        </section>
      )}

      <footer className="flow-footer">
        <small>
          © 2026 Onyva. All rights reserved. Diagnosis before prescription.
          Always.
        </small>
      </footer>
    </main>
  );
}
