import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { resumeData } from '../data/resume';

const heroMetrics = [
  { label: 'Cost avoided', value: '$1M+' },
  { label: 'CTR improvement', value: '>200%' },
  { label: 'Teams led', value: '8+' },
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
    <main className="min-h-screen flex flex-col justify-center px-6 py-16">
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

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">

        {/* Avatar + Greeting + Headline */}
        <div className="flex items-center gap-8 md:gap-10">
          {/* Circular photo */}
          <div className="flex-shrink-0">
            <img
              src="/images/eddie-jaques.jpg"
              alt="Eddie Jaques"
              className="w-[88px] h-[88px] sm:w-[120px] sm:h-[120px] md:w-[148px] md:h-[148px] rounded-full object-cover object-top"
              style={{ boxShadow: '0 0 0 3px #FAF9F6, 0 0 0 6px #FF5A00' }}
            />
          </div>

          {/* Greeting + Headline */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm text-muted tracking-wide">
              Hi, I'm <span className="text-ink font-semibold">Eddie Jaques</span>,
            </p>
            <h1 className="font-display font-bold text-ink leading-[1.05] text-[clamp(1.6rem,4vw,3.25rem)]">
              Director of Data &amp; AI Products
              <br />
              <span className="text-accent">Who Ships, Leads,</span>
              <br />
              and Proves It Works
            </h1>
          </div>
        </div>

        {/* Stage pills */}
        <nav className="flex flex-wrap gap-3">
          {stages.map((stage) => (
            <Link
              key={stage}
              to={`/case-studies?stage=${encodeURIComponent(stage)}`}
              className="font-body font-medium text-sm text-ink border border-[rgba(13,14,16,0.15)] rounded-full px-4 py-1.5 hover:border-accent hover:text-accent transition-colors duration-200"
            >
              {stage}
            </Link>
          ))}
        </nav>

        {/* Sub-copy */}
        <p className="font-body text-lg text-muted max-w-[58ch]">
          14+ years moving fast across data platforms, AI products, and marketing tech.
          Currently rebuilding how Joyn's product works.
          Targeting your team next.
        </p>

        {/* Metrics — expanded row, left-aligned, full content width */}
        <div className="flex border-t border-b border-[rgba(13,14,16,0.08)] py-6">
          {heroMetrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex-1 ${i > 0 ? 'border-l border-[rgba(13,14,16,0.08)] pl-8' : 'pr-8'}`}
            >
              <div className="font-display font-bold text-[2.5rem] leading-none text-ink">{m.value}</div>
              <div className="font-mono text-xs text-accent uppercase tracking-[0.12em] mt-2">{m.label}</div>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-muted">
          Led 8+ cross-functional teams · Shipped 0→1 products · Built frameworks adopted company-wide
        </p>

      </div>

      <p
        className={`font-body text-xs text-faint text-center mt-16 transition-opacity duration-300 ${
          showScrollHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Scroll for more ↓
      </p>
    </main>
  );
}
