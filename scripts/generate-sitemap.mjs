import { writeFileSync, readdirSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE_URL = 'https://eddiejaques.me';

const caseStudiesSrc = readFileSync(path.join(root, 'src/data/caseStudies.ts'), 'utf-8');
const caseStudySlugs = [...caseStudiesSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const blogDir = path.join(root, 'src/data/blogPosts');
const blogSlugs = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => matter(readFileSync(path.join(blogDir, f), 'utf-8')).data.slug);

const staticRoutes = ['/', '/case-studies', '/blog', '/resume', '/about'];

const urls = [
  ...staticRoutes,
  ...caseStudySlugs.map((slug) => `/case-studies/${slug}`),
  ...blogSlugs.map((slug) => `/blog/${slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`).join('\n')}
</urlset>
`;

writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`Wrote public/sitemap.xml with ${urls.length} URLs`);
