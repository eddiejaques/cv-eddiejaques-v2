-- ============================================================================
-- Storage RLS for the `case-studies` bucket.
--
-- WHY: case-study HTML is served from this bucket through
-- /api/case-study/[slug] under the eddiejaques.me origin, and the files
-- contain inline <script>. If anon (or any public client) can WRITE to the
-- bucket, an attacker can overwrite a case study with malicious JS that then
-- executes as eddiejaques.me. Therefore: PUBLIC READ, NO PUBLIC WRITE.
--
-- Uploads must use the SERVICE ROLE key (server-side only), which bypasses
-- RLS. Run this in the Supabase SQL editor.
--
-- NOTE: this drops ALL existing policies on storage.objects and recreates a
-- single public-read policy. That is correct for this project (one bucket:
-- `case-studies`). If you later add other buckets, re-add their policies.
-- ============================================================================

-- Inspect current policies first (optional — run this SELECT on its own to see
-- what exists before/after):
--   select policyname, cmd, roles, qual, with_check
--   from pg_policies where schemaname = 'storage' and tablename = 'objects';

-- Make the bucket public-read.
update storage.buckets set public = true where id = 'case-studies';

-- Drop EVERY existing policy on storage.objects (handles dashboard-created
-- policies whose names we can't predict), then recreate only public read.
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
  loop
    execute format('drop policy if exists %I on storage.objects', p.policyname);
  end loop;
end $$;

-- Read-only for everyone. No insert/update/delete policies exist, so RLS
-- denies all writes from anon/authenticated. service_role bypasses RLS.
create policy "public read case-studies"
  on storage.objects
  for select
  to public
  using (bucket_id = 'case-studies');
