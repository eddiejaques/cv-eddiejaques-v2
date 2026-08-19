// Injects the GA4 tag into the built case-study HTML in dist/. These pages are
// served as standalone documents straight from the CDN — no SPA shell, no
// serverless function — so nothing else can add analytics to them at runtime.
//
// Runs on dist/, never on public/, so the checked-in sources stay pristine and
// the case-study-generator pipeline doesn't have to know about analytics.
// No-ops unless VITE_GA_ID is a valid G-... id.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DIR = 'dist/case-studies';
const MARKER = 'ej-ga-injected';

function gaId() {
  if (process.env.VITE_GA_ID) return process.env.VITE_GA_ID;
  if (!existsSync('.env')) return undefined;
  const match = readFileSync('.env', 'utf8').match(/^VITE_GA_ID=(.*)$/m);
  return match?.[1].trim();
}

const GA_ID = gaId();

if (!GA_ID || !/^G-[A-Z0-9]+$/i.test(GA_ID)) {
  console.log('inject-ga: no valid VITE_GA_ID — skipping.');
  process.exit(0);
}
if (!existsSync(DIR)) {
  console.log(`inject-ga: ${DIR} not found — skipping.`);
  process.exit(0);
}

// Consent Mode v2: deny by default, then honour the choice the CMP stored in
// same-origin localStorage. Same contract the SPA uses.
const tag =
  `<!-- ${MARKER} --><script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>` +
  `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
  `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',` +
  `ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});` +
  `try{if(localStorage.getItem('cmp-consent-v1')==='granted'){` +
  `gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}` +
  `gtag('js',new Date());gtag('config','${GA_ID}');</script>`;

const files = readdirSync(DIR).filter((f) => f.endsWith('-case-study.html'));
let injected = 0;

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  if (html.includes(MARKER)) continue;
  if (!/<head[^>]*>/i.test(html)) {
    console.warn(`inject-ga: no <head> in ${file} — skipped.`);
    continue;
  }
  writeFileSync(path, html.replace(/<head[^>]*>/i, (m) => m + tag));
  injected++;
}

console.log(`inject-ga: ${injected} of ${files.length} case studies tagged.`);
