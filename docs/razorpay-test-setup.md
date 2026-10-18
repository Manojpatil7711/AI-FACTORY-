# AI FACTORY — Razorpay Test Mode Setup

**Status: implementation scaffold; not active until D1 and encrypted test secrets are configured.** This is not live payment support.

## Cost guardrail
- Razorpay Test Mode uses simulated transactions and does not deduct real money.
- Cloudflare Workers Free currently includes D1 prototyping usage. Official documentation lists 5 million rows read/day, 100,000 rows written/day and 5 GB storage across the account. Limits are enforced; exceeding them can stop queries until reset. Re-check the official pricing page before setup.
- Do not enable paid billing or create a paid plan. If the dashboard asks to upgrade or add a payment method, stop and keep checkout disabled.
- Live transactions and provider fees are out of scope.

## 1. Dedicated test database — provisioned
A separate Cloudflare D1 database named ai-factory-test-payments has been created on the Free tier, and migrations/0001_razorpay_test.sql has been applied and verified. The existing AI FACTORY Pages project's Preview environment has the D1 binding named DB and PAYMENT_MODE=test configured. The Production environment was left unchanged. The unrelated Supabase project was not touched.

## 2. Add server-side Test Mode secrets
In Cloudflare Dashboard → Workers & Pages → ai-factory-tools → Settings → Variables and Secrets, choose the **Preview** environment and add the four values below. Use encrypted secrets for sensitive values. Do not add these to Production while testing this branch.

- PAYMENT_MODE — non-secret text variable set to exactly test
- RAZORPAY_KEY_ID — Razorpay Test Mode key ID; must begin with rzp_test_
- RAZORPAY_KEY_SECRET — Razorpay Test Mode key secret, encrypted
- RAZORPAY_WEBHOOK_SECRET — a separate webhook signing secret chosen when configuring the Razorpay Test Mode webhook, encrypted
- PAYMENT_TEST_ACCESS_CODE — a long random private access code for the test page, encrypted; enter it only on the HTTPS test page

Never use Live Mode keys. Never put secrets in browser code, Git, screenshots, logs or chat. Save settings and let the existing Pages Git integration deploy; do not add a second deployment pipeline.

## 3. Configure the Razorpay Test Mode webhook
In Razorpay Dashboard, switch explicitly to Test Mode, open Webhooks and add this Preview endpoint:
https://feat-india-marketplace-found.ai-factory-tools.pages.dev/api/payments/webhook

Subscribe to:
- payment.captured
- payment.authorized
- payment.failed

Set the webhook secret to the same value stored in RAZORPAY_WEBHOOK_SECRET. Configure the webhook in Test Mode only.

## 4. Run tests
Open https://feat-india-marketplace-found.ai-factory-tools.pages.dev/payment-test.html after Preview secrets are saved and a fresh Preview deployment has completed. This is the branch preview URL; it is not the production site. The page is marked noindex and excluded from the sitemap.

Run the fixed ₹1.00 simulated test item and verify:
- Successful test checkout is confirmed only after the server verifies the signature and queries Razorpay for the payment status.
- Failed or dismissed checkout is never shown as paid.
- Invalid signatures are rejected.
- Amounts other than 100 paise or currencies other than INR are rejected.
- Duplicate webhook event IDs are idempotent.
- The D1 row records only server-confirmed states.

Do not test with real payment details. Use Razorpay's official Test Mode instruments. Verify event delivery in the Razorpay Test Mode dashboard.

## Current restrictions
- Test item only; no real listing can be purchased.
- No seller accounts, customer orders, refunds, payouts, subscriptions or production payment support.
- No live keys or live-mode switch.
- This code scaffold cannot be considered operational until the database migration, binding, encrypted secrets, webhook, and test transactions are independently verified.
