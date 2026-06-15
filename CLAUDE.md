# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This repo currently contains only `prd.md` — the full Product Requirements Document for **eddiejaques.me**, a brutalist, metrics-first portfolio site for a Director of Data & AI Products. The codebase has not been scaffolded yet. `prd.md` is the source of truth for design, architecture, and content decisions — read it before building anything.

## Tech Stack (per PRD §5.1)

- React 18+ with TypeScript
- Redux Toolkit for state (case study filters, blog search, UI/nav state)
- React Router v6 (routes for `/`, `/case-studies`, `/case-studies/:slug`, `/blog`, `/blog/:slug`, `/resume`, `/about`)
- Tailwind CSS + CSS Modules
- Vite + pnpm

## Commands

Once scaffolded with Vite (`pnpm create vite`), standard commands apply:
- `pnpm install` — install deps
- `pnpm dev` — dev server with HMR
- `pnpm build` — production build
- `pnpm lint` — lint
- `pnpm test` — run tests (no test runner chosen yet; tests live under `tests/components` and `tests/pages`)

## Architecture (per PRD §5.2–5.3)

Planned structure:
- `src/components/` — shared UI (Header, Card, Button, Metrics, CaseStudyCard, BlogPostItem, Footer)
- `src/pages/` — route-level pages (Home, CaseStudiesHub, CaseStudyDetail, BlogHub, BlogPostDetail, Resume, About, NotFound)
- `src/store/` — Redux: `slices/` (caseStudiesSlice, blogSlice, uiSlice) and `selectors/`
- `src/data/` — static content: `caseStudies.ts`, `blogPosts.ts` (parsed from markdown w/ frontmatter), `resume.ts`
- `src/types/` — `CaseStudy`, `BlogPost`, `Resume` interfaces (defined in PRD §5.3)
- `src/styles/` — `globals.css` (design tokens), `tailwind.config.js`, `fonts.css`, `print.css`
- `src/utils/` — `slugify.ts`, `dateFormat.ts`, `analytics.ts`

Case studies and blog posts are static data — no backend/CMS for MVP. New case studies are added by appending to `caseStudies.ts`; blog posts are markdown files with YAML frontmatter under `src/data/blogPosts/`.

## Content Sources (outside this repo)

- **Resume/CV data**: `~/Documents/career-ops/cv.md` — canonical CV content, source for `src/data/resume.ts` (PRD §3.2.6, §5.3 Resume type).
- **Case study content**: `~/Documents/case-study-generator/Output/*.html` — pre-generated HTML case studies (Joyn CDP, Joyn Recommendation Platform, Joyn Search & Product Discovery, Optum/Vodafone CRO and data work, Hightouch, Mixpanel/Databricks, Segment CDP, etc.). These are the raw content to convert into `CaseStudy` entries (`src/data/caseStudies.ts`) and per-case-study pages — extract title, category, org, key metrics, description, and body content from each HTML file per the `CaseStudy` type in PRD §5.3.

## Design System (critical — see PRD §2 and §11 for full spec)

- **Palette**: Alabaster `#FAF9F6` (bg), white `#FFFFFF` (surfaces), Inkwell `#0D0E10` (primary text), Granite `#48494B` (secondary text), Fog `#A8A8A8` (tertiary), International Orange-Red `#FF5A00` (single accent — used for CTAs, hovers, metrics, focus states). Border: `rgba(13,14,16,0.08)`.
- **Fonts**: Space Grotesk (headlines, 600/700, tight tracking -0.02em), Inter (body/UI, 400-600, 1.5-1.6 line height), JetBrains Mono (metrics/timestamps/code, +0.01em tracking).
- **Spacing**: 8px base unit; all spacing is a multiple of 8.
- **Signature layout**: "Chess-board" 3-column case study grid with `grid-auto-flow: dense` and `nth-child(3n+1/2/3)` diagonal column shifts (PRD §6.1 has the CSS). Hover on a card fades in a Before/After metric in the adjacent empty diagonal cell (orange left-border accent, slide+fade). Collapses to 2-col (tablet ≤1024px) and 1-col with inline metrics (mobile <760px).
- Use the CSS variables in PRD §11 as the canonical design tokens — wire these into `tailwind.config.js` / `globals.css` rather than hardcoding values.

## Key Constraints

- **Light theme only** for MVP — no dark mode.
- **Print optimization matters**: Resume and case study/blog pages must survive `@media print` (single column, no nav/CTAs, backgrounds removed, page-break-inside: avoid on sections). See PRD §3.2.6 and §6.5.
- **Accessibility**: WCAG 2.1 AA — semantic HTML5, 4.5:1 contrast, visible focus states, alt text, full keyboard nav.
- **Performance**: Lighthouse 90+, homepage bundle <150KB gzipped.
- Client-side search/filter only (Redux selectors) — no backend needed at MVP scale (~20-30 items).
