---
id: 024
title: Case Study Detail page
status: completed
complexity: M
depends_on: [010, 016, 022]
next: 025
---

## Context
PRD §3.2.3 specifies the individual case study page: breadcrumb/back nav, hero, narrow content column (720px), key metrics callout, and bottom CTAs.

## Work
- Build out `src/pages/CaseStudyDetail.tsx` (replacing stub from task 006):
  - Read `:slug` from `useParams`, look up the matching entry in `caseStudies.ts` (task 016); render `NotFound` redirect if no match.
  - Top nav: "← Back to Case Studies" link (Inter 500 14px, orange on hover) + breadcrumb "Case Studies / [Title]".
  - Hero: category+stage tag (JetBrains Mono, orange), title (Space Grotesk 700 48px, max-width 60ch), subtitle/problem (Inter 400 18px muted, max-width 70ch), metadata row (publish date in JetBrains Mono 12px, read time, organization).
  - Main content: max-width 720px, render the markdown/HTML from `contentPath` (Inter 400 16px, 1.6 line-height; H2/H3/H4 in Space Grotesk; orange-bullet lists; orange-left-border blockquotes; dark code blocks per PRD §3.2.3).
  - Key Metrics section: `Metrics` component (task 010) `callout` variant, 2-3 columns, using `keyMetrics`.
  - Bottom: "Back to Case Studies" full-width button; "Read Next Case Study" link to the next item in the array (wrap to first at the end).

## Acceptance Criteria
- `/case-studies/<valid-slug>` renders full case study with correct hero, content, and metrics.
- `/case-studies/<invalid-slug>` renders the `NotFound` page.
- "Read Next Case Study" cycles through all case studies without dead ends.
