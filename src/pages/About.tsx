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
  'Ship first, theorize later — production data beats roadmap debates.',
  'Every product decision should trace back to a measurable outcome.',
  'AI products need to be designed around being wrong, not just being smart.',
  'Data platforms are products too — they deserve the same rigor as customer-facing ones.',
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
        description="14+ years moving fast across data platforms, AI products, and marketing tech — based in Munich, open to Director roles across DACH, India, Singapore, and the UAE."
        path="/about"
      />
      <h1 className="font-display font-bold text-ink text-[clamp(2rem,5vw,3rem)]">About</h1>
      <div className="mt-6 font-body text-base text-ink leading-relaxed flex flex-col gap-4 max-w-[70ch]">
        <p>{resumeData.summary}</p>
        <p>
          Based in Munich, I work at the intersection of data platforms, AI products, and marketing technology —
          building systems that hold up under real production load, not just in a deck.
        </p>
      </div>

      <section className="mt-12">
        <Metrics metrics={stats} variant="banner" />
      </section>

      <section className="mt-12">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">What I Care About</h2>
        <ul className="flex flex-col gap-2">
          {principles.map((principle) => (
            <li key={principle} className="font-body text-[15px] text-ink leading-relaxed pl-5 relative">
              <span className="absolute left-0 text-accent">—</span>
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Currently</h2>
        <p className="font-body text-[15px] text-muted leading-relaxed max-w-[70ch]">
          Rebuilding how Joyn's product works — recommendation, search, and data platform foundations — while
          exploring agentic AI workflows for marketing and customer operations. Open to Director-level Data &amp; AI
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
