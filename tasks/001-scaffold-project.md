---
id: 001
title: Scaffold Vite + React + TS project
status: completed
complexity: S
depends_on: []
next: 002
---

## Context
Repo currently contains only `prd.md` and `CLAUDE.md`. Per PRD §5.1/5.2, the project uses React 18+, TypeScript, Vite, pnpm. This task creates the base scaffold that everything else builds on.

## Work
- Run `pnpm create vite@latest . -- --template react-ts` in the repo root (or a subfolder if the user prefers `eddiejaques.me/` as project root per PRD §5.2 — confirm with user if ambiguous).
- Install deps with `pnpm install`.
- Verify `pnpm dev` runs and serves the default Vite page.
- Create empty directories matching PRD §5.2: `src/components`, `src/pages`, `src/store/slices`, `src/store/selectors`, `src/data`, `src/styles`, `src/utils`, `src/types`, `tests/components`, `tests/pages`, `public/case-studies`, `public/images`.

## Acceptance Criteria
- `pnpm dev` starts a working dev server.
- `pnpm build` succeeds with no errors.
- Directory structure matches PRD §5.2.
