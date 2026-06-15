---
id: 020
title: "Homepage: Pick Your Poison CTA"
status: completed
complexity: S
depends_on: [008, 019]
next: 021
---

## Context
PRD §3.2.1 point 3 defines the dual CTA below the metric banner, plus an optional credibility callout row, plus a scroll indicator.

## Work
- Below the metric banner in `Home.tsx`, add:
  - Split CTA: two equal-width `Button` (task 008) components, side-by-side on desktop / stacked on mobile. Left: "Read a Stat" → `/case-studies`. Right: "Read a Thought" → `/blog`. Both use the secondary (outline) style by default, inverting to filled orange on hover per PRD §3.2.1.
  - Credibility callout row: three small Inter 14px muted-gray text items separated by `|`, per PRD §3.2.1 point 4 example copy.
  - Scroll indicator: small "Scroll for more" text + down arrow, Inter 12px fog gray, positioned below the CTA, hidden after scrolling past the hero (use a scroll listener or `IntersectionObserver` to toggle visibility).

## Acceptance Criteria
- Both CTA buttons navigate correctly and visually invert on hover.
- At <760px, CTAs stack full-width.
- Scroll indicator disappears once the user scrolls down.
