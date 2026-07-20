// GHL inbound webhook endpoints (Onyva sub-account mXYgWKDnQngcIA895h5N).
// These are intentionally in source rather than env vars: this is a client-side
// app, so the URL ships in the bundle either way and no secret is being
// protected. Keeping them here means the site can never deploy unconfigured.
const PRE_OP_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/mXYgWKDnQngcIA895h5N/webhook-trigger/831a8f1e-9730-4800-8e06-738efdba1ce1";
const SCAN_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/mXYgWKDnQngcIA895h5N/webhook-trigger/c5f13b96-e7c2-43f6-97a4-9f1c3ba95032";

async function post(url, payload) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error("Webhook submit failed", err);
    return { ok: false, error: err };
  }
}

export function submitPreOp(payload) {
  return post(PRE_OP_WEBHOOK_URL, {
    source: "pre-op",
    submittedAt: new Date().toISOString(),
    ...payload,
  });
}

export function submitScan(payload) {
  return post(SCAN_WEBHOOK_URL, {
    source: "scan",
    submittedAt: new Date().toISOString(),
    ...payload,
  });
}
