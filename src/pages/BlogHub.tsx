import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { setPosts, setSearchTerm, setTag } from '../store/slices/blogSlice';
import { selectSortedPosts, selectFilteredPosts } from '../store/selectors/blogSelectors';
import { loadBlogPosts } from '../utils/loadBlogPosts';
import SEO from '../components/SEO';

const PAGE_SIZE = 10;

function formatRunLog(date?: string): string {
  if (!date) return '[RUN-LOG // UNDATED]';
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `[RUN-LOG // ${yyyy}.${mm}.${dd}]`;
}

export default function BlogHub() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const searchTerm = useSelector((state: RootState) => state.blog.searchTerm);
  const selectedTag = useSelector((state: RootState) => state.blog.selectedTag);

  useEffect(() => {
    dispatch(setPosts(loadBlogPosts()));
  }, [dispatch]);

  useEffect(() => {
    const tag = searchParams.get('tag');
    if (tag) {
      dispatch(setTag(tag));
    }
  }, [searchParams, dispatch]);

  const filterSignature = `${searchTerm}|${selectedTag}`;
  const [prevSignature, setPrevSignature] = useState(filterSignature);
  if (prevSignature !== filterSignature) {
    setPrevSignature(filterSignature);
    setVisibleCount(PAGE_SIZE);
  }

  const filtered = useSelector((state: RootState) => selectFilteredPosts(state));
  const sorted = useSelector((state: RootState) => selectSortedPosts(state, 'newest')).filter((p) =>
    filtered.includes(p),
  );
  const visible = sorted.slice(0, visibleCount);

  return (
    <main className="px-6 py-16 max-w-[720px] mx-auto">
      <SEO
        title="Run Logs"
        description="Notes on data platforms, AI products, and the difference between shipping and theorizing."
        path="/blog"
      />
      <h1 className="font-display font-bold text-ink text-[clamp(2rem,5vw,3rem)]">Run Logs</h1>
      <p className="font-body text-base text-muted mt-3">
        Notes on data platforms, AI products, and the difference between shipping and theorizing.
      </p>

      {selectedTag && (
        <div className="mt-6 font-body text-sm text-muted">
          Filtered by <span className="text-accent font-semibold">#{selectedTag}</span>{' '}
          <button onClick={() => dispatch(setTag(null))} className="text-accent hover:underline">
            (clear)
          </button>
        </div>
      )}

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search posts..."
        className="mt-6 w-full font-body text-base text-ink bg-surface border border-border rounded-DEFAULT px-4 py-3 focus:outline-none focus:border-accent"
      />

      <div className="mt-10">
        {visible.map((post) => (
          <article key={post.id} className="pb-8 mb-8 border-b border-border">
            <div className="font-mono text-[11px] text-accent uppercase tracking-wide">
              {formatRunLog(post.publishedDate)}
            </div>
            <h2 className="font-display font-semibold text-[28px] text-ink mt-2">
              <Link to={`/blog/${post.slug}`} className="hover:text-accent transition-colors duration-200">
                {post.title}
              </Link>
            </h2>
            <p className="font-body text-[15px] text-muted mt-2 line-clamp-2">{post.description}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span key={tag} className="font-body font-medium text-xs text-faint">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && <p className="font-body text-muted">No posts match your search.</p>}

      {visibleCount < filtered.length && (
        <button
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="font-body font-semibold text-sm text-accent hover:underline"
        >
          Load more
        </button>
      )}
    </main>
  );
}
