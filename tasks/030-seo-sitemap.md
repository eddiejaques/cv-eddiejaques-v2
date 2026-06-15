---
id: 030
title: SEO meta tags + sitemap.xml
status: completed
complexity: M
depends_on: [022, 024, 025, 026, 027, 029]
next: 031
---

## Context
PRD §9.2 specifies per-page meta tags, structured data (JSON-LD), sitemap, robots.txt, and Open Graph optimization for social shares. This is the final content-completeness gate before deploy.

## Work
- Install `react-helmet-async` (or similar) for per-route `<title>`/meta management.
- For each page (Home, CaseStudiesHub, CaseStudyDetail, BlogHub, BlogPostDetail, Resume, About): set `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, `og:url`.
- Add JSON-LD structured data: `Person` schema on Home, `BlogPosting` schema on `BlogPostDetail`, `CreativeWork` schema on `CaseStudyDetail`.
- Generate `public/sitemap.xml` listing all static routes plus dynamic `/case-studies/:slug` and `/blog/:slug` entries (a small build script reading `caseStudies.ts`/blog posts is fine).
- Create `public/robots.txt` allowing all crawlers and pointing to the sitemap.
- Create/confirm `public/images/og-image.png` exists (placeholder acceptable).

## Acceptance Criteria
- View-source on each route shows correct `<title>` and meta description.
- `sitemap.xml` contains an entry for every static page and every case study/blog slug.
- `robots.txt` is accessible and references the sitemap.
