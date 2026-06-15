---
id: 026
title: Blog Post Detail page
status: completed
complexity: M
depends_on: [015, 017, 025]
next: 027
---

## Context
PRD §3.2.5 specifies the individual blog post page: same header pattern as case studies, full markdown content, end-of-article metadata, and prev/next navigation.

## Work
- Build out `src/pages/BlogPostDetail.tsx` (replacing stub from task 006):
  - Read `:slug` from `useParams`, find the matching post via `loadBlogPosts()` (task 017); render `NotFound` if missing.
  - Header: back link, run-log timestamp, title (Space Grotesk), metadata (publish date, estimated read time from word count).
  - Main content: max-width 720px, render markdown body (same typography rules as case study detail — task 024 — H2/H3, blockquotes, code blocks).
  - End-of-article metadata: author "Gaurav Kumar Dani", published date, clickable tags linking to `/blog?tag=<tag>`.
  - Footer nav: "← Previous Post" | "Next Post →" centered, based on the post's position in the sorted (newest-first) list.

## Acceptance Criteria
- `/blog/<valid-slug>` renders full post with correct metadata and content.
- Tag links navigate to `/blog?tag=<tag>` (filter wiring on the hub side is part of task 025's `selectFilteredPosts`, already supports `selectedTag`).
- Prev/Next links correctly skip past the array boundaries (disabled or hidden at the ends).
