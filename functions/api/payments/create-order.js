const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
function sameOrigin(request) { return request.headers.get("Origin") === new URL(request.url).origin; }
function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0; for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: "Request origin rejected." }, 403);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return json({ error: "JSON request required." }, 415);
  if (env.PAYMENT_MODE !== "test" || !env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") || !env.RAZORPAY_KEY_SECRET || !env.PAYMENT_TEST_ACCESS_CODE || !env.DB) {
    return json({ error: "Test checkout is not configured. No payment was created." }, 503);
  }
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON." }, 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "A JSON object is required." }, 400);
  const requestId = typeof body.requestId === "string" ? body.requestId : "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) return json({ error: "A valid unique request ID is required." }, 400);
  if (body.productId !== "test-item") return json({ error: "Only the fixed test item is available. Marketplace demo listings cannot be purchased." }, 400);
  if (typeof body.accessCode !== "string" || !safeEqual(env.PAYMENT_TEST_ACCESS_CODE, body.accessCode)) return json({ error: "The private test access code is incorrect." }, 403);
  try {
    const existing = await env.DB.prepare("SELECT id, request_id, amount_paise, currency, status, razorpay_order_id FROM payment_orders WHERE request_id = ?").bind(requestId).first();
    if (existing?.razorpay_order_id && ["created", "authorized"].includes(existing.status)) {
      return json({ keyId: env.RAZORPAY_KEY_ID, internalOrderId: existing.id, orderId: existing.razorpay_order_id, amount: existing.amount_paise, currency: existing.currency });
    }
    if (existing) return json({ error: "This test request was already used. Start a new test attempt." }, 409);
    const dailyCount = await env.DB.prepare("SELECT COUNT(*) AS total FROM payment_orders WHERE created_at >= date('now')").first();
    if ((dailyCount?.total || 0) >= 25) return json({ error: "Daily test-order limit reached. Try again after the UTC day resets." }, 429);
    const internalOrderId = crypto.randomUUID();
    await env.DB.prepare("INSERT INTO payment_orders (id, request_id, product_id, amount_paise, currency, status) VALUES (?, ?, 'test-item', 100, 'INR', 'creating')").bind(internalOrderId, requestId).run();
    const providerResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { "authorization": "Basic " + btoa(env.RAZORPAY_KEY_ID + ":" + env.RAZORPAY_KEY_SECRET), "content-type": "application/json" },
      body: JSON.stringify({ amount: 100, currency: "INR", receipt: "af_" + internalOrderId.replace(/-/g, "").slice(0, 24),
        notes: { ai_factory_internal_order: internalOrderId, product_id: "test-item", mode: "test" } })
    });
    const providerOrder = await providerResponse.json().catch(() => null);
    if (!providerResponse.ok || !providerOrder?.id || providerOrder.amount !== 100 || providerOrder.currency !== "INR") {
      await env.DB.prepare("UPDATE payment_orders SET status = 'failed', updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?").bind(internalOrderId).run();
      return json({ error: "Razorpay did not create a valid test order. Check Test Mode settings and try again." }, 502);
    }
    await env.DB.prepare("UPDATE payment_orders SET status = 'created', razorpay_order_id = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ? AND status = 'creating'").bind(providerOrder.id, internalOrderId).run();
    return json({ keyId: env.RAZORPAY_KEY_ID, internalOrderId, orderId: providerOrder.id, amount: 100, currency: "INR" });
  } catch {
    return json({ error: "Test order could not be prepared. Confirm the D1 schema is applied and retry with a new test attempt." }, 503);
  }
}
