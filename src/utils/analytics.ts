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

/** Send an explicit GA4 page_view for a client-side route. */
export function trackPageView(path: string): void {
  gtag()?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Track React Router navigations as page_views. The initial load is already
 * counted by gtag('config') in index.html, so we skip the first render to
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
