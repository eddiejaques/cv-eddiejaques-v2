---
id: 012
title: Footer component
status: completed
complexity: S
depends_on: [002, 003, 004]
next: 013
---

## Context
PRD §5.2 lists `Footer.tsx` as a shared component but doesn't fully spec it. Keep it minimal and consistent with the minimalistic design language (PRD §1.1, §2.1): no extra visual weight, reinforces brand and contact links only.

## Work
- Create `src/components/Footer.tsx`: simple horizontal bar, `--bg-primary` background, top border `--color-border`, containing: copyright line ("© [year] Gaurav Kumar Dani"), and repeated social links (GitHub | LinkedIn | Email) styled like header nav links (Inter 500 14px, orange hover/underline).
- Add `<Footer />` to `App.tsx` below the route outlet so it appears on every page.
- Exclude footer from print output (handled fully in task 028, but add `className="print:hidden"` now as a placeholder).

## Acceptance Criteria
- Footer renders on all routes below page content.
- Footer is visually minimal — single row, no heavy borders/shadows, consistent with header link styling.
