import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getStoredConsent,
  setConsent,
  CONSENT_OPEN_EVENT,
  type ConsentChoice,
} from '../utils/consent';
import Button from './Button';

// Simple, GDPR-aligned consent banner. Shows on first visit (no stored
// choice) and whenever the footer "Cookie settings" link re-opens it.
// Until the visitor chooses, GA stays in the denied-by-default Consent Mode
// state set in index.html — so no analytics cookies are written.
export default function ConsentBanner() {
  // Show on first visit (no stored choice yet); reading storage in the lazy
  // initializer avoids a synchronous setState inside the effect.
  const [open, setOpen] = useState(() => getStoredConsent() === null);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  function choose(choice: ConsentChoice) {
    setConsent(choice);
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="print:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-border shadow-[0_-4px_24px_rgba(13,14,16,0.06)]"
    >
      <div className="max-w-[1100px] mx-auto px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-body text-sm text-muted leading-relaxed md:max-w-[640px]">
          This site uses Google Analytics to understand how visitors use it. No
          tracking cookies are set unless you accept. See our{' '}
          <Link to="/privacy" className="text-accent hover:underline" onClick={() => setOpen(false)}>
            privacy notice
          </Link>
          ; you can change your choice anytime via{' '}
          <span className="text-ink">Cookie settings</span> in the footer.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Button as="button" variant="secondary" onClick={() => choose('denied')}>
            Reject
          </Button>
          <Button as="button" variant="primary" onClick={() => choose('granted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
