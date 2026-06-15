---
id: 009
title: Card component
status: completed
complexity: S
depends_on: [002, 003, 004]
next: 010
---

## Context
PRD §4.3 defines the base Card component used as the foundation for `CaseStudyCard` and any other surfaced content blocks.

## Work
- Create `src/components/Card.tsx`: white background, 1px border `rgba(13,14,16,0.08)`, `border-radius: 8px`, padding 32px (prop for "compact" 24px variant), `box-shadow: 0 1px 3px rgba(0,0,0,0.05)`, hover shadow `0 8px 16px rgba(0,0,0,0.1)`, `transition: all 0.3s ease`.
- Accept `children` and optional `className` passthrough for composition.

## Acceptance Criteria
- Default and compact padding variants both render correctly.
- Hover increases shadow depth as specified, verified visually.
