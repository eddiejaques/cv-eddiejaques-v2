---
id: 003
title: Design tokens (CSS variables)
status: completed
complexity: S
depends_on: [001]
next: 004
---

## Context
PRD §11 defines the canonical CSS custom properties (colors, spacing, typography scale, borders, shadows, z-index). PRD §2.1 defines the minimalistic monochrome palette with a single orange accent (`#FF5A00`). These tokens must exist before any component styling begins, and should be wired into Tailwind so utilities like `bg-accent` or `text-muted` are available.

## Work
- Add the full `:root { ... }` block from PRD §11 to `src/styles/globals.css`.
- Extend `tailwind.config.js` `theme.extend.colors` / `spacing` / `fontFamily` to reference these CSS variables (e.g. `colors: { accent: 'var(--color-accent)', ink: 'var(--color-ink)', muted: 'var(--color-muted)', faint: 'var(--color-faint)', bgPrimary: 'var(--bg-primary)', surface: 'var(--bg-surface)' }`).
- Map spacing scale (`--space-xs` through `--space-2xl`) and font sizes (`--text-xs` through `--text-6xl`) into Tailwind theme so they're usable as `p-md`, `text-4xl`, etc.

## Acceptance Criteria
- `var(--color-accent)` resolves to `#FF5A00` in browser devtools on `:root`.
- A component using `className="text-accent bg-surface"` renders with the correct PRD colors.
