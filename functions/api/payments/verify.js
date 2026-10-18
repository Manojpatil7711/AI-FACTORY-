const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
function sameOrigin(request) { return request.headers.get("Origin") === new URL(request.url).origin; }
async function hmacHex(secret, message) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message)));
  return [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
}
function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0; for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: "Request origin rejected." }, 403);
  if (env.PAYMENT_MODE !== "test" || !env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") || !env.RAZORPAY_KEY_SECRET || !env.DB) return json({ error: "Test payment verification is not configured." }, 503);
  let body; try { body = await request.json(); } catch { return json({ error: "Invalid JSON." }, 400); }
  const { internalOrderId, razorpay_order_id: providerOrderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body || {};
  if (![internalOrderId, providerOrderId, paymentId, signature].every((v) => typeof v === "string" && v.length > 0 && v.length < 256)) return json({ error: "Required payment fields are missing." }, 400);
  try {
    const order = await env.DB.prepare("SELECT id, amount_paise, currency, status, razorpay_order_id, razorpay_payment_id FROM payment_orders WHERE id = ?").bind(internalOrderId).first();
    if (!order || order.razorpay_order_id !== providerOrderId || order.amount_paise !== 100 || order.currency !== "INR") return json({ error: "Payment does not match the server-created test order." }, 400);
    if (order.status === "captured" && order.razorpay_payment_id === paymentId) return json({ verified: true, status: "captured", message: "This test payment was already verified." });
    const expected = await hmacHex(env.RAZORPAY_KEY_SECRET, order.razorpay_order_id + "|" + paymentId);
    if (!safeEqual(expected, signature.toLowerCase())) return json({ error: "Payment signature is invalid." }, 400);
    const response = await fetch("https://api.razorpay.com/v1/payments/" + encodeURIComponent(paymentId), {
      headers: { "authorization": "Basic " + btoa(env.RAZORPAY_KEY_ID + ":" + env.RAZORPAY_KEY_SECRET) }
    });
    const payment = await response.json().catch(() => null);
    if (!response.ok || !payment?.id || payment.id !== paymentId || payment.order_id !== order.razorpay_order_id || payment.amount !== order.amount_paise || payment.currency !== order.currency) return json({ error: "Razorpay payment details did not match this test order." }, 400);
    if (payment.status === "captured") {
      await env.DB.prepare("UPDATE payment_orders SET status = 'captured', razorpay_payment_id = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ? AND razorpay_order_id = ? AND amount_paise = 100 AND currency = 'INR'").bind(paymentId, internalOrderId, providerOrderId).run();
      return json({ verified: true, status: "captured", message: "Test payment verified by the server. No real money was collected." });
    }
    if (payment.status === "authorized") {
      await env.DB.prepare("UPDATE payment_orders SET status = 'authorized', razorpay_payment_id = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ? AND status != 'captured'").bind(paymentId, internalOrderId).run();
      return json({ verified: false, status: "authorized", message: "Payment is authorized but not captured; it is not marked as paid." }, 202);
    }
    if (payment.status === "failed") await env.DB.prepare("UPDATE payment_orders SET status = 'failed', updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ? AND status != 'captured'").bind(internalOrderId).run();
    return json({ verified: false, status: payment.status || "unknown", message: "Razorpay has not confirmed a captured payment." }, 409);
  } catch {
    return json({ error: "Verification could not be completed. Check server logs and the D1 binding; do not assume the payment succeeded." }, 503);
  }
}
