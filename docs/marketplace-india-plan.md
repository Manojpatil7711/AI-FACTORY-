# AI FACTORY — India-first Buyer/Seller Marketplace Plan

## Scope
- Market: India only for the first release; prices in INR; initial language English with future Hindi support.
- Supply: (1) AI tools/software and (2) AI services/freelance/agency services.
- Existing directory remains the stable root homepage. Marketplace is an additive page at `/marketplace-india.html`.
- Current branch contains a static interaction preview only. Demo cards/prices are illustrative, not live offers. Seller form renders only in the browser and sends/stores nothing.
- Razorpay/UPI are planned but NOT connected. No checkout, orders, payouts or seller accounts are enabled.

## Free-first architecture
1. Frontend: existing Cloudflare Pages Git integration; no separate deployment workflow and no paid runtime.
2. Backend candidate: a dedicated Supabase project only after confirming it belongs to AI FACTORY. Do not reuse the existing connected Supabase project blindly: its current schema/functions are for another app (MANOX and other tables).
3. Database: listings, seller profiles, orders, payment attempts, webhook event IDs, moderation decisions, refund/dispute records. RLS default-deny; public reads only for published/approved listings; seller writes scoped to auth.uid(); admin/moderator actions server-side.
4. Payment: Razorpay Checkout with order creation on a trusted server/Edge Function, secret key server-side only, signature verification, raw-body webhook signature validation, replay/idempotency table, amount/currency/order ownership verification, server-only payment status transitions. Never trust browser callbacks as proof of payment.
5. Never collect card/UPI PIN/OTP in AI FACTORY. Razorpay handles payment UI. No public payout feature until KYC, compliance and reconciliation are reviewed.

## Data model proposal (not applied)
- `marketplace_profiles`: user_id, seller_status (pending/approved/rejected/suspended), display_name, country_code constrained to IN for launch, verification metadata not publicly exposed.
- `marketplace_listings`: seller_id, kind (tool/service), title, slug, summary, description, category, price_paise, billing_model, currency constrained to INR, status (draft/pending_review/published/rejected/archived), demo_url, delivery_terms, timestamps.
- `marketplace_orders`: buyer_id, seller_id, listing_id, amount_paise, currency INR, order status; client cannot update paid/refunded status.
- `marketplace_payment_attempts`: order_id, provider_order_id, provider_payment_id, status, amount_paise, currency, signature_verified_at; private to backend/service role.
- `marketplace_webhook_events`: provider_event_id unique, payload hash, processed_at, outcome; no public access.
- `marketplace_moderation_events`: listing_id, actor_id, decision, reason, created_at; private.
- Optional `marketplace_enquiries` for buyer/seller contact only after consent/privacy review.

## Launch gates
- Dedicated AI FACTORY backend/project verified; migration applied to the correct project only.
- Auth/session and RLS tests for anon, buyer, seller, moderator and admin.
- Seller verification, listing moderation and abuse/report workflow.
- Razorpay test-mode create-order + verify-signature + signed webhook + duplicate webhook + invalid amount + wrong-owner tests.
- Refund/dispute/cancellation/support and applicable Indian privacy, consumer, tax and marketplace obligations reviewed.
- E2E tests on mobile/desktop, accessibility, rate limits and backups.
- Only then configure production Razorpay keys and publish checkout.

## Explicit non-goals for this PR
- No live backend or production database changes.
- No Razorpay account/API key or live UPI payment setup.
- No deployment or changes to the current directory data.
- No claim of seller verification, buyer protection or transaction support before those controls exist.
