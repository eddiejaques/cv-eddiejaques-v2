import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'gauravkumar.dani@gmail.com';
// Resend's shared sender works without domain verification; swap for your own
// verified domain later for better deliverability.
const FROM = process.env.RESEND_FROM || 'eddiejaques.me <onboarding@resend.dev>';

const str = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  if (!SUPABASE_URL || !SERVICE_KEY) return res.status(500).send('Server not configured');

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill hidden fields. Pretend success, do nothing.
  if (str(body.website, 100)) return res.status(200).json({ ok: true });

  const email = str(body.email, 254).toLowerCase();
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });

  const record = {
    name: str(body.name, 120) || null,
    email,
    company: str(body.company, 120) || null,
    challenge: str(body.challenge, 2000) || null,
    case_study_ref: str(body.ref, 100) || null,
    source: 'contact-form',
  };

  // Insert via PostgREST with the service-role key (bypasses RLS).
  const insert = await fetch(`${SUPABASE_URL}/rest/v1/contact_requests`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(record),
  });

  if (!insert.ok) {
    return res.status(502).json({ error: 'Could not save your message' });
  }

  // Fire the notification email (best-effort — don't fail the request if email errors).
  if (RESEND_API_KEY) {
    const cs = record.case_study_ref ? ` · from case study: ${record.case_study_ref}` : '';
    try {
      const mail = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM,
          to: NOTIFY_EMAIL,
          reply_to: record.email,
          subject: `New conversation request — ${record.name || record.email}${cs}`,
          text: [
            `Name:      ${record.name || '(not given)'}`,
            `Email:     ${record.email}`,
            `Company:   ${record.company || '(not given)'}`,
            `Came from: ${record.case_study_ref || '(direct)'}`,
            ``,
            `What they're solving / hiring for:`,
            record.challenge || '(not given)',
          ].join('\n'),
        }),
      });
      // Best-effort: the row is already saved. But log failures so they're
      // visible in Vercel logs instead of vanishing silently.
      if (!mail.ok) {
        console.error('Resend notification failed', mail.status, await mail.text());
      }
    } catch (err) {
      console.error('Resend notification threw', err);
    }
  }

  return res.status(200).json({ ok: true });
}
