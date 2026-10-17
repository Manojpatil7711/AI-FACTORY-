# AI FACTORY

**Discover. Create. Automate.**

AI FACTORY is a premium-minded AI tools discovery directory. It helps visitors explore tools by task, search across descriptions and categories, and follow direct links to official product websites.

## Current starter release

- Responsive dark UI designed for mobile and desktop
- Client-side search across names, makers, categories, descriptions and tags
- Category filters, A–Z sorting and quick-search chips
- Tool cards with official links and clear pricing labels
- Save/unsave interaction for the current browser session
- Accessible labels, keyboard focus styles, reduced-motion support and skip link
- Lightweight static assets; no framework runtime or backend required for the first preview
- SEO title, description, Open Graph metadata and favicon
- GitHub Actions workflow for secure, free-first Cloudflare Pages publishing

## Project structure

```
.
├── index.html
├── styles.css
├── app.js
├── favicon.svg
├── robots.txt
├── .nojekyll
├── .github/workflows/deploy.yml
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
- Intended URL: `https://ai-factory-tools.pages.dev` (project created; not live until the first deployment succeeds)
- Production branch: `main`
- Build command: none; this is a static HTML/CSS/JavaScript site
- Published files are copied to `dist/` by GitHub Actions before deployment

The shortest names `ai-factory` and `aifactory` were not available as clean Pages subdomains. The selected URL contains no digits or random suffix.

### One-time deployment setup

1. Create a Cloudflare API token with **Cloudflare Pages: Edit** permission for the intended account.
2. In GitHub, open **Settings → Secrets and variables → Actions → New repository secret**.
3. Name the secret `CLOUDFLARE_API_TOKEN` and paste the token as its value. Never put the token in source code or a chat message.
4. Open the repository's **Actions** tab, select **Deploy AI FACTORY**, and choose **Run workflow**. Later pushes to `main` deploy automatically after the secret is configured.

The workflow intentionally skips publishing when the secret is missing. The Cloudflare account ID is used as a non-secret workflow setting.

No custom domain has been purchased or configured.

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

This starter is a front-end directory, not yet a production database-backed platform. Search and saved-tool state run in the browser; saved tools are not synced between devices. Admin CRUD, authentication, server APIs, real-time pricing verification, user accounts and monetization integrations are not implemented yet. The first deployment must be triggered after the Cloudflare API token is stored as a GitHub Actions secret.

## Brand

**AI FACTORY**  
*Discover. Create. Automate.*


## Phase 1 upgrade — Smart Directory

Implemented on the `feature/phase-1-smart-directory` branch:

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

This branch has not been merged or deployed to production.


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

A separate `marketplace.html` preview now explains the planned asset categories, listing statuses, seller checks, buyer journey and safety limits. It deliberately shows **no invented live listings** and clearly states that transactions, escrow, accounts and payments are not enabled.

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
