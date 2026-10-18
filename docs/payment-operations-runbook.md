# AI FACTORY — Simple Payment Operations Runbook (India)

Status: planning only. No payment provider is connected, and this document does not enable checkout.

## Goal: keep daily operation simple
The owner should not need to edit code or touch database rows to manage ordinary orders. Provide one admin dashboard with:
- Payment state: Pending, Paid, Failed, Refund pending, Refunded, Needs review.
- Order ID, listing, buyer reference, amount (INR), provider reference, timestamps.
- Clear next action and a short reason when an order needs attention.
- Filters for date, state, seller and provider reference; CSV export for reconciliation.
- Separate buttons for actions that are safe to repeat (refresh status) and actions needing confirmation (refund, suspend seller).
- An audit trail for every manual status change. Never offer a button that marks an order Paid without verified provider evidence.

## Recommended phased launch

### Phase 0 — Safe preview
- Keep the current directory untouched and keep marketplace changes in a draft PR.
- Show only sample listings with a visible demo label.
- Do not accept personal information, seller applications, orders or money.

### Phase 1 — Backend and seller controls
- Create a dedicated AI FACTORY backend project only after its owner/organization and current price/limits are verified.
- Apply reviewed migrations only to that project.
- Add authentication, seller onboarding, admin MFA where supported, seller approval, listing moderation, reporting and support flows.
- Use deny-by-default row-level security. Test anonymous, buyer, seller and admin access separately.
- Keep service-role credentials exclusively in server-side secrets.

### Phase 2 — Razorpay test mode
- Configure keys only in server-side environment secrets; never in HTML, browser JavaScript, Git, screenshots or chat.
- Buyer presses Pay -> server validates the listing and current price -> server creates the provider order -> hosted/approved checkout opens.
- Server verifies the payment signature and processes signed webhooks. Browser redirect alone never proves payment.
- Verify amount, INR currency, provider order ID and internal order ownership. Enforce unique webhook event IDs and idempotent processing.
- Test success, failure, cancel, delayed webhook, duplicate webhook, invalid signature, wrong amount, wrong order, refund and retry.
- Show a plain-language error and support reference rather than exposing provider/API errors to buyers.

### Phase 3 — Limited production
- Launch only after provider account approval, applicable marketplace/settlement eligibility, legal/tax/privacy review and all security tests pass.
- Start with a small, monitored release. Confirm test/live keys and webhook URLs separately.
- Enable daily reconciliation: compare internal orders against provider settlements, flag mismatches, export a report and investigate exceptions.
- Make refunds admin-only, permission-gated, confirmation-protected and auditable.
- Do not promise automatic seller payouts until the provider's marketplace/settlement product and onboarding requirements are confirmed. Do not hold or split customer funds informally.

## Daily owner workflow (target)
1. Open Admin → Payments.
2. Review only the “Needs review” and “Pending too long” queues.
3. Refresh status from the server/provider; do not edit payment state manually.
4. Review refunds and seller moderation as separate permissioned tasks.
5. Export reconciliation and close the day only when mismatches are resolved or documented.

## Required operational safeguards
- Never collect card details, UPI PINs or OTPs in AI FACTORY.
- Never trust client-sent amount, seller ID, payment success or redirect parameters.
- Never log secrets or full sensitive payment payloads.
- Add rate limits, CSRF/session protections where applicable, input validation, audit logging, backups, monitoring and a support contact before launch.
- Display only the minimum personal/payment data required for support.
- Have clear terms, privacy, refund/cancellation, seller terms and complaint/grievance handling reviewed before live transactions.

## Free-first cost rule
- Keep static marketplace preview on the existing Cloudflare Pages setup.
- Do not assume a production database, auth, serverless functions, email, payment processing or settlement are all free. Check provider limits, usage pricing and marketplace fees before selecting services.
- No paid service, new project, production key or live payment switch without explicit owner approval.
- If the free backend limits cannot safely support transactions, keep checkout disabled rather than ship an insecure workaround.

## Release checklist
- [ ] Dedicated AI FACTORY backend identity confirmed; unrelated app project untouched.
- [ ] Migration reviewed and applied to the correct project only.
- [ ] RLS and authorization tests pass for each role.
- [ ] Razorpay test-mode payment, signature, webhook and idempotency tests pass.
- [ ] Refund and reconciliation workflows tested.
- [ ] Mobile, accessibility, abuse controls and support flows tested.
- [ ] Legal/compliance and provider approval confirmed.
- [ ] Production credentials stored server-side and live mode explicitly approved.
- [ ] Smoke test and rollback plan documented; production directory remains healthy.
