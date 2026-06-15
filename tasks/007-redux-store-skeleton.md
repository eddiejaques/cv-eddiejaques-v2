---
id: 007
title: Redux store skeleton
status: completed
complexity: S
depends_on: [001]
next: 008
---

## Context
PRD §6.3 defines `RootState` shape with `caseStudies`, `blog`, and `ui` slices. This task sets up the Redux Toolkit store and provider wiring; the slices themselves with real reducers/data come later (tasks 014, 015).

## Work
- Install `@reduxjs/toolkit` and `react-redux`.
- Create `src/store/store.ts` configuring the store with three empty placeholder slices: `caseStudies`, `blog`, `ui` (each just `{ name, initialState: {}, reducers: {} }` for now).
- Wrap the app in `<Provider store={store}>` in `main.tsx`.
- Add typed hooks `useAppDispatch` / `useAppSelector` in `src/store/hooks.ts`.

## Acceptance Criteria
- App still renders with no console errors.
- `useAppSelector((s) => s.ui)` returns `{}` without TypeScript errors anywhere it's called.
