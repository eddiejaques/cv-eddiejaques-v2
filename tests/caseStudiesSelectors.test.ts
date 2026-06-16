import { describe, it, expect } from 'vitest';
import type { CaseStudy } from '../src/types/CaseStudy';
import type { RootState } from '../src/store/store';
import {
  selectFilteredCaseStudies,
  selectSortedCaseStudies,
} from '../src/store/selectors/caseStudiesSelectors';

const mockItems: CaseStudy[] = [
  {
    id: '1',
    slug: 'joyn-cdp',
    title: 'Joyn CDP',
    category: 'Data Platforms',
    organization: 'Joyn',
    experienceStage: 'Joyn',
    description: 'Built a customer data platform.',
    keyMetrics: [{ label: 'Cost Avoided', value: '$1M+' }],
    publishedDate: '2024-01-01',
    readTime: 5,
    tags: ['cdp', 'data'],
  },
  {
    id: '2',
    slug: 'joyn-ai-search',
    title: 'AI Search & Discovery',
    category: 'AI',
    organization: 'Joyn',
    experienceStage: 'Joyn',
    description: 'Improved search relevance with AI.',
    keyMetrics: [{ label: 'CTR', value: '5% -> 25%' }],
    publishedDate: '2024-06-01',
    readTime: 7,
    tags: ['ai', 'search'],
  },
  {
    id: '3',
    slug: 'optum-cro',
    title: 'Optum CRO Program',
    category: 'Growth',
    organization: 'Optum',
    experienceStage: 'Optum',
    description: 'Conversion rate optimization for healthcare.',
    keyMetrics: [{ label: 'Conversion', value: '200%+' }],
    publishedDate: '2022-01-01',
    readTime: 6,
    tags: ['cro', 'growth'],
  },
  {
    id: '4',
    slug: 'vodafone-marketing',
    title: 'Vodafone Marketing Automation',
    category: 'Marketing Tech',
    organization: 'Vodafone',
    experienceStage: 'Vodafone',
    description: 'Automated marketing campaigns at scale.',
    keyMetrics: [{ label: 'Reach', value: '10x' }],
    publishedDate: '2020-01-01',
    readTime: 4,
    tags: ['marketing', 'automation'],
  },
];

function buildState(overrides: Partial<RootState['caseStudies']> = {}): RootState {
  return {
    caseStudies: {
      items: mockItems,
      selectedCategory: null,
      selectedStage: null,
      searchTerm: '',
      loading: false,
      error: null,
      ...overrides,
    },
    blog: {},
    ui: {},
  } as RootState;
}

describe('selectFilteredCaseStudies', () => {
  it('returns all items when no filters set', () => {
    expect(selectFilteredCaseStudies(buildState())).toHaveLength(4);
  });

  it('filters by category', () => {
    const result = selectFilteredCaseStudies(buildState({ selectedCategory: 'AI' }));
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('joyn-ai-search');
  });

  it('filters by stage', () => {
    const result = selectFilteredCaseStudies(buildState({ selectedStage: 'Joyn' }));
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.slug)).toEqual(['joyn-cdp', 'joyn-ai-search']);
  });

  it('filters by category and stage combined', () => {
    const result = selectFilteredCaseStudies(
      buildState({ selectedCategory: 'AI', selectedStage: 'Joyn' })
    );
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('joyn-ai-search');
  });

  it('searches case-insensitively across title, description, tags', () => {
    expect(selectFilteredCaseStudies(buildState({ searchTerm: 'CDP' }))).toHaveLength(1);
    expect(selectFilteredCaseStudies(buildState({ searchTerm: 'healthcare' }))).toHaveLength(1);
    expect(selectFilteredCaseStudies(buildState({ searchTerm: 'automation' }))).toHaveLength(1);
    expect(selectFilteredCaseStudies(buildState({ searchTerm: 'nonexistent' }))).toHaveLength(0);
  });
});

describe('selectSortedCaseStudies', () => {
  it('sorts newest first', () => {
    const result = selectSortedCaseStudies(buildState(), 'newest');
    expect(result.map((r) => r.slug)).toEqual([
      'joyn-ai-search',
      'joyn-cdp',
      'optum-cro',
      'vodafone-marketing',
    ]);
  });

  it('sorts oldest first', () => {
    const result = selectSortedCaseStudies(buildState(), 'oldest');
    expect(result.map((r) => r.slug)).toEqual([
      'vodafone-marketing',
      'optum-cro',
      'joyn-cdp',
      'joyn-ai-search',
    ]);
  });

  it('sorts alphabetically', () => {
    const result = selectSortedCaseStudies(buildState(), 'alphabetical');
    expect(result.map((r) => r.title)).toEqual([
      'AI Search & Discovery',
      'Joyn CDP',
      'Optum CRO Program',
      'Vodafone Marketing Automation',
    ]);
  });
});
