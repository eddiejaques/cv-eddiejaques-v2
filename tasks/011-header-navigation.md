---
id: 011
title: Header / Navigation component
status: completed
complexity: M
depends_on: [002, 003, 004, 006]
next: 012
---

## Context
PRD §4.1 specifies the fixed/sticky header with logo, nav links, and social links, plus a mobile slide-in panel. PRD §3.2.1 notes the header is part of the homepage content flow but applies site-wide.

## Work
- Create `src/components/Header.tsx`:
  - Desktop (≥760px): fixed/sticky, 72px height, flex `space-between`. Logo "eddiejaques" (Space Grotesk 700 18px, ink). Center nav links (Inter 500 14px): Home | Case Studies | Blog | Resume | About — orange underline on hover, orange text+underline when active (use `NavLink` from react-router for active state). Right-aligned social links (GitHub | LinkedIn | Email), same hover treatment, text-only no icons.
  - Mobile (<760px): hamburger icon (24x24, 3 lines) replaces nav; clicking opens a slide-in panel from the right (full or 80% width, bg `--bg-primary`, left border 2px solid orange), nav items stacked full-width with 20px padding, close (X) button top-right.
- Add `Header` to `App.tsx` so it renders on every route.

## Acceptance Criteria
- All 8 routes show the header with correct active-link styling.
- At <760px viewport, hamburger opens/closes the slide-in panel; nav links inside it navigate correctly and close the panel.
- Social links open in new tabs (`target="_blank" rel="noopener noreferrer"`) — use placeholder URLs for now.
