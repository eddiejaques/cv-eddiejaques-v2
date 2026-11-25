// Injects a value-first "Start a conversation" CTA before </body> in every
// case-study HTML file. Idempotent (skips files already containing the CTA)
// and re-runnable. After running, upload with: node scripts/upload-case-studies.mjs
//
// The CTA links to /contact?ref=<slug> so submissions are attributed to the
// case study that drove them.

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'public/case-studies';
const MARKER = 'id="ej-cta"';

function ctaHtml(slug) {
  return `
<section ${MARKER} style="background:radial-gradient(120% 100% at 0% 0%, rgba(26,138,122,0.10) 0%, transparent 55%),#F6F8F8;border-top:1px solid rgba(21,32,30,0.10);padding:72px 24px;font-family:Inter,sans-serif">
  <div style="max-width:680px;margin:0 auto;text-align:center">
    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#127063;font-weight:600;margin:0 0 16px">Let's talk</p>
    <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:clamp(26px,4vw,36px);line-height:1.1;letter-spacing:-0.02em;color:#15201E;margin:0 0 16px">Working on a similar problem?</h2>
    <p style="font-size:17px;line-height:1.6;color:#56635F;margin:0 auto 28px;max-width:52ch">If you're dealing with a similar data, AI, or martech problem—or hiring for a senior product role—send over a note and I'll share how I'd approach it.</p>
    <a href="/contact?ref=${slug}" style="display:inline-block;background:#FF5A00;color:#fff;font-weight:600;font-size:15px;text-decoration:none;padding:14px 28px;border-radius:6px">Get in touch →</a>
  </div>
</section>
`;
}

const files = readdirSync(DIR).filter((f) => f.endsWith('-case-study.html'));
let injected = 0, skipped = 0;

for (const file of files) {
  const path = join(DIR, file);
  let html = readFileSync(path, 'utf8');

  if (html.includes(MARKER)) { skipped++; continue; }

  const slug = file.replace(/-case-study\.html$/, '');
  const block = ctaHtml(slug);

  if (html.includes('</body>')) {
    html = html.replace('</body>', `${block}</body>`);
  } else {
    html += block; // fallback if no </body>
  }

  writeFileSync(path, html);
  injected++;
  console.log(`✓ ${file}  (ref=${slug})`);
}

console.log(`\nDone. Injected ${injected}, skipped ${skipped} (already had CTA).`);
console.log('Next: node scripts/upload-case-studies.mjs');
