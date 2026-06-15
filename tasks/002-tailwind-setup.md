---
id: 002
title: Install & configure Tailwind CSS
status: completed
complexity: S
depends_on: [001]
next: 003
---

## Context
PRD §5.1 specifies Tailwind CSS + CSS Modules for styling. Tailwind needs to be installed and wired into the Vite build before any components are built.

## Work
- Install `tailwindcss`, `postcss`, `autoprefixer` as dev deps.
- Generate `tailwind.config.js` and `postcss.config.js`.
- Add Tailwind directives (`@tailwind base/components/utilities`) to `src/styles/globals.css`.
- Import `globals.css` in `src/main.tsx`.
- Set `content` paths in `tailwind.config.js` to cover `./index.html` and `./src/**/*.{ts,tsx}`.

## Acceptance Criteria
- A Tailwind utility class (e.g. `text-center`) applied to an element in `App.tsx` visibly takes effect in `pnpm dev`.
- `pnpm build` succeeds.
