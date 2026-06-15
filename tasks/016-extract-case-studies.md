---
id: 016
title: Extract case studies into caseStudies.ts
status: completed
complexity: L
depends_on: [005]
next: 017
---

## Context
Per `CLAUDE.md`, the raw case study content lives as pre-generated HTML at `~/Documents/case-study-generator/Output/*.html` (e.g. `joyn-cdp-case-study.html`, `cro-optum-2-case-study.html`, `data-enablement-vodafone-case-study.html`, etc. — ~18 files). These need to become `CaseStudy` entries conforming to the type in `src/types/CaseStudy.ts` (task 005), including the new `experienceStage` field.

## Work
- For each HTML file in `~/Documents/case-study-generator/Output/`, extract: title, a 2-3 sentence description/teaser, 2-4 key metrics (label+value pairs), organization, publish date (or reasonable placeholder if absent), and estimated read time (word count / 200).
- Assign `category` (`'AI' | 'Data Platforms' | 'Marketing Tech' | 'Growth'`) and `experienceStage` (`'Joyn' | 'Optum' | 'Vodafone' | 'Earlier Roles'`) per case study based on its organization/content (e.g. `joyn-*` → Joyn; `cro-optum-*`, `data-enablement-optum-*`, `customer-data-platform-adobe-experience-cloud-optum-*`, `data-strategy-optum-store-*` → Optum; `cro-vodafone-*`, `data-enablement-vodafone-*` → Vodafone; remaining — `hightouch-*`, `mixpanel-*`, `project-plan-*`, `marketing-data-maturity-*`, `marketing-tech-implementation-*`, `taming-the-data-pipeline-*`, `zero-dollar-telemetry-*`, `customer-relationship-management-braze-*`, `cro-pinupgirlprotein-*`, `cro-thrifitfy-*` → Earlier Roles, unless content indicates otherwise).
- Copy each source HTML's body content into `src/data/case-studies/<slug>.html` (or convert to markdown — pick one format and note it in `contentPath`), referenced via `contentPath`.
- Create `src/data/caseStudies.ts` exporting `caseStudies: CaseStudy[]` — one entry per case study, slugified from filename (strip `-case-study` suffix).

## Acceptance Criteria
- `caseStudies.ts` exports an array of ~18 valid `CaseStudy` objects, each with all required fields populated (no empty strings) and `category`/`experienceStage` assigned per the mapping above.
- Every `contentPath` resolves to an existing file under `src/data/case-studies/`.
- `tsc --noEmit` passes.
