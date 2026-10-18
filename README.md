# AI FACTORY

**Discover. Create. Automate.**

AI FACTORY is a premium-minded AI tools discovery directory. It helps visitors explore tools by task, search across descriptions and categories, and follow direct links to official product websites.

## Current starter release

- Responsive dark UI designed for mobile and desktop
- Client-side search across names, makers, categories, descriptions and tags
- Category filters, A–Z sorting and quick-search chips
- Tool cards with official links and clear pricing labels
- Saved tools persist in browser local storage, with a safe in-memory fallback if storage is blocked; saves remain device/browser-specific
- Accessible labels, keyboard focus styles, reduced-motion support and skip link
- Lightweight static assets; no framework runtime or backend required for the first preview
- SEO title, description, Open Graph metadata and favicon
- GitHub Actions JavaScript syntax and static smoke validation; Cloudflare Pages Git integration handles deployment

## Project structure

```
.
├── index.html
├── styles.css
├── app.js
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── category-*.html (7 category landing pages)
├── tool-*.html (10 priority tool guides)
├── privacy.html / terms.html
├── scripts/smoke-check.py
├── .github/workflows/validate.yml
└── README.md
```

## Run locally

Open `index.html` in a browser. For a local web server, use Python from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Free-first deployment

- Cloudflare Pages project: `ai-factory-tools`
- Production URL: `https://ai-factory-tools.pages.dev` (Cloudflare Pages production deployment is configured)
- Production branch: `main`
- Build command: none; this is a static HTML/CSS/JavaScript site
- Cloudflare Pages is connected directly to this GitHub repository, production branch `main`, with no build command and repository root as output directory

The shortest names `ai-factory` and `aifactory` were not available as clean Pages subdomains. The selected URL contains no digits or random suffix.

### Deployment source of truth

- Cloudflare Pages Git integration is the active deployment path for this project.
- Pushes to `main` trigger production deployment; pull requests create isolated preview deployments.
- No `CLOUDFLARE_API_TOKEN` secret is required for the native Git integration.
- Avoid adding a second Wrangler/API-token deployment path to the same Pages project, because competing deployment systems can publish different commits out of order.
- No custom domain has been purchased or configured; keep the existing `ai-factory-tools.pages.dev` canonical host until a domain decision is made.

## Planned architecture

- **Frontend:** semantic HTML, modern CSS and JavaScript for the first low-cost release; consider a component framework only when it provides clear value.
- **Backend:** add a Python API only for features that genuinely require server-side logic and host it on a suitable runtime.
- **Database/auth:** Supabase Postgres and Auth, with row-level security on exposed tables.
- **Hosting:** Cloudflare Pages for the static site; evaluate Workers for edge endpoints.
- **Quality:** automated checks, dependency pinning, migrations, secrets management, preview testing and rollback before production changes.

Never place service-role keys, private API keys or database secrets in browser code. Enable and test row-level security before exposing database-backed features.

## Data and trust policy

Tool names, descriptions, pricing and feature availability can change. Verify listing details against official sources before presenting them as facts. Do not fabricate ratings, usage counts, benchmarks or endorsements. Sponsored listings should be clearly labeled. External links open with safe `noopener noreferrer` attributes.

## Current limitations

This is a deployed static front-end directory, not yet a production database-backed platform. Search, finder, comparison and prompt templates run in the browser; saved tools persist locally and are not synced between devices. The 10 priority tool guides are linked from directory cards and listed in the 20-URL sitemap. Admin CRUD, authentication, server APIs, real-time pricing verification, user accounts, marketplace transactions and payment integrations are not implemented.

## Brand

**AI FACTORY**  
*Discover. Create. Automate.*


## Phase 1 upgrade — Smart Directory

Implemented on `main` and included in the current production build:

- Side-by-side comparison for up to three directory entries (category, provider, description, tags, listed pricing label, official link).
- Local Prompt Studio templates for Shorts scripts, blog outlines, image prompts, research plans, website plans and social posts.
- Copy and text-file export for generated prompt templates.
- No AI API calls, accounts, backend, or database added.
- Prompt Studio clearly explains that it structures a prompt; it does not run the prompt or generate AI output itself.

### Phase 1 validation checklist

- [ ] Open homepage on desktop and mobile; verify Compare and Prompt Studio navigation.
- [ ] Compare two and three tools; check links open the official providers.
- [ ] Generate each prompt type, copy and download a prompt.
- [ ] Verify existing search, category filters, sorting, saved tools and mobile menu remain functional.
- [ ] Check browser console for JavaScript errors.
- [ ] Review preview deployment before merging to `main`.

Automated JavaScript syntax and static smoke checks pass for the merged implementation. Full manual browser/device testing remains a separate QA task.


## Marketplace MVP direction (October 2026)

The product direction is evolving from a directory-only starter into a free-first discovery and digital-asset marketplace.

### Positioning
- Primary focus: discover AI tools and evaluate small AI products, agents and micro-SaaS businesses.
- Secondary categories: websites, domains and digital products.
- Differentiator: transparent listing status, evidence-backed seller claims, clear product costs/limits, and practical buyer guidance. Never label a listing "verified" unless the checks performed are documented.

### Current preview status
- The homepage introduces the planned marketplace and founding-seller contact route.
- Seller enquiries use an email link; there is no database-backed submission form yet.
- There are no user accounts, public asset listings, escrow, checkout or live payments.
- The directory search remains client-side and does not save marketplace data.
- Do not claim listings, transactions, revenue or verification results that have not happened.

### Razorpay-ready payment plan
Keep payments disabled until the marketplace has a custom domain, a secured server-side API, seller/buyer records, listing moderation, terms/refund policies, and an approved Razorpay account. Future integration should:
1. Create orders on the server; never trust client-provided amounts.
2. Keep Razorpay Key Secret and webhook secret in server-side environment secrets only.
3. Verify checkout signatures server-side and verify webhook signatures against the raw request body.
4. Make webhook handling idempotent; record payment state in the database and reconcile failures/refunds.
5. Never store card data. Do not implement escrow or hold third-party seller funds unless the payment provider and applicable legal requirements explicitly support the model.
6. Start with platform-owned fees such as featured listings; add marketplace split payouts only after checking Razorpay product eligibility, onboarding and compliance requirements.
7. Keep a payment-provider adapter so the domain, database and UI do not depend on a hard-coded provider.

### Free-first build sequence
1. Validate demand and recruit real founding sellers.
2. Build database-backed listings, moderation, search/filtering and buyer enquiries with server-side validation and row-level security.
3. Add analytics, abuse controls, legal pages and backups.
4. Add Razorpay test-mode checkout for platform-owned listing fees; test webhooks and failure/refund paths.
5. Enable live payments only after account approval, domain verification and end-to-end tests.

This roadmap is not a claim that payment integration or the database is already implemented.


## Trust-first marketplace preview

The homepage includes a marketplace planning section explaining the intended asset categories and seller enquiry path. It deliberately shows **no invented live listings** and clearly states that transactions, escrow, accounts and payments are not enabled.

### Marketplace safety gate before launch

- [ ] Decide the supported asset categories and prohibited listing rules.
- [ ] Write buyer terms, seller terms, privacy notice, refund/cancellation policy and dispute escalation process with appropriate legal review.
- [ ] Implement Supabase Auth and database schema with tested Row Level Security; keep privileged keys server-side only.
- [ ] Require seller identity checks appropriate to risk and record the method, timestamp and result; never expose identity documents publicly.
- [ ] Verify control/ownership evidence for each asset type and show exactly what was checked, by whom and when.
- [ ] Require manual moderation before publication; create audit logs for status, price, ownership evidence and admin actions.
- [ ] Implement buyer enquiries and seller response flow with anti-spam/rate limits before public user-generated content.
- [ ] For payments, use server-created orders, server-side signature verification, signed webhook validation, idempotency, reconciliation and a documented refund/dispute path.
- [ ] Do not advertise escrow or hold seller proceeds unless the legal/payment-provider model explicitly supports it.
- [ ] Test abuse cases: fake seller, stolen asset, duplicate listing, manipulated price, failed payment, webhook replay, refund, account takeover, XSS, CSRF, SQL injection, IDOR and admin privilege escalation.
- [ ] Launch in stages: invite-only listings → limited pilot → public submissions → payments only after controls pass.

### Recommended commercial sequence

1. Free directory and seller discovery to learn which categories attract genuine demand.
2. Manually moderated listings and buyer-seller contact; do not collect buyer funds yet.
3. After repeat usage: optional featured listings with clear sponsored labels, subject to policy and disclosure.
4. After legal, support and fraud controls: transaction fee or paid seller tools; validate the fee model before investing.
5. Reinvest revenue into verification, customer support, monitoring, backups and reliable infrastructure before expensive growth campaigns.

A checked identity, checked ownership evidence, reviewed listing, and a completed transaction are four different claims. Never combine them into a single blanket “100% verified” badge.


## India-first marketplace preview

- `marketplace-india.html` is an additive UI preview for Indian buyers and sellers of AI tools and AI services.
- Demo cards and prices are illustrative only; seller preview stays in the browser and sends nothing.
- No live seller accounts, listing publication, orders, UPI or Razorpay payments are enabled.
- Backend/RLS/payment design is documented in `docs/marketplace-india-plan.md`. The SQL under `supabase/migrations` is a draft only and has not been applied.
