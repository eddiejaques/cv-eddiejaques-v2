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
    <main className="relative min-h-screen overflow-hidden px-6 md:px-10 py-20 flex flex-col justify-center">
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

      {/* Accent glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(198,249,78,0.10) 0%, transparent 60%)' }}
      />
      {/* Hairline vertical rule for editorial rhythm */}
      <div aria-hidden className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-border" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 mb-8" style={{ animationDelay: '0.05s' }}>
          <span className="w-2 h-2 rounded-full bg-accent" style={{ boxShadow: '0 0 12px 2px rgba(198,249,78,0.6)' }} />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Director · Data &amp; AI Products
          </p>
        </div>

        {/* Headline — expressive Fraunces, mixed roman + italic */}
        <h1 className="reveal font-display text-ink font-semibold leading-[0.94] text-[clamp(2.8rem,9vw,7rem)]" style={{ animationDelay: '0.12s' }}>
          I ship data &amp; AI
          <br />
          products that{' '}
          <span className="italic text-accent" style={{ fontVariationSettings: '"SOFT" 8, "opsz" 96' }}>
            prove
          </span>{' '}
          their
          <br />
          worth.
        </h1>

        {/* Sub-copy + avatar row */}
        <div className="reveal mt-10 flex items-start gap-8 flex-wrap" style={{ animationDelay: '0.22s' }}>
          <img
            src="/images/eddie-jaques.jpg"
            alt="Eddie Jaques"
            className="w-16 h-16 rounded-full object-cover object-top grayscale flex-shrink-0"
            style={{ boxShadow: '0 0 0 1px var(--color-border), 0 0 0 5px rgba(198,249,78,0.18)' }}
          />
          <p className="font-body text-lg md:text-xl text-muted max-w-[48ch] leading-relaxed">
            14+ years moving fast across data platforms, AI products, and marketing tech.
            Currently rebuilding how Joyn's product works — measured in dollars saved and
            engagement earned, not slideware.
          </p>
        </div>

        {/* Metrics — editorial ledger row */}
        <div className="reveal mt-14 grid grid-cols-1 sm:grid-cols-3 border-t border-border" style={{ animationDelay: '0.32s' }}>
          {heroMetrics.map((m) => (
            <div key={m.label} className="py-6 sm:pr-8 border-b sm:border-b-0 border-border group">
              <div className="font-display text-ink font-semibold text-[3rem] leading-none tabular-nums transition-colors duration-200 group-hover:text-accent">
                {m.value}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mt-3">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stage links */}
        <nav className="reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ animationDelay: '0.42s' }}>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Where ↗</span>
          {stages.map((stage) => (
            <Link
              key={stage}
              to={`/case-studies?stage=${encodeURIComponent(stage)}`}
              className="group font-body text-sm text-ink relative"
            >
              {stage}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
      </div>

      <p
        className={`relative font-mono text-[11px] uppercase tracking-[0.2em] text-faint text-center mt-20 transition-opacity duration-500 ${
          showScrollHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Scroll ↓
      </p>
    </main>
  );
}
