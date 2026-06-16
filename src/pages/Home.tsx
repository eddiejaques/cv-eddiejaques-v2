import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Metrics from '../components/Metrics';
import SEO from '../components/SEO';
import { resumeData } from '../data/resume';

const heroMetrics = [
  { label: 'COST AVOIDED', value: '$1M+' },
  { label: 'CTR IMPROVEMENT', value: '>200%' },
  { label: 'TEAMS LED', value: '8+' },
];

const stages = ['Joyn', 'Optum', 'Vodafone', 'Earlier Roles'];

export default function Home() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY < 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center gap-10">
      <SEO
        title="Home"
        description="Director of Data & AI Products with 14+ years shipping data platforms, AI products, and marketing tech. Metrics-first portfolio and case studies."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: resumeData.contact.name,
          jobTitle: resumeData.contact.title,
          email: resumeData.contact.email,
          url: 'https://eddiejaques.me',
          sameAs: [resumeData.contact.linkedin, resumeData.contact.github].filter(Boolean),
        }}
      />
      <div className="max-w-4xl">
        <h1 className="font-display font-bold text-ink leading-tight text-[clamp(2.5rem,6vw,4rem)]">
          Director of Data &amp; AI Products
          <br />
          Who Ships, Leads, and Proves It Works
        </h1>
        <p className="font-body text-lg text-muted mt-6 max-w-[70ch] mx-auto">
          14+ years moving fast across data platforms, AI products, and marketing tech.
          Currently rebuilding how Joyn's product works.
          Targeting your team next.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <Metrics metrics={heroMetrics} variant="banner" />
      </div>

<p className="font-body text-sm text-muted">
        Led 8+ cross-functional teams | Shipped 0→1 products | Built frameworks adopted company-wide
      </p>

      <nav className="flex flex-wrap items-center justify-center gap-6">
        {stages.map((stage) => (
          <Link
            key={stage}
            to={`/case-studies?stage=${encodeURIComponent(stage)}`}
            className="font-body font-medium text-sm text-muted hover:text-accent hover:underline transition-colors duration-200"
          >
            {stage}
          </Link>
        ))}
      </nav>

      <p
        className={`font-body text-xs text-faint transition-opacity duration-300 ${
          showScrollHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Scroll for more ↓
      </p>
    </main>
  );
}
