import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const env = readFileSync('.env', 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k && v.length) acc[k.trim()] = v.join('=').trim();
    return acc;
  }, {});

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY
);

const DIR = 'public/case-studies';
const BUCKET = 'case-studies';

const files = readdirSync(DIR).filter(f => f.endsWith('.html'));

console.log(`Uploading ${files.length} files to Supabase Storage bucket "${BUCKET}"...\n`);

for (const file of files) {
  const content = readFileSync(join(DIR, file));
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(file, content, {
      contentType: 'text/html',
      upsert: true,
    });

  if (error) {
    console.error(`✗ ${file}: ${error.message}`);
  } else {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(file);
    console.log(`✓ ${file}`);
    console.log(`  ${data.publicUrl}\n`);
  }
}

console.log('Done.');
