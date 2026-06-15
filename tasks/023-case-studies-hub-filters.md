---
id: 023
title: "Case Studies Hub: category + stage filters + search"
status: completed
complexity: M
depends_on: [014, 022]
next: 024
---

## Context
PRD §3.2.2 (revised) adds two filter rows — category and experience-stage — plus search, on top of the grid built in task 022. The stage filter must also respond to the `?stage=` query param set by the homepage Career Stages Strip (task 021).

## Work
- Add to `CaseStudiesHub.tsx`:
  - Category filter row: "All" | "AI Products" | "Data Platforms" | "Marketing Tech" | "Growth" — clicking dispatches `setCategory` (task 014); active filter highlighted (orange text/underline).
  - Stage filter row: "All Stages" | "Joyn" | "Optum" | "Vodafone" | "Earlier Roles" — dispatches `setStage`.
  - Search box: Inter 400 16px, placeholder "Search case studies..." — dispatches `setSearchTerm` on change (debounced).
  - On mount, read `?stage=` from the URL (via `useSearchParams`) and dispatch `setStage` with it if present.
  - Replace the task-022 data source with `selectFilteredCaseStudies` + `selectSortedCaseStudies` (task 014) so the grid reflects active filters/search.

## Acceptance Criteria
- Selecting a category and/or stage filters the grid correctly (combinable).
- Typing in search narrows results by title/description/tags, case-insensitive.
- Visiting `/case-studies?stage=Joyn` pre-applies the Joyn stage filter on load.
- "Load More" pagination (task 022) still works against the filtered set.
