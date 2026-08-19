import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CRON_SECRET = process.env.CRON_SECRET;

// Free-tier Supabase projects are paused after 7 days with no activity, which
// is what took the site down on 2026-08-20. A cheap daily read counts as
// activity, so this runs on a Vercel cron (see vercel.json "crons") and doubles
// as a health check on the two tables the site actually depends on.
//
// This is a workaround, not a guarantee — upgrading to Pro is the real fix.
const TABLES = ['contact_requests', 'resume_leads'];

async function ping(table: string): Promise<{ table: string; ok: boolean; status: number | string }> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=id&limit=1`;
  try {
    const r = await fetch(url, {
      headers: { apikey: SERVICE_KEY!, Authorization: `Bearer ${SERVICE_KEY}` },
      signal: AbortSignal.timeout(10_000),
    });
    return { table, ok: r.ok, status: r.status };
  } catch (err) {
    // A paused project fails DNS resolution, so this is the branch that fires
    // when the thing we're trying to prevent has already happened.
    return { table, ok: false, status: err instanceof Error ? err.name : 'fetch failed' };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel sends this header on cron invocations whenever CRON_SECRET is set.
  // Without the secret configured the endpoint is open, but it only ever reads
  // one id, so the downside is noise rather than exposure.
  if (CRON_SECRET && req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const results = await Promise.all(TABLES.map(ping));
  const ok = results.every((r) => r.ok);

  res.setHeader('Cache-Control', 'no-store');
  return res.status(ok ? 200 : 502).json({ ok, checkedAt: new Date().toISOString(), results });
}
