import type { RootState } from '../store';
import type { CaseStudy } from '../../types/CaseStudy';

export function selectFilteredCaseStudies(state: RootState): CaseStudy[] {
  const { items, selectedCategory, selectedStage, searchTerm } = state.caseStudies;
  const term = searchTerm.trim().toLowerCase();

  return items.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedStage && item.experienceStage !== selectedStage) return false;
    if (term) {
      const haystack = [item.title, item.description, ...(item.tags ?? [])]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });
}

export type SortBy = 'newest' | 'oldest' | 'alphabetical';

export function selectSortedCaseStudies(state: RootState, sortBy: SortBy): CaseStudy[] {
  const filtered = selectFilteredCaseStudies(state);
  const sorted = [...filtered];

  switch (sortBy) {
    case 'newest':
      sorted.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
      break;
    case 'oldest':
      sorted.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
      break;
    case 'alphabetical':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return sorted;
}
