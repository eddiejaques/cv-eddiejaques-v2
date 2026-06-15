import { Link, useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import { loadCaseStudyContent } from '../utils/loadCaseStudyContent';
import Metrics from '../components/Metrics';
import Button from '../components/Button';
import SEO from '../components/SEO';
import NotFound from './NotFound';
import '../styles/caseStudyContent.css';

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function stripHero(html: string): string {
  return html.replace(/<header class="hero">[\s\S]*?<\/header>/, '');
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = caseStudies.findIndex((c) => c.slug === slug);

  if (index === -1) {
    return <NotFound />;
  }

  const caseStudy = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const content = stripHero(loadCaseStudyContent(caseStudy.contentPath));

  return (
    <main className="px-6 py-16">
      <SEO
        title={caseStudy.title}
        description={caseStudy.description}
        path={`/case-studies/${caseStudy.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          headline: caseStudy.title,
          description: caseStudy.description,
          datePublished: caseStudy.publishedDate,
          author: { '@type': 'Person', name: 'Gaurav Kumar Dani' },
        }}
      />
      <div className="max-w-[720px] mx-auto">
        <nav className="font-body text-sm mb-8">
          <Link to="/case-studies" className="font-medium text-accent hover:underline">
            ← Back to Case Studies
          </Link>
          <div className="text-faint mt-1">
            Case Studies / <span className="text-muted">{caseStudy.title}</span>
          </div>
        </nav>

        <div className="font-mono text-xs uppercase text-accent mb-4">
          {caseStudy.category} · {caseStudy.experienceStage}
        </div>
        <h1 className="font-display font-bold text-ink text-[clamp(2rem,5vw,3rem)] max-w-[60ch] leading-tight">
          {caseStudy.title}
        </h1>
        <p className="font-body text-lg text-muted mt-4 max-w-[70ch]">{caseStudy.description}</p>
        <div className="font-mono text-xs text-faint mt-6 flex flex-wrap gap-4">
          <span>{formatDate(caseStudy.publishedDate)}</span>
          <span>{caseStudy.readTime} min read</span>
          <span>{caseStudy.organization}</span>
        </div>
      </div>

      <div className="case-study-content mt-16" dangerouslySetInnerHTML={{ __html: content }} />

      <div className="max-w-[720px] mx-auto mt-16">
        <h2 className="font-display font-bold text-2xl text-ink mb-6">Key Metrics</h2>
        <Metrics metrics={caseStudy.keyMetrics} variant="callout" />
      </div>

      <div className="max-w-[720px] mx-auto mt-16 flex flex-col gap-4">
        <Button as="link" to="/case-studies" variant="primary" className="w-full text-center">
          Back to Case Studies
        </Button>
        <Link
          to={`/case-studies/${next.slug}`}
          className="font-body font-semibold text-sm text-accent hover:underline text-center"
        >
          Read Next Case Study →
        </Link>
      </div>
    </main>
  );
}
