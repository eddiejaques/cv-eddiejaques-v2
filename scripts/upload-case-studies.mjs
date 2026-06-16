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

// Writes must use the service_role key (server-side only, never VITE_-prefixed
// so Vite cannot inline it into the client bundle). The bucket denies writes
// from the public anon key — see supabase/storage-policies.sql.
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceKey) {
  console.error(
    'Missing SUPABASE_SERVICE_ROLE_KEY in .env — required to upload to Storage.\n' +
    'Find it in Supabase → Project Settings → API → service_role (keep it secret).'
  );
  process.exit(1);
}

const supabase = createClient(env.VITE_SUPABASE_URL, serviceKey);

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
