---
id: 010
title: Metrics block component
status: completed
complexity: S
depends_on: [002, 003, 004]
next: 011
---

## Context
The "Metric Block" appears in three places: the homepage metric banner (PRD §3.2.1), the Key Metrics callout on case study detail pages (PRD §3.2.3, §4.5), and the hover Before/After metric inside case study cards (PRD §2.4, §3.2.2). This task builds one reusable component covering all three.

## Work
- Create `src/components/Metrics.tsx` accepting `metrics: { label: string; value: string }[]` and a `variant: 'banner' | 'callout' | 'inline'`.
  - `banner`: CSS grid, N equal columns, center-aligned, value = Space Grotesk 700 36px ink, label = JetBrains Mono 12px orange (uppercase), 1px separator between columns (PRD §3.2.1, §4.5).
  - `callout`: same as banner but value color = orange, label = Inter 500 14px muted, used in case study detail "Key Metrics" section (2-3 columns).
  - `inline`: single before/after metric with light orange wash background, 3px left border orange, JetBrains Mono 11px label, Space Grotesk 700 24px value — used for the card hover reveal (PRD §2.4/§3.2.2). Include `opacity`/`transform` transition classes for the fade+slide-in.

## Acceptance Criteria
- Each variant renders correctly with sample data (e.g. banner: `[{label:'COST AVOIDED', value:'$1M+'}, ...]`; inline: `{label:'CTR', value:'5% → 25%'}`).
- `inline` variant has a CSS transition that can be toggled via a class/prop for fade-in.
