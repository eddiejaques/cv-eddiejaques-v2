import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import SEO from '../components/SEO';
import NotFound from './NotFound';

// On Vercel, /case-studies/:slug is handled by api/case-study/[slug].ts
// which fetches from Supabase Storage and serves the full HTML server-side.
// This component is the local dev fallback — fetches the HTML and renders
// via blob URL in an iframe so the design is preserved during development.

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = caseStudies.findIndex((c) => c.slug === slug);

  if (index === -1) return <NotFound />;

  const caseStudy = caseStudies[index];
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let objectUrl: string;
    fetch(caseStudy.staticHtmlPath)
      .then((r) => { if (!r.ok) throw new Error(); return r.text(); })
      .then((html) => {
        const blob = new Blob([html], { type: 'text/html' });
        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
      })
      .catch(() => setError(true));
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [caseStudy.staticHtmlPath]);

  function onLoad() {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const h = iframe.contentDocument?.body?.scrollHeight;
      if (h) iframe.style.height = `${h}px`;
    } catch { /* cross-origin guard */ }
  }

  return (
    <>
      <SEO title={caseStudy.title} description={caseStudy.description} path={`/case-studies/${caseStudy.slug}`} />
      {error && (
        <main className="px-6 py-16 max-w-[720px] mx-auto">
          <p className="font-body text-muted">Could not load case study. <a href="/case-studies" className="text-accent hover:underline">← Back</a></p>
        </main>
      )}
      {!error && !blobUrl && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="font-mono text-sm text-muted">Loading…</span>
        </div>
      )}
      {blobUrl && (
        <iframe ref={iframeRef} src={blobUrl} onLoad={onLoad} title={caseStudy.title}
          style={{ width: '100%', border: 'none', display: 'block', minHeight: '100vh' }} />
      )}
    </>
  );
}
