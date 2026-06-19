// Lightweight consent management for Google Consent Mode v2.
//
// The denied-by-default consent state is set in index.html (and in the
// injected case-study snippets) BEFORE gtag('config'), so GA starts in
// cookieless mode. This module updates that state once the visitor chooses,
// and persists the choice so it survives reloads and applies on first paint.
//
// Signals: this site runs no ads, so the ad_* signals stay denied always —
// we only ever toggle analytics_storage.

export type ConsentChoice = 'granted' | 'denied';

// Versioned: bump the suffix to re-prompt everyone (e.g. if scope changes).
export const CONSENT_STORAGE_KEY = 'cmp-consent-v1';

// Window event the footer link dispatches to re-open the banner.
export const CONSENT_OPEN_EVENT = 'cmp:open';

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | null {
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === 'function' ? w.gtag : null;
}

/** The visitor's saved choice, or null if they haven't chosen yet. */
export function getStoredConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

/** Persist the choice and push it to GA via Consent Mode update. */
export function setConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* storage may be unavailable (private mode); update GA regardless */
  }
  gtag()?.('consent', 'update', {
    analytics_storage: choice === 'granted' ? 'granted' : 'denied',
  });
}

/** Re-open the consent banner (wired to the footer "Cookie settings" link). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
