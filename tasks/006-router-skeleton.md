---
id: 006
title: React Router skeleton + page stubs
status: completed
complexity: S
depends_on: [001]
next: 007
---

## Context
PRD §6.2 defines the route table. This task creates placeholder page components and wires up routing so every URL in the IA (PRD §3.1) resolves, before any real page content exists.

## Work
- Create stub components in `src/pages/`: `Home.tsx`, `CaseStudiesHub.tsx`, `CaseStudyDetail.tsx`, `BlogHub.tsx`, `BlogPostDetail.tsx`, `Resume.tsx`, `About.tsx`, `NotFound.tsx` — each rendering just a heading with the page name for now.
- Install `react-router-dom`.
- In `src/App.tsx`, configure the router exactly per PRD §6.2 (including `/case-studies/:slug` and `/blog/:slug` dynamic params, and `*` → `NotFound`).
- Render `<App />` from `main.tsx` wrapped in `<BrowserRouter>`.

## Acceptance Criteria
- Navigating to `/`, `/case-studies`, `/case-studies/anything`, `/blog`, `/blog/anything`, `/resume`, `/about`, and `/nonsense` each renders the correct stub page (the last one renders `NotFound`).
