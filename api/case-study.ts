import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;

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
    const html = await upstream.text();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=2592000');
    return res.status(200).send(html);
  } catch {
    return res.status(502).send('Failed to load case study');
  }
}
