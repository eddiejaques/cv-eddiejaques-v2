# eddiejaques.me — Brutalist, Metrics-First Portfolio

Live demo: [cv-eddiejaques-v2.vercel.app](https://cv-eddiejaques-v2.vercel.app)

A Director of Data & AI Products portfolio site with a brutalist aesthetic and metrics-first design. Case studies, blog, and a gated resume.

## Tech Stack

- **React 18 + TypeScript** — component framework
- **Redux Toolkit** — case study filters, blog search, UI state
- **React Router v6** — client-side routing
- **Tailwind CSS + CSS Modules** — design tokens, utility styling
- **Vite + pnpm** — build tooling
- **Supabase** — resume lead-capture gate (Postgres + anon insert)

## Local Dev

```bash
pnpm install
pnpm dev      # dev server with HMR at localhost:5173
pnpm build    # production build to dist/
pnpm lint     # ESLint
```

**Required env vars** — copy `.env.example` to `.env.local` and fill in:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The same vars must be set in your Vercel project settings.

## Project Structure

```
src/
  components/   — Header, Footer, Button, Card, Metrics, CaseStudyCard, ...
  pages/        — Home, CaseStudiesHub, CaseStudyDetail, BlogHub, BlogPostDetail, Resume, About
  store/        — Redux slices (caseStudies, blog, ui) + selectors
  data/         — Static content: resume.ts, caseStudies.ts, blogPosts/, case-studies/*.html
  types/        — CaseStudy, BlogPost, Resume interfaces
  styles/       — globals.css (design tokens), fonts.css, print.css
  utils/        — slugify.ts, dateFormat.ts, analytics.ts
  lib/          — supabaseClient.ts
supabase/
  schema.sql    — resume_leads table + RLS policy
```

## Content Model

**Case studies** — entries in `src/data/caseStudies.ts` (type `CaseStudy`), with HTML body files at `src/data/case-studies/*.html`. Add a new case study by appending to `caseStudies.ts` and dropping the HTML file in.

**Blog posts** — Markdown files with YAML frontmatter at `src/data/blogPosts/*.md`. Metadata is registered in `src/data/blogPosts.ts`.

**Resume** — single source of truth at `src/data/resume.ts` (type `Resume`). All pages and components import from here — no hardcoded contact details elsewhere.

## Deploy

Hosted on Vercel. `vercel.json` rewrites all paths to `index.html` for SPA routing. Push to `main` triggers a production deploy.

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

For each case study, create:
- A `CaseStudy` entry in `src/data/caseStudies.ts` (id, slug, title, category, org, experienceStage, summary, keyMetrics [{label, value}], tags, contentPath).
- An HTML body file at `src/data/case-studies/<slug>.html` with the full narrative.

For any blog posts or written pieces I have, create `src/data/blogPosts/*.md` with YAML frontmatter (title, date, tags, excerpt) and register them in `src/data/blogPosts.ts`.

## Step 3 — Identity replacement

Replace ALL of the following with my details (single source of truth — no hardcoding in components):
- Name, title, summary, email, LinkedIn, GitHub everywhere in `src/data/resume.ts`.
- SEO metadata: `<title>` in `index.html`, `description` and `og:*` tags, sitemap base URL in `public/sitemap.xml`.
- Footer copyright name.
- Any leftover original-owner content (grep for "Gaurav", "eddiejaques", "dani", old email addresses, phone numbers).

Run `grep -rni "gaurav\|eddiejaques\|dani" src/ public/ index.html` and resolve every hit.

## Step 4 — Design adaptation

Do not hardcode colors or fonts. Instead, update the design tokens in `src/styles/globals.css` (CSS custom properties) and `tailwind.config.js` to reflect my brand:
- Derive a palette from my stated preferences. If I gave a mood rather than hex values, propose 5 colors (background, surface, primary text, secondary text, accent) and ask me to confirm before applying.
- Update the font pairing if I want something different from Space Grotesk + Inter + JetBrains Mono.
- Keep the brutalist grid and spacing system unless I explicitly ask to change it.

## Step 5 — Supabase re-pointing

Update `.env.example` with placeholders for my own Supabase project. Remind me to:
1. Create a free project at supabase.com.
2. Run `supabase/schema.sql` in the SQL editor to create the `resume_leads` table with RLS.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` and in my Vercel project settings.

## Step 6 — Iterative review

After each major pass (content, identity, design, Supabase):
1. Run `pnpm build` and confirm it's clean.
2. Start `pnpm dev` and screenshot the home page, case studies hub, one case study detail, the resume page, and the blog hub.
3. Report what changed, what still looks off, and what needs my input.
4. Wait for my feedback before continuing.

## Step 7 — Final verification

Before declaring done:
- `pnpm build` and `pnpm lint` — zero new errors.
- Click through every route: `/`, `/case-studies`, `/case-studies/:slug`, `/blog`, `/blog/:slug`, `/resume`, `/about`. No broken links, no 404s, no placeholder content.
- `grep -rniE "\+?\d[\d ()-]{7,}" src/` — no phone numbers.
- Every email in the repo is mine.
- Social links in Header and Footer resolve to my actual profiles (sourced from `resumeData.contact`).
- The resume gate works: visiting `/resume` without having signed up shows the form, not the resume.
- `pnpm build` output is under 500 KB gzipped for the main JS chunk (warn me if not).

Start now by asking me for the inputs in Step 1.
````
