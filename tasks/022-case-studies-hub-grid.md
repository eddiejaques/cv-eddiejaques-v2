---
id: 022
title: "Case Studies Hub: grid + cards"
status: completed
complexity: M
depends_on: [013, 014, 016]
next: 023
---

## Context
PRD §3.2.2 (revised) describes a uniform 3-column card grid (no chess-board/diagonal pattern), with pagination/load-more. This task wires the page to real data without filters yet (filters come in task 023).

## Work
- Build out `src/pages/CaseStudiesHub.tsx` (replacing stub from task 006):
  - Header: "Case Studies" title (Space Grotesk 700 48px), subtitle (Inter 400 16px muted) per PRD §3.2.2.
  - On mount, dispatch `setItems(caseStudies)` from task 016's data into `caseStudiesSlice` (task 014).
  - Render `selectSortedCaseStudies('newest')` results in a CSS grid using `CaseStudyCard` (task 013): `grid-template-columns: repeat(3, 1fr)`, `gap: 24px`; 2-col at ≤1024px, 1-col at <760px (per PRD §6.1 CSS).
  - Pagination: show first 12 cards; "Load More" button (48px height, full-width responsive, Inter 600 14px) appends the next 12 on click.

## Acceptance Criteria
- `/case-studies` renders all case studies from `caseStudies.ts` in a responsive uniform grid, 12 at a time, with working "Load More".
- Grid collapses to 2 columns ≤1024px and 1 column <760px.
