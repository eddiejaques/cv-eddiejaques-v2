# eddiejaques.me — Brutalist, Metrics-First Portfolio

Live: [www.eddiejaques.me](https://www.eddiejaques.me)

A Director of Data & AI Products portfolio site with a brutalist aesthetic and metrics-first design. Case studies, blog, a gated resume, and a SaaS-style "start a conversation" funnel.

## Tech Stack

- **React 19 + TypeScript** — component framework
- **Redux Toolkit** — case study filters, blog search, UI state
- **React Router v7** — client-side routing
- **Tailwind CSS v4 + CSS Modules** — design tokens, utility styling
- **Vite + pnpm** — build tooling
- **Supabase** — Postgres (lead capture) + Storage (case study HTML), all behind RLS
- **Vercel Serverless Functions** (`api/`) — case study proxy + contact form handler
- **Resend** — email notifications on contact submissions

## Local Dev

```bash
pnpm install
pnpm dev      # dev server with HMR at localhost:5173
pnpm build    # generate sitemap, typecheck, production build to dist/
pnpm lint     # ESLint
pnpm test     # Vitest
```

**Env vars** — copy `.env.example` to `.env` and fill in:

```
# PUBLIC — bundled into client JS by Vite. Only RLS-safe keys here.
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...   # publishable/anon key — RESPECTS RLS

# SECRET — server-side only, NEVER VITE_-prefixed.
SUPABASE_SERVICE_ROLE_KEY=...               # used by upload script + serverless functions
```

> ⚠️ **Key safety:** anything `VITE_`-prefixed is shipped to every browser. Put only the
> **publishable/anon** key in `VITE_SUPABASE_ANON_KEY` — never a `sb_secret_` or
> `service_role` key, which bypass RLS and would expose all data. See `.env.example`.

**Vercel env vars:** set the two `VITE_*` vars, plus — because the contact form runs through
`api/contact.ts` — `SUPABASE_SERVICE_ROLE_KEY` (server-side insert) and `RESEND_API_KEY`
(notifications), with optional `CONTACT_NOTIFY_EMAIL`. The case-study proxy needs no key
(public read only); the service-role key is required only for the contact function.

## Project Structure

```
api/
  case-study.ts        — proxies /case-studies/:slug to the HTML in Supabase Storage
  contact.ts           — validates + stores contact submissions, emails via Resend
src/
  components/   — Header, Footer, Button, Card, Metrics, CaseStudyCard, ResumeGate, ...
  pages/        — Home, CaseStudiesHub, CaseStudyDetail, BlogHub, BlogPostDetail, Resume, Contact, About
  store/        — Redux slices (caseStudies, blog, ui) + selectors
  data/         — Static content: resume.ts, caseStudies.ts (metadata), blogPosts/
  types/        — CaseStudy, BlogPost, Resume interfaces
  styles/       — globals.css (design tokens), fonts.css, print.css
  utils/        — slugify.ts, dateFormat.ts, analytics.ts
  lib/          — supabaseClient.ts
public/
  case-studies/ — generated case study HTML (gitignored; uploaded to Supabase Storage)
scripts/
  generate-sitemap.mjs    — builds public/sitemap.xml (runs on pnpm build)
  inject-cta.mjs          — injects the "start a conversation" CTA into case study HTML
  upload-case-studies.mjs — uploads public/case-studies/*.html to Supabase Storage
supabase/
  schema.sql            — resume_leads table + insert-only RLS
  contact-requests.sql  — contact_requests table (server-write-only RLS)
  storage-policies.sql   — case-studies bucket: public read, no public write
  diagnose.sql          — inspect live RLS/policy state
```

## Content Model

**Case studies** — metadata lives in `src/data/caseStudies.ts` (type `CaseStudy`), where each
entry's `staticHtmlPath` points at a full HTML page in **Supabase Storage**. The HTML is
generated outside this repo, lands in `public/case-studies/*.html`, gets the CTA injected,
then is uploaded:

```bash
node scripts/inject-cta.mjs          # idempotent — adds the contact CTA before </body>
node scripts/upload-case-studies.mjs # pushes to Supabase Storage (needs service-role key)
```

At runtime, `/case-studies/:slug` is rewritten (see `vercel.json`) to `api/case-study.ts`,
which fetches the HTML from Storage and serves it server-side under the site origin.

**Blog posts** — Markdown with YAML frontmatter at `src/data/blogPosts/*.md`, registered in `src/data/blogPosts.ts`.

**Resume** — single source of truth at `src/data/resume.ts` (type `Resume`). All pages import from here.

## Conversion Funnel

Every case study ends with a value-first CTA ("Tackling something like this?") linking to
`/contact?ref=<slug>` for attribution. The `/contact` page captures a short qualifying form
and POSTs to `api/contact.ts`, which:

1. Validates input (with a honeypot for spam),
2. Inserts into `contact_requests` via the service-role key (bypasses RLS), and
3. Emails a notification via Resend (best-effort), with `reply-to` set to the sender.

On success the visitor is offered a calendar link for an immediate conversation.

## Security

- **RLS everywhere.** `resume_leads` is insert-only for anon; `contact_requests` is
  server-write-only (RLS on, no anon policy); the `case-studies` Storage bucket is
  public-read with no public write. See `supabase/*.sql`.
- **Security headers** in `vercel.json`: CSP, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, HSTS, Permissions-Policy, COOP.
- **Input validation** on the case-study slug (anti-SSRF/path-traversal) and contact form.
- Run `supabase/diagnose.sql` in the SQL editor to verify the live RLS/policy state.

## Deploy

Hosted on Vercel. `vercel.json` proxies `/case-studies/:slug` to the case-study function and
rewrites everything else to `index.html` for SPA routing, plus sets the security headers.
Push to `main` triggers a production deploy.

**First-time backend setup** (in the Supabase SQL editor): run `schema.sql`,
`contact-requests.sql`, and `storage-policies.sql`. Then set the env vars in Vercel and
upload case studies with the scripts above.

---

## Use This as Your Own Portfolio

The section below is a single prompt you can paste into Claude Code on a fresh clone of this repo. It will guide an AI agent to turn this into your personal portfolio — your content, your brand, your design.

````
You are helping me adapt the eddiejaques.me portfolio template into my own personal portfolio site. The repo is already cloned and running locally. Work iteratively: after each major pass, run `pnpm build`, take snapshots of the key pages, and ask me for feedback before continuing.

## Step 1 — Gather my inputs

Ask me to provide the following before touching any code:
1. My **resume** (paste as Markdown, upload a PDF, or give a file path).
2. My **case studies** — as many as I have (Markdown, PDF, HTML, or links). For each, note the company, role, problem, solution, and key metrics.
3. My **target role and industry** — what job am I going for? What should the site communicate first?
4. **Design preferences** — color palette (or mood: "warmer", "more corporate", "playful"), typography feel, overall vibe. If unsure, say so and I'll derive something from the content.
5. My **name**, **email**, **LinkedIn URL**, **GitHub URL** (or other socials).

Do not proceed until you have at least items 1, 3, and 5.

## Step 2 — Content migration

Parse my resume into `src/data/resume.ts` following the `Resume` type in `src/types/Resume.ts`. Fields: contact (name, title, location, email, linkedin, github), summary, coreCompetencies, experience (reverse-chron, bullets leading with outcomes/metrics), education, skills, certifications.

For each case study, create a `CaseStudy` entry in `src/data/caseStudies.ts` (id, slug, title, category, org, experienceStage, summary, keyMetrics [{label, value}], tags, staticHtmlPath) and a full HTML page at `public/case-studies/<slug>-case-study.html`. Then run `node scripts/inject-cta.mjs` and `node scripts/upload-case-studies.mjs` to push them to Supabase Storage.

For any blog posts or written pieces I have, create `src/data/blogPosts/*.md` with YAML frontmatter (title, date, tags, excerpt) and register them in `src/data/blogPosts.ts`.

## Step 3 — Identity replacement

Replace ALL of the following with my details (single source of truth — no hardcoding in components):
- Name, title, summary, email, LinkedIn, GitHub everywhere in `src/data/resume.ts`.
- SEO metadata: `<title>` in `index.html`, `description` and `og:*` tags, sitemap base URL in `scripts/generate-sitemap.mjs`.
- Footer copyright name; contact notification email in `api/contact.ts` (or set CONTACT_NOTIFY_EMAIL).
- Any leftover original-owner content (grep for "Gaurav", "eddiejaques", "dani", old email addresses, phone numbers).

Run `grep -rni "gaurav\|eddiejaques\|dani" src/ public/ api/ index.html` and resolve every hit.

## Step 4 — Design adaptation

Do not hardcode colors or fonts. Instead, update the design tokens in `src/styles/globals.css` (CSS custom properties) and `tailwind.config.js` to reflect my brand:
- Derive a palette from my stated preferences. If I gave a mood rather than hex values, propose 5 colors (background, surface, primary text, secondary text, accent) and ask me to confirm before applying.
- Update the font pairing if I want something different from Space Grotesk + Inter + JetBrains Mono.
- Keep the brutalist grid and spacing system unless I explicitly ask to change it.

## Step 5 — Supabase + Vercel setup

Update `.env.example` with placeholders for my own Supabase project. Remind me to:
1. Create a free project at supabase.com.
2. In the SQL editor, run `supabase/schema.sql`, `supabase/contact-requests.sql`, and `supabase/storage-policies.sql`.
3. Put the **publishable/anon** key (never a secret key) in `VITE_SUPABASE_ANON_KEY`, and the service-role key in `SUPABASE_SERVICE_ROLE_KEY` (server-only).
4. Set the env vars in `.env` and in Vercel. For the contact form, add `RESEND_API_KEY` (from resend.com) in Vercel.
5. Verify lockdown by running `supabase/diagnose.sql`.

## Step 6 — Iterative review

After each major pass (content, identity, design, Supabase):
1. Run `pnpm build` and confirm it's clean.
2. Start `pnpm dev` and screenshot the home page, case studies hub, one case study detail, the resume page, and the blog hub.
3. Report what changed, what still looks off, and what needs my input.
4. Wait for my feedback before continuing.

## Step 7 — Final verification

Before declaring done:
- `pnpm build` and `pnpm lint` — zero new errors.
- Click through every route: `/`, `/case-studies`, `/case-studies/:slug`, `/blog`, `/blog/:slug`, `/resume`, `/contact`, `/about`. No broken links, no 404s, no placeholder content.
- `grep -rniE "\+?\d[\d ()-]{7,}" src/` — no phone numbers.
- Every email in the repo is mine.
- Social links in Header and Footer resolve to my actual profiles (sourced from `resumeData.contact`).
- The resume gate works: visiting `/resume` without having signed up shows the form, not the resume.
- No secret keys are VITE_-prefixed (grep for `VITE_.*SERVICE` / `VITE_.*sb_secret`).
- `pnpm build` output is under 500 KB gzipped for the main JS chunk (warn me if not).

Start now by asking me for the inputs in Step 1.
````
