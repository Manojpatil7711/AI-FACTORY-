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

## Project structure

```
.
├── index.html
├── styles.css
├── app.js
├── favicon.svg
├── robots.txt
├── .nojekyll
└── README.md
```

## Run locally

Open `index.html` in a browser. For a local web server, use Python from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Free-first deployment plan

- Cloudflare Pages project name: `ai-factory-tools`
- Intended public URL: `https://ai-factory-tools.pages.dev` (reserved in the connected Cloudflare account; not live until a deployment succeeds)
- Production branch: `main`
- Build command: none; this is a static HTML/CSS/JavaScript site
- Output directory: repository root

The shortest names `ai-factory` and `aifactory` were not available as clean Pages subdomains, so a descriptive, digit-free name was selected. No custom domain has been purchased or configured.

## Planned architecture

- **Frontend:** semantic HTML, modern CSS and JavaScript for the first low-cost release; consider a component framework only when it provides clear value.
- **Backend:** Python API only for features that genuinely require server-side logic.
- **Database/auth:** Supabase Postgres and Auth, with row-level security on exposed tables.
- **Hosting:** Cloudflare Pages for the static site; evaluate Workers for server-side endpoints.
- **Quality:** automated checks, dependency pinning, migrations, secrets management, preview testing and rollback before production changes.

Never place service-role keys, private API keys or database secrets in browser code. Enable and test row-level security before exposing database-backed features.

## Data and trust policy

Tool names, descriptions, pricing and feature availability can change. Verify listing details against official sources before presenting them as facts. Do not fabricate ratings, usage counts, benchmarks or endorsements. Sponsored listings should be clearly labeled. External links open with safe `noopener noreferrer` attributes.

## Current limitations

This starter is a front-end directory, not yet a production database-backed platform. Search and saved-tool state run in the browser; saved tools are not synced between devices. Admin CRUD, authentication, server APIs, real-time pricing verification, user accounts and monetization integrations are not implemented yet. Initial Cloudflare Pages project setup is complete, but the first successful deployment still needs to be verified.

## Brand

**AI FACTORY**  
*Discover. Create. Automate.*
