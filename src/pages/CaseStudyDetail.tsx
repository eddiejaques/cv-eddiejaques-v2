import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import NotFound from './NotFound';

// In production, /case-studies/:slug is handled by Vercel's proxy rewrite
// (vercel.json) which serves the Supabase HTML directly — no React shell.
// In dev, we replicate that by redirecting to the Supabase URL.

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  useEffect(() => {
    if (caseStudy) {
      window.location.replace(caseStudy.staticHtmlPath);
    }
  }, [caseStudy]);

  if (!caseStudy) return <NotFound />;

  return null;
}
