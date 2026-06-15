---
id: 018
title: Extract resume data into resume.ts (from cv.md)
status: completed
complexity: M
depends_on: [005]
next: 019
---

## Context
Per `CLAUDE.md`, `~/Documents/career-ops/cv.md` is the canonical CV content. PRD §3.2.6 defines the Resume page sections: header/contact, executive summary, core competencies, professional experience (timeline), education, skills (categorical), certifications.

## Work
- Read `~/Documents/career-ops/cv.md` and map its content into the `Resume` interface (task 005):
  - Contact: name, title, location ("Munich, Germany"), phone, email, LinkedIn/GitHub links — per PRD §3.2.6 example.
  - Executive summary: 1-2 sentences.
  - Core competencies: flat list grouped by category for inline display.
  - Experience: array of `{ organization, role, dates, location, bullets[] }`, each bullet leading with a metric/outcome, em-dash style, max 2 sentences (PRD §3.2.6 point 4).
  - Education: array of `{ school, degree, gradDate }`.
  - Skills: categorized (Product Strategy | AI & ML | Analytics | Ad-Tech | Privacy & Compliance per PRD example), comma-separated values per category.
  - Certifications: array of `{ name, issuer, date }` if present in cv.md.
- Create `src/data/resume.ts` exporting a single `resumeData: Resume` object.

## Acceptance Criteria
- `resumeData` conforms to `src/types/Resume.ts` with no missing required fields.
- Experience entries are in reverse-chronological order.
- `tsc --noEmit` passes.
