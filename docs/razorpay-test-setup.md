# AI FACTORY — Razorpay Test Mode Setup

**Status: implementation scaffold; not active until D1 and encrypted test secrets are configured.** This is not live payment support.

## Cost guardrail
- Razorpay Test Mode uses simulated transactions and does not deduct real money.
- Cloudflare Workers Free currently includes D1 prototyping usage. Official documentation lists 5 million rows read/day, 100,000 rows written/day and 5 GB storage across the account. Limits are enforced; exceeding them can stop queries until reset. Re-check the official pricing page before setup.
- Do not enable paid billing or create a paid plan. If the dashboard asks to upgrade or add a payment method, stop and keep checkout disabled.
- Live transactions and provider fees are out of scope.

## 1. Create the D1 database
In Cloudflare Dashboard → Workers & Pages → D1 SQL Database, create a database named ai-factory-test-payments only if the account confirms it can be created on the Free plan. This does not require or modify the unrelated Supabase project.

Apply migrations/0001_razorpay_test.sql to this database. Review the selected database name carefully before running the migration; never run it against another application's database.

Then open the existing ai-factory-tools Pages project → Settings → Bindings → Add → D1 database:
- Variable name: DB
- Select the dedicated ai-factory-test-payments database
- Save and redeploy through the existing Git integration.

## 2. Add server-side Test Mode secrets
In ai-factory-tools → Settings → Variables and Secrets, configure the Preview environment first, then the Production environment only when you intend to test the production hostname. Use encrypted secrets for sensitive values.

- PAYMENT_MODE — non-secret text variable set to exactly test
- RAZORPAY_KEY_ID — Razorpay Test Mode key ID; must begin with rzp_test_
- RAZORPAY_KEY_SECRET — Razorpay Test Mode key secret, encrypted
- RAZORPAY_WEBHOOK_SECRET — a separate webhook signing secret chosen when configuring the Razorpay Test Mode webhook, encrypted

Never use Live Mode keys. Never put secrets in browser code, Git, screenshots, logs or chat. Save settings and let the existing Pages Git integration deploy; do not add a second deployment pipeline.

## 3. Configure the Razorpay Test Mode webhook
In Razorpay Dashboard, switch explicitly to Test Mode, open Webhooks and add:
https://ai-factory-tools.pages.dev/api/payments/webhook

Subscribe to:
- payment.captured
- payment.authorized
- payment.failed

Set the webhook secret to the same value stored in RAZORPAY_WEBHOOK_SECRET. Configure the webhook in Test Mode only.

## 4. Run tests
Open https://ai-factory-tools.pages.dev/payment-test.html after the test branch is merged and the backend settings are configured. The page is marked noindex and excluded from the sitemap.

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
