import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Thin wrapper over the gtag.js loaded in index.html (and injected into the
// standalone case-study pages). Every call no-ops safely when gtag isn't
// present — e.g. VITE_GA_ID is unset, or an ad blocker dropped the script.
type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | null {
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === 'function' ? w.gtag : null;
}

/** Fire a GA4 custom event (e.g. a conversion). */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  gtag()?.('event', name, params ?? {});
}

/** Matomo's command queue from index.html; null if the snippet isn't present. */
function paq(): unknown[][] | null {
  const w = window as unknown as { _paq?: unknown[][] };
  return Array.isArray(w._paq) ? w._paq : null;
}

/** Send an explicit page view (GA4 + Matomo) for a client-side route. */
export function trackPageView(path: string): void {
  gtag()?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
  const q = paq();
  if (q) {
    q.push(['setCustomUrl', window.location.href]);
    q.push(['setDocumentTitle', document.title]);
    q.push(['trackPageView']);
  }
}

/**
 * Track React Router navigations as page_views. The initial load is already
 * counted by gtag('config') and Matomo's trackPageView in index.html, so we skip the first render to
 * avoid double-counting the landing page.
 */
export function usePageViews(): void {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
}
