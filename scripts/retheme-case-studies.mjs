// Re-skins the standalone case-study HTML to the "Midnight Editorial" theme.
// Idempotent and re-runnable:
//   1. Swap hardcoded color literals the CSS variables can't reach (light
//      section backgrounds, the metric gradient, dark text colors).
//   2. Inject/refresh a CSS-variable override + new fonts before </head>,
//      wrapped in <!--ej-theme--> markers so re-runs UPDATE it in place.
//
// Note: ".results" and ".dark-panel" use the ink/dark color as a *background*
// (inverted panels in the light theme). Remapping --ink to bone would turn them
// cream, so we force them dark explicitly.
//
// After running: node scripts/upload-case-studies.mjs  (to push live)
// Preview without uploading: open public/case-studies/<file>.html directly.

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'public/case-studies';
const START = '<!--ej-theme-start-->';
const END = '<!--ej-theme-end-->';

const BLOCK = `${START}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,600&family=Hanken+Grotesk:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style id="ej-theme">
  :root{
    --bg:#100F0D!important;--surface:#1A1714!important;--ink:#EDE7DA!important;
    --muted:#A39B8C!important;--faint:#6A6357!important;
    --teal:#C6F94E!important;--teal-deep:#A6D938!important;
    --purple:#E6FF8A!important;--purple-deep:#C6F94E!important;
    --line:rgba(237,231,218,0.12)!important;--line-soft:rgba(237,231,218,0.07)!important;
    --teal-wash:rgba(198,249,78,0.08)!important;--purple-wash:rgba(198,249,78,0.05)!important;
    --display:'Fraunces',serif!important;--body:'Hanken Grotesk',sans-serif!important;--mono:'IBM Plex Mono',monospace!important;
  }
  body{background:#100F0D!important;color:#EDE7DA!important;-webkit-font-smoothing:antialiased}
  /* inverted panels: used var(--ink)/--dark as background in the light theme */
  .results,.dark-panel{background:#15201E!important}
  .results h2,.results .stat .k,.dark-panel,.dark-panel h2,.dark-panel h3{color:#EDE7DA!important}
  /* injected sticky nav */
  nav[style*="position:sticky"]{background:#100F0D!important;border-bottom:1px solid rgba(237,231,218,0.12)!important}
  nav[style*="position:sticky"] a:first-child{color:#C6F94E!important}
  nav[style*="position:sticky"] a:last-child{color:#A39B8C!important}
  /* injected CTA */
  #ej-cta{background:#15130F!important;border-top:1px solid rgba(237,231,218,0.12)!important}
  #ej-cta a{background:#C6F94E!important;color:#100F0D!important}
</style>
${END}`;

const LITERALS = [
  [/#F6F8F8/g, '#100F0D'],
  [/#FBFCFC/g, '#1A1714'],
  [/background:#FFFFFF/gi, 'background:#1A1714'],
  [/background:#fff\b/gi, 'background:#1A1714'],
  [/background-color:#FFFFFF/gi, 'background-color:#1A1714'],
  [/background-color:#fff\b/gi, 'background-color:#1A1714'],
  [/color:#15201E/g, 'color:#EDE7DA'],
  [/#5BD3BE/g, '#C6F94E'],
  [/#A88BE0/g, '#E6FF8A'],
  [/#FF5A00/gi, '#C6F94E'],
];

const files = readdirSync(DIR).filter((f) => f.endsWith('-case-study.html'));
let changed = 0;

for (const file of files) {
  const path = join(DIR, file);
  let html = readFileSync(path, 'utf8');
  const before = html;

  for (const [re, to] of LITERALS) html = html.replace(re, to);

  // Remove any previously injected block, then re-inject fresh.
  html = html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), '');
  if (html.includes('</head>')) html = html.replace('</head>', `${BLOCK}</head>`);

  if (html !== before) { writeFileSync(path, html); changed++; }
}

console.log(`Re-themed ${changed} file(s).`);
console.log('Preview: open public/case-studies/<file>.html directly. Upload when ready.');
