import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import SEO from '../components/SEO';

// TODO: replace with your real booking link (Cal.com / Calendly).
const CALENDAR_URL = 'https://cal.com/eddiejaques/15min';

type State = 'idle' | 'loading' | 'done' | 'error';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref'); // originating case study slug (attribution)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [challenge, setChallenge] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — real users leave blank
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, challenge, ref, website }),
      });
      if (!res.ok) throw new Error();
      setState('done');
    } catch {
      setState('error');
      setErrorMsg('Something went wrong. Please email gauravkumar.dani@gmail.com directly.');
    }
  }

  if (state === 'done') {
    return (
      <main className="px-6 py-20 max-w-[560px] mx-auto text-center">
        <SEO title="Let's talk" description="Start a conversation." path="/contact" />
        <p className="font-mono text-xs text-accent uppercase tracking-[0.14em] mb-3">Got it</p>
        <h1 className="font-display font-bold text-ink text-[clamp(1.8rem,4vw,2.5rem)] leading-tight">
          I'll be in touch within 24 hours
        </h1>
        <p className="font-body text-lg text-muted mt-4">
          I'll read what you sent and reply personally with how I'd approach it — no canned pitch.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="font-body text-sm text-muted">Prefer to talk sooner?</p>
          <Button as="link" to={CALENDAR_URL} variant="primary" reloadDocument>
            Grab 15 minutes on my calendar →
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-16 max-w-[560px] mx-auto">
      <SEO
        title="Let's talk"
        description="Tell me your biggest data or AI bottleneck and I'll send you how I'd approach it."
        path="/contact"
      />

      <p className="font-mono text-xs text-accent uppercase tracking-[0.14em] mb-3">Let's talk</p>
      <h1 className="font-display font-bold text-ink text-[clamp(1.9rem,4.5vw,2.75rem)] leading-[1.05]">
        Tackling something like this?
      </h1>
      <p className="font-body text-lg text-muted mt-4">
        Tell me your biggest data or AI bottleneck and I'll send you how I'd approach it —
        the same way I worked the problems in these case studies. No résumé dump, no pitch.
        Just a useful conversation.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10" noValidate>
        {/* Honeypot: hidden from humans, bots tend to fill it. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
        />

        <Field label="Name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </Field>

        <Field label="Work email" required>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Company">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Where you work"
            className={inputClass}
          />
        </Field>

        <Field label="What are you trying to solve or hire for?">
          <textarea
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            placeholder="e.g. our CDP costs are spiralling, recommendations are a black box, we need a data platform lead…"
            rows={4}
            maxLength={2000}
            className={`${inputClass} resize-y`}
          />
        </Field>

        {errorMsg && <p className="font-body text-sm text-accent">{errorMsg}</p>}

        <Button as="button" type="submit" variant="primary" className="w-full" disabled={state === 'loading'}>
          {state === 'loading' ? 'Sending…' : 'Start the conversation →'}
        </Button>

        <p className="font-body text-xs text-faint text-center">
          Or skip ahead and{' '}
          <a href={CALENDAR_URL} className="text-accent hover:underline">book 15 minutes</a>.
        </p>
      </form>
    </main>
  );
}

const inputClass =
  'border border-border rounded px-4 py-3 font-body text-sm text-ink bg-white placeholder:text-fog focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent w-full';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs text-accent uppercase tracking-wide">
        {label}{required && <span className="text-ink/40 normal-case tracking-normal"> (required)</span>}
      </label>
      {children}
    </div>
  );
}
