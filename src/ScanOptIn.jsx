import { useState } from "react";

const tiers = ["< $1M", "$1M - $3M", "$3M - $5M", "$5M+"];

export default function ScanOptIn() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flow-page">
      <header className="flow-masthead">
        <a className="flow-return" href="#/">
          ← Return to Diagnostic Overview
        </a>
        <img src="/assets/onyva-logo-purple.png" alt="Onyva" />
        <span className="flow-progress">Secure Processing</span>
      </header>

      <section className="flow-card scan-card">
        <p className="flow-kicker">Stage 02</p>
        <h1>Schedule The Scan</h1>
        <p className="flow-body">
          The Pre-Op reveals the blind spots. The Scan determines if we can fix
          them. This is a strict 15-minute diagnostic call with an Onyva
          operating partner. We will review your Pre-Op baseline, evaluate your
          patient acquisition and operational workflows, and determine if an
          intervention is warranted.
        </p>
        <p className="flow-body">
          If we identify a structural fit, we will schedule a Deep Dive
          Strategy Session. If not, we will point you to the right resource.
          Diagnosis before prescription. Always.
        </p>

        {submitted ? (
          <div className="scan-pending">
            <b>Scheduler Connection Pending</b>
            <p>
              Our scheduling system is being connected — your information was
              not transmitted. Please check back shortly to book The Scan.
            </p>
          </div>
        ) : (
          <form
            className="scan-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <label>
              <span>Director / Owner Name</span>
              <input className="flow-input" type="text" placeholder="Dr. John Doe" required />
            </label>
            <label>
              <span>Practice Name</span>
              <input className="flow-input" type="text" placeholder="Regen Medicine Clinic" required />
            </label>
            <label>
              <span>Direct Email</span>
              <input className="flow-input" type="email" placeholder="doctor@clinic.com" required />
            </label>
            <label>
              <span>Direct Phone</span>
              <input className="flow-input" type="tel" placeholder="(555) 123-4567" required />
            </label>
            <label className="scan-wide">
              <span>Annual Revenue Tier</span>
              <select className="flow-input" defaultValue="" required>
                <option value="" disabled>
                  Select revenue tier...
                </option>
                {tiers.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="scan-wide">
              <span>Biggest Current Operational Friction</span>
              <textarea
                className="flow-input"
                rows="4"
                placeholder="Briefly describe the single biggest bottleneck preventing your practice from moving faster..."
              />
            </label>
            <div className="scan-wide">
              <button className="flow-primary" type="submit">
                Submit &amp; Access Scheduler →
              </button>
              <p className="flow-note">Strict 15 minutes. Confidential.</p>
            </div>
          </form>
        )}
      </section>

      <footer className="flow-footer">
        <small>
          © 2026 Onyva. All rights reserved. Diagnosis before prescription.
          Always.
        </small>
      </footer>
    </main>
  );
}
