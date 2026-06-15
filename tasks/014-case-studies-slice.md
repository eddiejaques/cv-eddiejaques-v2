---
id: 014
title: caseStudiesSlice (Redux)
status: pending
complexity: M
depends_on: [005, 007]
next: 015
---

## Context
PRD §6.3 (updated) defines `caseStudies` state with `items`, `selectedCategory`, `selectedStage`, `searchTerm`, `loading`, `error`. PRD §6.4 defines the filtering/search/sort behavior. This is pure state logic — no UI yet, no real data yet (items will be populated from task 016's data file once it exists, but this slice can be built and tested against mock data first).

## Work
- Create `src/store/slices/caseStudiesSlice.ts` using Redux Toolkit `createSlice`:
  - State: `{ items: CaseStudy[], selectedCategory: string | null, selectedStage: string | null, searchTerm: string, loading: boolean, error: string | null }`.
  - Reducers: `setItems`, `setCategory`, `setStage`, `setSearchTerm`, `setLoading`, `setError`.
  - Initial `items: []`.
- Create `src/store/selectors/caseStudiesSelectors.ts`:
  - `selectFilteredCaseStudies`: filters `items` by `selectedCategory` (if set), `selectedStage` (if set), and `searchTerm` (case-insensitive match against title/description/tags).
  - Sort options: `selectSortedCaseStudies(sortBy: 'newest' | 'oldest' | 'alphabetical')` applied after filtering.
- Register the slice's reducer in `src/store/store.ts` (replacing the placeholder from task 007).

## Acceptance Criteria
- Unit test (in `tests/`) with 3-4 mock `CaseStudy` items verifies: category filter narrows results, stage filter narrows results, both combined narrow further, search matches title/description/tags case-insensitively, and each sort order returns items in correct order.
