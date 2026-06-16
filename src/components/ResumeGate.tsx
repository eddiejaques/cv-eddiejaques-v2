import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Button from './Button';

interface Props {
  onUnlock: () => void;
}

type State = 'idle' | 'loading' | 'error';

export default function ResumeGate({ onUnlock }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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

    const { error } = await supabase.from('resume_leads').insert({
      name: name.trim() || null,
      email: email.trim().toLowerCase(),
      source: 'resume-gate',
    });

    if (error) {
      setState('error');
      setErrorMsg('Something went wrong. Please try again or email gauravkumar.dani@gmail.com directly.');
      return;
    }

    setState('idle');
    onUnlock();
  }

  return (
    <main className="min-h-[calc(100vh-72px)] px-6 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="font-display font-bold text-ink text-[32px] leading-tight">
          Request the Resume
        </h1>
        <p className="font-body text-muted mt-3 mb-8">
          Leave your details and the resume will open instantly. No spam — just a record of who's looking.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-mono text-xs text-accent uppercase tracking-wide">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="border border-border rounded px-4 py-3 font-body text-sm text-ink bg-white placeholder:text-fog focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-mono text-xs text-accent uppercase tracking-wide">
              Email <span className="text-ink/40 normal-case tracking-normal">(required)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="border border-border rounded px-4 py-3 font-body text-sm text-ink bg-white placeholder:text-fog focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          {errorMsg && (
            <p className="font-body text-sm text-accent">{errorMsg}</p>
          )}

          <Button as="button" type="submit" variant="primary" className="w-full" disabled={state === 'loading'}>
            {state === 'loading' ? 'One moment…' : 'View Resume →'}
          </Button>
        </form>
      </div>
    </main>
  );
}
