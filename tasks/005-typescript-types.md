---
id: 005
title: TypeScript types (CaseStudy, BlogPost, Resume)
status: completed
complexity: S
depends_on: [001]
next: 006
---

## Context
PRD §5.3 defines `CaseStudy` and `BlogPost` interfaces; §3.2.6 describes the Resume page content shape (header/contact, summary, competencies, experience timeline, education, skills, certifications). These types are the contract used by data files, Redux slices, and components throughout.

## Work
- Create `src/types/CaseStudy.ts` with the `CaseStudy` interface from PRD §5.3, including the `experienceStage: 'Joyn' | 'Optum' | 'Vodafone' | 'Earlier Roles'` field added during the PRD update.
- Create `src/types/BlogPost.ts` with the `BlogPost` interface from PRD §5.3.
- Create `src/types/Resume.ts` with a `Resume` interface covering: contact info, executive summary, core competencies (string[]), experience entries (org, role, dates, location, bullets[]), education entries, skill categories, certifications.

## Acceptance Criteria
- All three type files compile under `tsc --noEmit`.
- `CaseStudy.category` and `CaseStudy.experienceStage` are typed as the literal unions from the PRD (not bare `string`).
