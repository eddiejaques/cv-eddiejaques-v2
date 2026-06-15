---
id: 021
title: "Homepage: Career Stages Strip"
status: completed
complexity: S
depends_on: [016, 019]
next: 022
---

## Context
Added during the PRD minimalism/experience-stage revision (PRD §3.2.1 point 5): a chronological entry point into case studies, distinct from the category-based "Pick Your Poison" split. Gives recruiters a way to browse Gaurav's work by career chapter (Joyn / Optum / Vodafone / Earlier Roles).

## Work
- Add a "Career Stages Strip" section to `Home.tsx`, after the credibility section: a horizontal row of text links/pills — one per distinct `experienceStage` value present in `caseStudies.ts` (task 016), in reverse-chronological order (Joyn first, then Optum, Vodafone, Earlier Roles).
- Each link routes to `/case-studies?stage=<stage>` (URL query param — case studies hub will read this in task 023).
- Styling: Inter 500 14px muted, orange on hover/active, minimal pill or underline — no heavy borders/icons, per PRD §3.2.1 point 5.

## Acceptance Criteria
- Strip renders one link per stage that actually exists in `caseStudies.ts` (don't hardcode stages that have zero case studies).
- Clicking a stage link navigates to `/case-studies?stage=<stage>` (functional once task 023 reads the param; for now just verify the URL is correct).
