---
id: 019
title: "Homepage: hero + metric banner"
status: completed
complexity: M
depends_on: [008, 011, 012]
next: 020
---

## Context
PRD §3.2.1 describes the homepage hero: full-viewport-height intro with headline, subheadline, and a 3-column metric banner. This is the visitor's first impression and must read as a simple, confident profile statement (per the minimalism revision in PRD §1.1).

## Work
- Build out `src/pages/Home.tsx` (replacing the stub from task 006):
  - Hero section: `100vh`, `--bg-primary` background, vertical flex centered.
  - Headline: Space Grotesk 700, 52-64px (responsive via `clamp()` or Tailwind responsive classes): "Director of Data & AI Products / Who Ships, Leads, and Proves It Works".
  - Subheadline: Inter 400 18px muted, max-width 70ch: the 3-line copy from PRD §3.2.1.
  - Metric banner using `Metrics` component (task 010, `banner` variant) with the 3 example metrics from PRD §3.2.1 (COST AVOIDED $1M+, CTR IMPROVEMENT >200%, TEAMS LED 8+) — sourced from `resumeData` (task 018) where possible, else hardcoded placeholders.
- Responsive: desktop 3-col metrics; mobile metrics stack vertically (PRD §3.2.1 Responsive Behavior).

## Acceptance Criteria
- `/` renders hero with headline, subheadline, and 3-metric banner matching PRD typography/spacing.
- At <760px, metric banner stacks to a single column.
