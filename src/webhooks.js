const PRE_OP_WEBHOOK_URL = import.meta.env.VITE_PREOP_WEBHOOK_URL;
const SCAN_WEBHOOK_URL = import.meta.env.VITE_SCAN_WEBHOOK_URL;

// A missing URL is a build misconfiguration (env vars are baked in at build
// time), never a success. Callers must not show a confirmation for it —
// doing so silently drops the lead while telling the visitor they're captured.
async function post(url, payload) {
  if (!url) {
    console.error("Webhook URL not configured; submission dropped.", payload);
    return { ok: false, skipped: true };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, skipped: false };
  } catch (err) {
    console.error("Webhook submit failed", err);
    return { ok: false, skipped: false, error: err };
  }
}

export function submitPreOp(payload) {
  return post(PRE_OP_WEBHOOK_URL, { source: "pre-op", submittedAt: new Date().toISOString(), ...payload });
}

export function submitScan(payload) {
  return post(SCAN_WEBHOOK_URL, { source: "scan", submittedAt: new Date().toISOString(), ...payload });
}
