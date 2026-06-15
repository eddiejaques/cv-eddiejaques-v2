# Task Index — eddiejaques.me MVP

Source: `../prd.md`. Work tasks in order, respecting `depends_on`. After finishing a task, set its `status` to `completed` in its file AND update the table row below. Then move to the next task with all dependencies completed.

**Complexity scale:** S = <1hr, M = 1-3hrs, L = half day+

| # | Task | Complexity | Depends On | Status |
|---|------|-----------|------------|--------|
| 001 | Scaffold Vite + React + TS project | S | - | completed |
| 002 | Install & configure Tailwind CSS | S | 001 | completed |
| 003 | Design tokens (CSS variables) | S | 001 | completed |
| 004 | Font setup (Space Grotesk, Inter, JetBrains Mono) | S | 001 | completed |
| 005 | TypeScript types (CaseStudy, BlogPost, Resume) | S | 001 | completed |
| 006 | React Router skeleton + page stubs | S | 001 | completed |
| 007 | Redux store skeleton | S | 001 | completed |
| 008 | Button component | S | 002,003,004 | completed |
| 009 | Card component | S | 002,003,004 | completed |
| 010 | Metrics block component | S | 002,003,004 | completed |
| 011 | Header / Navigation component | M | 002,003,004,006 | completed |
| 012 | Footer component | S | 002,003,004 | completed |
| 013 | CaseStudyCard component | M | 005,009,010 | pending |
| 014 | caseStudiesSlice (Redux: items, category, stage, search) | M | 005,007 | completed |
| 015 | blogSlice (Redux: posts, tag, search) | M | 005,007 | completed |
| 016 | Extract case studies into caseStudies.ts | L | 005 | completed |
| 017 | Extract blog posts into markdown + loader | M | 005 | completed |
| 018 | Extract resume data into resume.ts (from cv.md) | M | 005 | completed |
| 019 | Homepage: hero + metric banner | M | 008,011,012 | completed |
| 020 | Homepage: Pick Your Poison CTA | S | 008,019 | completed |
| 021 | Homepage: Career Stages Strip | S | 016,019 | completed |
| 022 | Case Studies Hub: grid + cards | M | 013,014,016 | pending |
| 023 | Case Studies Hub: category + stage filters + search | M | 014,022 | pending |
| 024 | Case Study Detail page | M | 010,016,022 | pending |
| 025 | Blog Hub page | M | 015,017 | pending |
| 026 | Blog Post Detail page | M | 015,017,025 | pending |
| 027 | Resume page (screen layout) | M | 018,019 | pending |
| 028 | Print stylesheet (print.css) | M | 027,024 | pending |
| 029 | About page | S | 019 | pending |
| 030 | SEO meta tags + sitemap.xml | M | 022,024,025,026,027,029 | pending |
| 031 | Deploy to Vercel | S | 030 | pending |

**Next task:** 022 — Case Studies Hub: grid + cards
