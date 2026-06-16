import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import NotFound from './NotFound';

// Production: /case-studies/:slug is handled by api/case-study/[slug].ts
// which fetches from Supabase and serves the HTML server-side (URL stays on
// eddiejaques.me). This component only runs in local dev — it fetches the
// same HTML and replaces the document in-place so the URL stays at localhost.

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!caseStudy) return;
    fetch(caseStudy.staticHtmlPath)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.text();
      })
      .then((html) => {
        document.open('text/html');
        document.write(html);
        document.close();
      })
      .catch(() => setNotFound(true));
  }, [caseStudy]);

  if (!caseStudy || notFound) return <NotFound />;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <span className="font-mono text-sm text-muted">Loading…</span>
    </div>
  );
}
