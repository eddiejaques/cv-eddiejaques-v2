import SEO from '../components/SEO';
import Button from '../components/Button';
import { resumeData } from '../data/resume';
import { openConsentSettings } from '../utils/consent';

const { contact } = resumeData;

export default function Privacy() {
  return (
    <main className="px-6 py-16 max-w-[680px] mx-auto">
      <SEO
        title="Privacy"
        description="What this site collects, how analytics consent works, and how to manage or delete your data."
        path="/privacy"
      />

      <p className="font-mono text-xs text-accent uppercase tracking-[0.14em] mb-3">Privacy</p>
      <h1 className="font-display font-bold text-ink text-[clamp(1.9rem,4.5vw,2.75rem)] leading-[1.05]">
        Privacy & cookies
      </h1>
      <p className="font-body text-sm text-muted mt-3">
        Last updated {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}
      </p>

      <div className="flex flex-col gap-8 mt-10">
        <Section title="The short version">
          This is a personal portfolio. It collects as little as possible: anonymous,
          consent-gated analytics, plus the details you choose to send through a form. There are
          no ads and nothing is sold or shared for advertising.
        </Section>

        <Section title="Analytics & cookies">
          <p>
            The site uses Google Analytics 4 to understand how visitors use it. It runs under{' '}
            <strong className="text-ink font-semibold">Google Consent Mode v2</strong>: analytics
            load in a cookieless state by default and only set cookies once you choose{' '}
            <strong className="text-ink font-semibold">Accept</strong> in the consent banner. If
            you reject, no analytics cookies are set.
          </p>
          <p className="mt-3">
            Your choice is stored in your browser's <code className="font-mono text-[0.85em]">localStorage</code>{' '}
            (key <code className="font-mono text-[0.85em]">cmp-consent-v1</code>) so the banner
            doesn't reappear each visit. You can change or withdraw it anytime:
          </p>
          <div className="mt-4">
            <Button as="button" variant="secondary" onClick={openConsentSettings}>
              Manage cookie preferences
            </Button>
          </div>
        </Section>

        <Section title="Information you send">
          <p>
            If you use the contact form or request the résumé, the details you enter (such as your
            name, email, company, and message) are stored securely in a Supabase database and may
            trigger an email notification to me. This is used only to respond to you — never for
            marketing lists.
          </p>
        </Section>

        <Section title="Your choices & data requests">
          <p>
            You can ask me to access or delete any information you've sent, at any time. Email{' '}
            <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
              {contact.email}
            </a>{' '}
            and I'll take care of it.
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-ink text-xl mb-3">{title}</h2>
      <div className="font-body text-base text-muted leading-relaxed">{children}</div>
    </section>
  );
}
