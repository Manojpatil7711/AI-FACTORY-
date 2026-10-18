# AI FACTORY — India Marketplace foundation

This branch adds an isolated India-first marketplace UI preview without replacing the current AI tools directory.

- Open `marketplace-india.html` from the root website.
- Includes search, category filters, six clearly marked demo cards and a local-only seller listing preview.
- Prices on demo cards are illustrative and not offers.
- The seller form never sends or stores data.
- Razorpay/UPI is not connected. No checkout, seller accounts, listings or payments are live.
- `docs/marketplace-india-plan.md` records the backend, RLS, payment verification and launch gates.
- `supabase/migrations/20261018_marketplace_foundation.sql` is a DRAFT ONLY; it has not been applied. Do not apply it to the existing connected Supabase project unless project ownership and purpose are verified.

The root homepage remains the existing AI tools directory. This is additive only.
