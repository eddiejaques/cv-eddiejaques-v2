import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { loadBlogPosts } from '../utils/loadBlogPosts';

const PER_GROUP = 3;

function formatRunLog(date?: string): string {
  if (!date) return '[RUN-LOG // UNDATED]';
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `[RUN-LOG // ${yyyy}.${mm}.${dd}]`;
}

export default function BlogTeasers() {
  // Newest three posts, dated first then undated — same ordering as the hub.
  const posts = useMemo(() => {
    return [...loadBlogPosts()]
      .sort((a, b) => {
        const aTime = a.publishedDate ? new Date(a.publishedDate).getTime() : NaN;
        const bTime = b.publishedDate ? new Date(b.publishedDate).getTime() : NaN;
        if (Number.isNaN(aTime) && Number.isNaN(bTime)) return 0;
        if (Number.isNaN(aTime)) return 1;
        if (Number.isNaN(bTime)) return -1;
        return bTime - aTime;
      })
      .slice(0, PER_GROUP);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section
      className="relative w-full max-w-6xl mx-auto px-6 md:px-10 py-24"
      aria-label="From the Run Logs"
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-2 h-2 rounded-full bg-accent"
              style={{ boxShadow: '0 0 12px 2px rgba(198,249,78,0.6)' }}
            />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              From the Run Logs
            </p>
          </div>
          <h2 className="font-display font-semibold text-ink text-[clamp(1.8rem,4vw,3rem)] leading-[1.02]">
            Notes on shipping{' '}
            <span className="italic text-accent" style={{ fontVariationSettings: '"SOFT" 8, "opsz" 96' }}>
              data &amp; AI.
            </span>
          </h2>
        </div>
        <Link
          to="/blog"
          className="group font-body text-sm text-ink relative whitespace-nowrap"
        >
          Read all posts
          <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>

      {/* The trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group relative flex flex-col justify-between rounded-DEFAULT border border-border bg-surface p-7 transition-colors duration-200 hover:border-accent focus-visible:border-accent focus-visible:outline-none"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent mb-5">
                {formatRunLog(post.publishedDate)}
              </div>
              <h3 className="font-display font-semibold text-ink text-[1.35rem] leading-snug">
                {post.title}
              </h3>
              <p className="font-body text-sm text-muted line-clamp-3 mt-3">
                {post.description}
              </p>
            </div>

            <div className="mt-8 flex items-end justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                {post.readTime} min read
              </span>
              <span className="font-body font-semibold text-sm text-accent inline-flex items-center gap-1.5 whitespace-nowrap">
                Read
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
