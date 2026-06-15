import { describe, it, expect } from 'vitest';
import type { BlogPost } from '../src/types/BlogPost';
import type { RootState } from '../src/store/store';
import { selectFilteredPosts, selectSortedPosts, selectFeaturedPosts } from '../src/store/selectors/blogSelectors';

const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'director-vs-pm',
    title: 'Director vs. PM',
    description: 'What actually changes when the title does.',
    content: '',
    publishedDate: '2026-02-10',
    readTime: 4,
    tags: ['Leadership', 'Product Management'],
    featured: true,
  },
  {
    id: '2',
    slug: 'data-pipeline-broken',
    title: 'Why Your Data Pipeline Is Broken',
    description: 'Most incidents trace back to a missing contract.',
    content: '',
    publishedDate: '2025-11-03',
    readTime: 5,
    tags: ['Data Platforms', 'Engineering'],
    featured: true,
  },
  {
    id: '3',
    slug: 'ai-products-vs-features',
    title: 'AI Products vs. AI Features',
    description: 'A distinction worth keeping.',
    content: '',
    publishedDate: '2025-08-20',
    readTime: 3,
    tags: ['AI', 'Product Management'],
    featured: false,
  },
];

function buildState(overrides: Partial<RootState['blog']> = {}): RootState {
  return {
    caseStudies: {} as RootState['caseStudies'],
    blog: {
      posts: mockPosts,
      selectedTag: null,
      searchTerm: '',
      loading: false,
      ...overrides,
    },
    ui: {},
  } as RootState;
}

describe('selectFilteredPosts', () => {
  it('returns all posts when no filters set', () => {
    expect(selectFilteredPosts(buildState())).toHaveLength(3);
  });

  it('filters by tag', () => {
    const result = selectFilteredPosts(buildState({ selectedTag: 'AI' }));
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('ai-products-vs-features');
  });

  it('searches title and description case-insensitively', () => {
    expect(selectFilteredPosts(buildState({ searchTerm: 'pipeline' }))).toHaveLength(1);
    expect(selectFilteredPosts(buildState({ searchTerm: 'DISTINCTION' }))).toHaveLength(1);
  });

  it('combines tag and search filters', () => {
    const result = selectFilteredPosts(buildState({ selectedTag: 'Product Management', searchTerm: 'director' }));
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('director-vs-pm');
  });
});

describe('selectSortedPosts', () => {
  it('sorts newest first', () => {
    const result = selectSortedPosts(buildState(), 'newest');
    expect(result.map((p) => p.slug)).toEqual([
      'director-vs-pm',
      'data-pipeline-broken',
      'ai-products-vs-features',
    ]);
  });

  it('sorts oldest first', () => {
    const result = selectSortedPosts(buildState(), 'oldest');
    expect(result.map((p) => p.slug)).toEqual([
      'ai-products-vs-features',
      'data-pipeline-broken',
      'director-vs-pm',
    ]);
  });
});

describe('selectFeaturedPosts', () => {
  it('returns only featured posts', () => {
    const result = selectFeaturedPosts(buildState());
    expect(result.map((p) => p.slug)).toEqual(['director-vs-pm', 'data-pipeline-broken']);
  });
});
