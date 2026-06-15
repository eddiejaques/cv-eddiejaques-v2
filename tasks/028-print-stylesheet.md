---
id: 028
title: Print stylesheet (print.css)
status: completed
complexity: M
depends_on: [027, 024]
next: 029
---

## Context
PRD §6.5 and §3.2.6 specify print optimization, primarily for the Resume page (Cmd+P → PDF as the export mechanism, PRD §6.5) but also applying to case study pages (PRD §3.2.3 "Print Style").

## Work
- Create `src/styles/print.css` implementing the `@media print` rules from PRD §6.5:
  - Hide `header`, `footer`, `nav`, `.cta-button` / any element marked `print:hidden`.
  - Page margins: 0.75in all sides.
  - `section { page-break-inside: avoid; }`.
  - Force all backgrounds to white, all text to `#0D0E10`.
  - Links rendered as plain text (no underline, ink color).
- Resume-specific: single-column layout, slightly reduced font sizes to fit A4 (PRD §3.2.6 Print Optimization).
- Case study-specific (PRD §3.2.3): Key Metrics section becomes a simple table in print; images scale to page width; avoid awkward mid-element page breaks.
- Import `print.css` in `main.tsx` (or via `globals.css`).

## Acceptance Criteria
- Print preview (Cmd+P) of `/resume` shows: no header/footer/nav, single column, correct margins, no background colors, plain-text links.
- Print preview of a `/case-studies/:slug` page shows the Key Metrics section as a table and no broken mid-section page breaks.
