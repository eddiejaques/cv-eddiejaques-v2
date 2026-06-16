import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query as { slug: string };

  if (!slug || typeof slug !== 'string') {
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
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch {
    return res.status(502).send('Failed to load case study');
  }
}
