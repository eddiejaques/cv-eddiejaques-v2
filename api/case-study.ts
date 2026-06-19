import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const GA_ID = process.env.VITE_GA_ID;

// The case-study HTML in Storage has no analytics of its own. These pages are
// served as standalone documents (not the SPA shell), so inject the GA tag into
// their <head> at request time. No-ops unless VITE_GA_ID is a valid G-... id.
function injectGa(html: string): string {
  if (!GA_ID || !/^G-[A-Z0-9]+$/i.test(GA_ID)) return html;
  const tag =
    `<!-- Google tag (gtag.js) -->` +
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>` +
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
    // Consent Mode v2: deny by default, honor stored choice (same-origin localStorage).
    `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',` +
    `ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});` +
    `try{if(localStorage.getItem('cmp-consent-v1')==='granted'){` +
    `gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}` +
    `gtag('js',new Date());gtag('config','${GA_ID}');</script>`;
  return html.replace(/<head[^>]*>/i, (m) => m + tag);
}

// Slugs are lowercase alphanumerics + hyphens only. Reject anything else
// (dots, slashes, %-encoding, uppercase) to prevent path traversal / SSRF
// into other storage objects or buckets.
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,99}$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const raw = req.query.slug;
  const slug = Array.isArray(raw) ? raw[0] : raw;

  if (!slug || typeof slug !== 'string' || !SLUG_RE.test(slug)) {
    return res.status(400).send('Bad request');
  }

  const url = `${SUPABASE_URL}/storage/v1/object/public/case-studies/${slug}-case-study.html`;

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(404).send('Case study not found');
    }
    const html = injectGa(await upstream.text());
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=2592000');
    return res.status(200).send(html);
  } catch {
    return res.status(502).send('Failed to load case study');
  }
}
