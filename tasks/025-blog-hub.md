---
id: 025
title: Blog Hub page
status: completed
complexity: M
depends_on: [015, 017]
next: 026
---

## Context
PRD §3.2.4 specifies the blog hub: reverse-chronological list of posts with run-log timestamps, tags, and pagination/infinite scroll.

## Work
- Build out `src/pages/BlogHub.tsx` (replacing stub from task 006):
  - Header: "Run Logs" or "Blog" title (Space Grotesk 700 48px), subtitle (Inter 400 16px muted), optional search box.
  - On mount, dispatch `setPosts(loadBlogPosts())` (task 017) into `blogSlice` (task 015).
  - Render `selectSortedPosts('newest')` (filtered via `selectFilteredPosts` if search/tag active) as a list, max-width 720px: each item shows run-log timestamp ("[RUN-LOG // YYYY.MM.DD]", JetBrains Mono 11px orange), title (Space Grotesk 600 28px, links to `/blog/:slug`), excerpt (Inter 400 15px muted, 2-line clamp), tags (Inter 500 12px light gray), 1px separator below each item.
  - Show 10 posts initially with a "Load more" button (simple click-to-append is fine; infinite scroll optional).

## Acceptance Criteria
- `/blog` lists all posts from task 017 in reverse-chronological order with correct formatting.
- Clicking a post title navigates to `/blog/:slug`.
