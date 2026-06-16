import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { setItems, setCategory, setStage, setSearchTerm } from '../store/slices/caseStudiesSlice';
import { selectSortedCaseStudies } from '../store/selectors/caseStudiesSelectors';
import { caseStudies } from '../data/caseStudies';
import CaseStudyCard from '../components/CaseStudyCard';
import Button from '../components/Button';
import SEO from '../components/SEO';

const categories = ['All', 'AI', 'Data Platforms', 'Marketing Tech', 'Growth'];
const stages = ['All Stages', 'Joyn', 'Optum', 'Vodafone', 'Earlier Roles'];

const PAGE_SIZE = 12;

export default function CaseStudiesHub() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { selectedCategory, selectedStage, searchTerm } = useSelector(
    (state: RootState) => state.caseStudies,
  );
  const results = useSelector((state: RootState) => selectSortedCaseStudies(state, 'newest'));

  useEffect(() => {
    dispatch(setItems(caseStudies));
  }, [dispatch]);

  useEffect(() => {
    const stage = searchParams.get('stage');
    if (stage) dispatch(setStage(stage));
  }, [searchParams, dispatch]);

  const filterSignature = `${selectedCategory}|${selectedStage}|${searchTerm}`;
  const [prevSignature, setPrevSignature] = useState(filterSignature);
  if (prevSignature !== filterSignature) {
    setPrevSignature(filterSignature);
    setVisibleCount(PAGE_SIZE);
  }

  const visible = results.slice(0, visibleCount);

  return (
    <main className="px-6 py-16 max-w-7xl mx-auto">
      <SEO
        title="Case Studies"
        description="Case studies on data platforms, AI products, and growth from Joyn, Optum, Vodafone, and earlier roles — with quantified before/after metrics."
        path="/case-studies"
      />

      {/* Header */}
      <div className="max-w-4xl">
        <p className="font-mono text-sm text-muted tracking-wide mb-2">Work</p>
        <h1 className="font-display font-bold text-ink leading-[1.05] text-[clamp(2rem,5vw,3.25rem)]">
          Case Studies
        </h1>
        <p className="font-body text-lg text-muted mt-4 max-w-[58ch]">
          14+ years of shipping data platforms, AI products, and growth wins —
          filterable by category and career stage.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-col gap-4">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const value = category === 'All' ? null : category;
            const active = selectedCategory === value;
            return (
              <button
                key={category}
                onClick={() => dispatch(setCategory(value))}
                className={`font-body font-medium text-sm rounded-full px-4 py-1.5 border transition-colors duration-200 ${
                  active
                    ? 'bg-accent text-white border-accent'
                    : 'text-ink border-[rgba(13,14,16,0.15)] hover:border-accent hover:text-accent'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Stage pills */}
        <div className="flex flex-wrap gap-2">
          {stages.map((stage) => {
            const value = stage === 'All Stages' ? null : stage;
            const active = selectedStage === value;
            return (
              <button
                key={stage}
                onClick={() => dispatch(setStage(value))}
                className={`font-body font-medium text-sm rounded-full px-4 py-1.5 border transition-colors duration-200 ${
                  active
                    ? 'border-ink text-ink font-semibold'
                    : 'text-muted border-[rgba(13,14,16,0.10)] hover:border-accent hover:text-accent'
                }`}
              >
                {stage}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          placeholder="Search case studies..."
          className="w-full max-w-sm font-body text-sm text-ink bg-surface border border-[rgba(13,14,16,0.12)] rounded-full px-5 py-2.5 focus:outline-none focus:border-accent placeholder:text-faint"
        />
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 min-[760px]:grid-cols-2 min-[1025px]:grid-cols-3 gap-6">
        {visible.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-10 font-body text-muted">No case studies match your filters.</p>
      )}

      {visibleCount < results.length && (
        <div className="mt-10">
          <Button
            as="button"
            variant="secondary"
            className="w-full"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load More
          </Button>
        </div>
      )}
    </main>
  );
}
