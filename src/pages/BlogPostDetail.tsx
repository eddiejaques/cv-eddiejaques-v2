import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { loadBlogPosts } from '../utils/loadBlogPosts';
import SEO from '../components/SEO';
import NotFound from './NotFound';

function formatRunLog(date: string): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `[RUN-LOG // ${yyyy}.${mm}.${dd}]`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const posts = [...loadBlogPosts()].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return <NotFound />;
  }

  const post = posts[index];
  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  const next = index > 0 ? posts[index - 1] : null;

  return (
    <main className="px-6 py-16 max-w-[720px] mx-auto">
      <SEO
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.publishedDate,
          author: { '@type': 'Person', name: 'Gaurav Kumar Dani' },
        }}
      />
      <Link to="/blog" className="font-body font-medium text-sm text-accent hover:underline">
        ← Back to Run Logs
      </Link>

      <div className="font-mono text-[11px] text-accent uppercase tracking-wide mt-6">
        {formatRunLog(post.publishedDate)}
      </div>
      <h1 className="font-display font-bold text-ink text-[clamp(2rem,5vw,3rem)] mt-2">{post.title}</h1>
      <div className="font-mono text-xs text-faint mt-4 flex flex-wrap gap-4">
        <span>{formatDate(post.publishedDate)}</span>
        <span>{post.readTime} min read</span>
      </div>

      <div className="mt-10 font-body text-base text-ink leading-relaxed [&>*+*]:mt-4">
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="font-display font-bold text-2xl text-ink mt-8 mb-2 tracking-tight">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-display font-semibold text-lg text-ink mt-6 mb-2 tracking-tight">{children}</h3>
            ),
            p: ({ children }) => <p className="font-body text-base text-ink leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-none space-y-2">{children}</ul>,
            li: ({ children }) => (
              <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:bg-accent before:rounded-sm">
                {children}
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-[3px] border-accent pl-4 italic text-muted">{children}</blockquote>
            ),
            code: ({ children }) => <code className="font-mono text-sm">{children}</code>,
            pre: ({ children }) => (
              <pre className="bg-ink text-bg-primary font-mono text-sm p-4 rounded-DEFAULT overflow-x-auto">
                {children}
              </pre>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-12 pt-6 border-t border-border font-body text-sm text-muted">
        <p>By Gaurav Kumar Dani · {formatDate(post.publishedDate)}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tag)}`}
              className="font-body font-medium text-xs text-faint hover:text-accent transition-colors duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between font-body font-semibold text-sm text-accent">
        {prev ? (
          <Link to={`/blog/${prev.slug}`} className="hover:underline">
            ← Previous Post
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/blog/${next.slug}`} className="hover:underline">
            Next Post →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
