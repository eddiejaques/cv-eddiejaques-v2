---
id: 004
title: Font setup (Space Grotesk, Inter, JetBrains Mono)
status: completed
complexity: S
depends_on: [001]
next: 005
---

## Context
PRD §2.2 requires three typefaces: Space Grotesk (display/headlines, 600/700), Inter (body/UI, 400-600), JetBrains Mono (metrics/code, 400-600). These map to `--font-display`, `--font-body`, `--font-mono` tokens from PRD §11.

## Work
- Create `src/styles/fonts.css` importing the three font families (via `@fontsource/*` packages or `@import` from Google Fonts — prefer self-hosted `@fontsource` packages for performance/offline builds).
- Install chosen font packages (e.g. `@fontsource/space-grotesk`, `@fontsource/inter`, `@fontsource/jetbrains-mono`) with the specific weights needed (Space Grotesk 600/700; Inter 400/500/600; JetBrains Mono 400/500/600).
- Import `fonts.css` in `main.tsx` (or `globals.css`).
- Set `body` default font to Inter, and configure Tailwind `fontFamily` theme (`display`, `body`, `mono`) referencing `--font-display` etc.

## Acceptance Criteria
- Devtools computed style on `<body>` shows Inter as the font-family.
- An element with `className="font-display font-bold"` renders in Space Grotesk 700.
- An element with `className="font-mono"` renders in JetBrains Mono.
