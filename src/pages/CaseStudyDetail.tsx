import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import NotFound from './NotFound';

// Production: /case-studies/:slug is handled by api/case-study/[slug].ts
// which fetches from Supabase and serves the HTML server-side (URL stays on
// eddiejaques.me). This component only runs in local dev — it fetches the
// same HTML and replaces the document in-place so the URL stays at localhost.

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

// document.write below replaces the whole document, dropping the SPA shell's
// GA tag, and the Storage HTML carries no analytics of its own — so re-inject
// the tag into <head>. Mirrors the server-side inject in api/case-study.ts.
function injectGa(html: string): string {
  if (!GA_ID || !/^G-[A-Z0-9]+$/i.test(GA_ID)) return html;
  const tag =
    `<!-- Google tag (gtag.js) -->` +
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>` +
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
    `gtag('js',new Date());gtag('config','${GA_ID}');</script>`;
  return html.replace(/<head[^>]*>/i, (m) => m + tag);
}

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
        document.write(injectGa(html));
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
