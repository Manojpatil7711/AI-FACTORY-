const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
export async function onRequestGet({ request, env }) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) return json({ ready: false, message: "Cross-origin request denied." }, 403);
  const missing = [];
  if (env.PAYMENT_MODE !== "test") missing.push("PAYMENT_MODE=test");
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_ID.startsWith("rzp_test_")) missing.push("Razorpay Test Key ID");
  if (!env.RAZORPAY_KEY_SECRET) missing.push("Razorpay Test Key Secret");
  if (!env.RAZORPAY_WEBHOOK_SECRET) missing.push("Razorpay Test Webhook Secret");
  if (!env.PAYMENT_TEST_ACCESS_CODE) missing.push("Private test access code");
  if (!env.DB) missing.push("Cloudflare D1 binding named DB");
  return json({ ready: missing.length === 0, mode: "test-only", realPaymentsEnabled: false, missing,
    message: missing.length ? "Test checkout is disabled until server-side test settings are configured." : "Test configuration is present. Only the fixed ₹1 test item is enabled." });
}
