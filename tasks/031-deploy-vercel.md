---
id: 031
title: Deploy to Vercel
status: pending
complexity: S
depends_on: [030]
next: null
---

## Context
PRD §8 specifies Vercel hosting, custom domain `eddiejaques.me`, production-only environment, auto-deploy on push to `main`.

## Work
- Confirm `pnpm build` produces a clean `dist/` with no errors/warnings.
- Push the repo to GitHub (if not already) and connect it to a new Vercel project.
- Configure Vercel build settings: framework preset Vite, build command `pnpm build`, output directory `dist`, install command `pnpm install`.
- Add the custom domain `eddiejaques.me` in Vercel project settings and verify HTTPS is auto-provisioned.
- Verify auto-deploy triggers on push to `main`.
- Run a Lighthouse audit on the deployed homepage and confirm scores ≥90 across Performance/Accessibility/Best Practices/SEO (PRD §8.3); note any gaps for follow-up.

## Acceptance Criteria
- `eddiejaques.me` resolves to the deployed site over HTTPS.
- A test commit to `main` triggers a new deployment automatically.
- Lighthouse score ≥90 on homepage (or a documented list of follow-up items if not).
