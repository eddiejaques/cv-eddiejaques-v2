---
id: 013
title: CaseStudyCard component
status: pending
complexity: M
depends_on: [005, 009, 010]
next: 014
---

## Context
PRD §3.2.2 and §4.3 specify the case study card anatomy, including the category+stage tag and the hover-revealed Before/After metric (updated in the minimalism revision — metric now reveals *within* the card, not in an adjacent empty cell).

## Work
- Create `src/components/CaseStudyCard.tsx` accepting a `CaseStudy` object (from `src/types/CaseStudy.ts`).
- Built on top of `Card` (task 009):
  - Category + stage tag row: JetBrains Mono 11px, all-caps, orange, e.g. `"AI PRODUCTS · JOYN"`, margin-bottom 12px.
  - Title: Space Grotesk 600 22px, margin-bottom 8px.
  - Description: Inter 400 15px muted, `line-clamp: 3`, margin-bottom 16px.
  - "Read full case" link: Inter 600 14px orange, links to `/case-studies/${slug}`.
  - On hover (desktop) / always-visible (mobile, via Tailwind responsive classes): render the first `keyMetrics` entry using `Metrics` (task 010) `inline` variant, with fade+slide-in transition.
  - Card hover also: border color → orange, subtle shadow increase (inherits from `Card` hover, but border-color override needed here).

## Acceptance Criteria
- Rendering with a sample `CaseStudy` object shows title, category/stage tag, truncated description, and CTA link.
- On desktop hover, the inline metric fades in; on viewport <760px, it is visible by default without hover.
- Clicking the card or "Read full case" navigates to `/case-studies/:slug`.
