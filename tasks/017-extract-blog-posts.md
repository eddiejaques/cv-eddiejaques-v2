---
id: 017
title: Extract blog posts into markdown + loader
status: completed
complexity: M
depends_on: [005]
next: 018
---

## Context
PRD §7.2 specifies blog posts as Markdown files with YAML frontmatter in `src/data/blogPosts/`, parsed at build time into `BlogPost` objects. PRD Appendix B lists 5 planned posts (2-3 needed for MVP per the roadmap, §10).

## Work
- Create `src/data/blogPosts/` directory.
- Write 2-3 initial posts as `.md` files with frontmatter matching PRD §7.2 example (`id`, `slug`, `title`, `description`, `publishedDate`, `tags`, `featured`), choosing from Appendix B's content calendar (e.g. "Director vs. PM", "Why Your Data Pipeline Is Broken"). Content can be a few paragraphs — real writing is out of scope for this task; placeholder-but-coherent text is acceptable, flagged with a `<!-- TODO: expand -->` comment.
- Install `gray-matter` (frontmatter parsing) and a markdown renderer (`react-markdown` or `marked`).
- Create `src/utils/loadBlogPosts.ts`: a build-time/runtime loader using Vite's `import.meta.glob` to read all `.md` files in `src/data/blogPosts/`, parse frontmatter with `gray-matter`, and return `BlogPost[]`.

## Acceptance Criteria
- `loadBlogPosts()` returns an array of `BlogPost` objects matching `src/types/BlogPost.ts`, one per `.md` file, with `content` containing the markdown body.
- At least 2 posts exist with distinct `tags` and `publishedDate` values (for testing sort/filter in task 015's selectors).
