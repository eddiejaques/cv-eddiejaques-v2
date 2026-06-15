---
id: 027
title: "Resume page (screen layout)"
status: completed
complexity: M
depends_on: [018, 019]
next: 028
---

## Context
PRD §3.2.6 specifies the resume page layout for screen: header/contact, executive summary, core competencies, experience timeline, education, skills, certifications. Print-specific styling is handled separately in task 028.

## Work
- Build out `src/pages/Resume.tsx` (replacing stub from task 006), sourcing all content from `resumeData` (task 018):
  - Header: name (Space Grotesk 700 32px), title (Space Grotesk 600 18px), contact line (Inter 400 12px: location | phone | email, then LinkedIn/GitHub links).
  - Executive summary (Inter 400 15px muted).
  - Core competencies: inline, Inter 500 13px, grouped by category.
  - Professional experience timeline: for each entry — org/role (Space Grotesk 600 18px), dates (JetBrains Mono 12px muted), location (Inter 400 13px), bullets (Inter 400 14px, 1.55 line-height, em-dash style).
  - Education: school (Space Grotesk 600 16px), degree/field (Inter 400 14px), grad date (JetBrains Mono 12px).
  - Skills: categorized, category label in JetBrains Mono orange, skills comma-separated Inter 400 13px.
  - Certifications (if present): name | issuer | date.
  - Include a "Download PDF" button (`Button` component, secondary variant) — can link to a static PDF placeholder for now.

## Acceptance Criteria
- `/resume` renders all sections from `resumeData` with correct typography per PRD §3.2.6.
- Experience entries display in reverse-chronological order.
- Page is readable and well-spaced at desktop and mobile widths.
