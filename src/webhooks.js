const PRE_OP_WEBHOOK_URL = import.meta.env.VITE_PREOP_WEBHOOK_URL;
const SCAN_WEBHOOK_URL = import.meta.env.VITE_SCAN_WEBHOOK_URL;

async function post(url, payload) {
  if (!url) {
    console.warn("Webhook URL not configured; skipping submit.", payload);
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
