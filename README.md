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
