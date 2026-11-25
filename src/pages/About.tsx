import { resumeData } from '../data/resume';
import Metrics from '../components/Metrics';
import SEO from '../components/SEO';

const stats = [
  { label: 'YEARS IN PRODUCT', value: '14+' },
  { label: 'TEAMS LED', value: '8+' },
  { label: 'MEASURABLE IMPACT', value: '$1M+' },
  { label: 'CTR UPLIFT', value: '>200%' },
];

const principles = [
  'Put working software in front of real traffic early. Production data settles arguments faster than roadmap slides.',
  'Tie product work to a clear business metric before writing the first ticket.',
  'Models fail and hallucinate. Good AI products are built with fallbacks, guardrails, and clear recovery paths.',
  'Internal data platforms need the same product discipline, SLAs, and usability as customer-facing apps.',
];

const socialLinks = [
  { href: `mailto:${resumeData.contact.email}`, label: 'Email' },
  { href: resumeData.contact.linkedin ?? 'https://linkedin.com/', label: 'LinkedIn' },
  { href: resumeData.contact.github ?? 'https://github.com/', label: 'GitHub' },
];

export default function About() {
  return (
    <main className="px-6 py-16 max-w-[760px] mx-auto">
      <SEO
        title="About"
        description="Director of Data & AI Products based in Munich. 14+ years across data platforms, AI products, and marketing tech. Open to leadership roles in DACH, India, Singapore, and the UAE."
        path="/about"
      />
      <h1 className="font-display font-bold text-ink text-[clamp(2rem,5vw,3rem)]">About</h1>
      <div className="mt-6 font-body text-base text-ink leading-relaxed flex flex-col gap-4 max-w-[70ch]">
        <p>{resumeData.summary}</p>
        <p>
          I live in Munich and spend my time where data engineering, machine learning, and commercial
          growth meet. Most of my career has involved taking messy, high-volume data stacks and turning
          them into products that teams can actually run and measure.
        </p>
      </div>

      <section className="mt-12">
        <Metrics metrics={stats} variant="banner" />
      </section>

      <section className="mt-12">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">How I Work</h2>
        <ul className="flex flex-col gap-2">
          {principles.map((principle) => (
            <li key={principle} className="font-body text-[15px] text-ink leading-relaxed pl-5 relative">
              <span className="absolute left-0 text-accent">·</span>
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Currently</h2>
        <p className="font-body text-[15px] text-muted leading-relaxed max-w-[70ch]">
          Leading the recommendation, search, and data platform teams at Joyn, while building agentic
          workflows for marketing and customer operations. I am open to Director and VP-level Data &amp; AI
          Product roles across DACH, India, Singapore, and the UAE.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Say Hello</h2>
        <div className="flex flex-wrap gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-medium text-sm text-ink transition-colors duration-200 hover:text-accent hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
