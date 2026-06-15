---
id: 008
title: Button component
status: completed
complexity: S
depends_on: [002, 003, 004]
next: 009
---

## Context
PRD §4.2 defines three button/link styles: Primary CTA (filled orange), Secondary CTA (orange outline), and Text Link. These are reused across Homepage CTAs, card "Read full case" links, and resume/print actions.

## Work
- Create `src/components/Button.tsx` accepting `variant: 'primary' | 'secondary' | 'text'`, plus standard button/link props (supports rendering as `<button>` or as a React Router `<Link>` via an `as`/`to` prop).
- Implement styles per PRD §4.2:
  - Primary: bg `--color-accent`, white text, `Inter 600 14px`, padding `14px 24px`, min-height 48px, `border-radius: 4px`, hover = brightness 0.9, active = brightness 0.8, `transition: background 0.2s ease`.
  - Secondary: transparent bg, 2px solid accent border, accent text, same padding/radius; hover = accent bg + white text.
  - Text: accent color, no decoration, hover = underline (2px, fade-in 0.2s).

## Acceptance Criteria
- All three variants render with correct colors/borders matching PRD §4.2.
- Hover states verified visually in `pnpm dev` (mouse over each variant).
- Component works both as a clickable `<button>` and as a `<Link to="/case-studies">`.
