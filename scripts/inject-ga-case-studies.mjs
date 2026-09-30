// Injects the GA4 and Matomo tags into the built case-study HTML in dist/. These pages are
// served as standalone documents straight from the CDN — no SPA shell, no
// serverless function — so nothing else can add analytics to them at runtime.
//
// Runs on dist/, never on public/, so the checked-in sources stay pristine and
// the case-study-generator pipeline doesn't have to know about analytics.
// GA is skipped unless VITE_GA_ID is a valid G-... id; Matomo always runs.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DIR = 'dist/case-studies';
const MARKER = 'ej-ga-injected';
const MATOMO_MARKER = 'ej-matomo-injected';

function gaId() {
  if (process.env.VITE_GA_ID) return process.env.VITE_GA_ID;
  if (!existsSync('.env')) return undefined;
  const match = readFileSync('.env', 'utf8').match(/^VITE_GA_ID=(.*)$/m);
  return match?.[1].trim();
}

const GA_ID = gaId();

const HAS_GA = Boolean(GA_ID && /^G-[A-Z0-9]+$/i.test(GA_ID));
if (!HAS_GA) console.log('inject-ga: no valid VITE_GA_ID — GA skipped.');

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

// Matomo, cookieless until the CMP stores a 'granted' choice (same contract
// as index.html).
const matomoTag =
  `<!-- ${MATOMO_MARKER} --><script>var _paq=window._paq=window._paq||[];` +
  `_paq.push(['requireCookieConsent']);` +
  `try{if(localStorage.getItem('cmp-consent-v1')==='granted'){_paq.push(['setCookieConsentGiven']);}}catch(e){}` +
  `_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);` +
  `(function(){var u="https://eddiejaques.matomo.cloud/";_paq.push(['setTrackerUrl',u+'matomo.php']);` +
  `_paq.push(['setSiteId','1']);var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];` +
  `g.async=true;g.src='https://cdn.matomo.cloud/eddiejaques.matomo.cloud/matomo.js';s.parentNode.insertBefore(g,s);})();</script>`;

const files = readdirSync(DIR).filter((f) => f.endsWith('-case-study.html'));
let gaInjected = 0;
let matomoInjected = 0;

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  if (!/<head[^>]*>/i.test(html)) {
    console.warn(`inject-ga: no <head> in ${file} — skipped.`);
    continue;
  }
  let add = '';
  if (HAS_GA && !html.includes(MARKER)) {
    add += tag;
    gaInjected++;
  }
  if (!html.includes(MATOMO_MARKER)) {
    add += matomoTag;
    matomoInjected++;
  }
  if (add) writeFileSync(path, html.replace(/<head[^>]*>/i, (m) => m + add));
}

console.log(
  `inject-ga: ${gaInjected} GA, ${matomoInjected} Matomo of ${files.length} case studies tagged.`,
);
