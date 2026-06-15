---
id: 029
title: About page
status: completed
complexity: S
depends_on: [019]
next: 030
---

## Context
PRD §3.2.7 specifies a brief bio page: hero/intro, key stats, "what I care about", "currently", and contact links.

## Work
- Build out `src/pages/About.tsx` (replacing stub from task 006):
  - Hero: "About" or "Who I Am" title, 2-3 paragraph bio (Inter 400 16px) — source bio text from `resumeData.summary` (task 018) if sufficient, otherwise write placeholder copy flagged `<!-- TODO -->`.
  - Key stats: 3-4 callouts using `Metrics` `banner` variant (task 010) — e.g. "14+ Years in Product", "8+ Teams Led", "$1M+ in Measurable Impact" (reuse homepage metrics where applicable).
  - "What I Care About": bullet list of principles (PRD §3.2.7 example copy as placeholder).
  - "Currently": short paragraph on current focus + open-to (Director roles in DACH, India, Singapore, UAE per PRD §1.2).
  - "Say Hello": email/LinkedIn/GitHub links (reuse `Footer`'s link styling).

## Acceptance Criteria
- `/about` renders all five sections with correct typography and reuses `Metrics`/link styling components rather than duplicating styles.
