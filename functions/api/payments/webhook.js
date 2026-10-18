const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
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
  if (env.PAYMENT_MODE !== "test" || !env.RAZORPAY_WEBHOOK_SECRET || !env.DB) return json({ error: "Test webhook endpoint is not configured." }, 503);
  const signature = request.headers.get("x-razorpay-signature") || "";
  const eventId = request.headers.get("x-razorpay-event-id") || "";
  if (!signature || !eventId || eventId.length > 200) return json({ error: "Required webhook headers are missing." }, 400);
  const rawBody = await request.text();
  const expected = await hmacHex(env.RAZORPAY_WEBHOOK_SECRET, rawBody);
  if (!safeEqual(expected, signature.toLowerCase())) return json({ error: "Invalid webhook signature." }, 400);
  let event; try { event = JSON.parse(rawBody); } catch { return json({ error: "Invalid webhook JSON." }, 400); }
  if (!event || typeof event !== "object" || Array.isArray(event)) return json({ error: "Webhook body must be a JSON object." }, 400);
  const eventType = typeof event.event === "string" ? event.event : "unknown";
  const payment = event.payload?.payment?.entity;
  try {
    const duplicate = await env.DB.prepare("SELECT event_id FROM razorpay_webhook_events WHERE event_id = ?").bind(eventId).first();
    if (duplicate) return json({ received: true, duplicate: true });
    if (!payment || typeof payment.order_id !== "string") {
      await env.DB.prepare("INSERT OR IGNORE INTO razorpay_webhook_events (event_id, event_type) VALUES (?, ?)").bind(eventId, eventType).run();
      return json({ received: true, processed: false });
    }
    if (eventType === "payment.captured" && typeof payment.id === "string" && payment.status === "captured" && payment.amount === 100 && payment.currency === "INR") {
      await env.DB.batch([
        env.DB.prepare("INSERT OR IGNORE INTO razorpay_webhook_events (event_id, event_type) VALUES (?, ?)").bind(eventId, eventType),
        env.DB.prepare("UPDATE payment_orders SET status = 'captured', razorpay_payment_id = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE razorpay_order_id = ? AND amount_paise = 100 AND currency = 'INR'").bind(payment.id, payment.order_id)
      ]);
    } else if (eventType === "payment.authorized" && typeof payment.id === "string" && payment.status === "authorized" && payment.amount === 100 && payment.currency === "INR") {
      await env.DB.batch([
        env.DB.prepare("INSERT OR IGNORE INTO razorpay_webhook_events (event_id, event_type) VALUES (?, ?)").bind(eventId, eventType),
        env.DB.prepare("UPDATE payment_orders SET status = 'authorized', razorpay_payment_id = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE razorpay_order_id = ? AND amount_paise = 100 AND currency = 'INR' AND status != 'captured'").bind(payment.id, payment.order_id)
      ]);
    } else if (eventType === "payment.failed" && payment.status === "failed" && payment.amount === 100 && payment.currency === "INR") {
      await env.DB.batch([
        env.DB.prepare("INSERT OR IGNORE INTO razorpay_webhook_events (event_id, event_type) VALUES (?, ?)").bind(eventId, eventType),
        env.DB.prepare("UPDATE payment_orders SET status = 'failed', updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE razorpay_order_id = ? AND status != 'captured'").bind(payment.order_id)
      ]);
    } else {
      await env.DB.prepare("INSERT OR IGNORE INTO razorpay_webhook_events (event_id, event_type) VALUES (?, ?)").bind(eventId, eventType).run();
    }
    return json({ received: true });
  } catch {
    return json({ error: "Webhook processing failed; retry after checking the D1 database." }, 503);
  }
}
