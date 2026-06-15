---
id: 015
title: blogSlice (Redux)
status: completed
complexity: M
depends_on: [005, 007]
next: 016
---

## Context
PRD §6.3 defines `blog` state with `posts`, `selectedTag`, `searchTerm`, `loading`. PRD §6.4 defines tag filtering, title/excerpt search, and newest/oldest sort.

## Work
- Create `src/store/slices/blogSlice.ts` (Redux Toolkit `createSlice`):
  - State: `{ posts: BlogPost[], selectedTag: string | null, searchTerm: string, loading: boolean }`.
  - Reducers: `setPosts`, `setTag`, `setSearchTerm`, `setLoading`.
- Create `src/store/selectors/blogSelectors.ts`:
  - `selectFilteredPosts`: filters `posts` by `selectedTag` (if set) and `searchTerm` (matches title or description).
  - `selectSortedPosts(sortBy: 'newest' | 'oldest')`.
  - `selectFeaturedPosts`: returns posts where `featured === true` (for homepage use, if needed).
- Register the slice's reducer in `src/store/store.ts`.

## Acceptance Criteria
- Unit test with 3-4 mock `BlogPost` items verifies tag filter, search filter, both combined, and both sort orders.
