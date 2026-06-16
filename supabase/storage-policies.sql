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
-- RLS. The anon key — which ships in the client bundle — must NOT be able to
-- write. Run this in the Supabase SQL editor.
-- ============================================================================

-- Make the bucket public-read (objects readable, not listable-as-private).
update storage.buckets set public = true where id = 'case-studies';

-- Remove any previously-created permissive policies on this bucket.
drop policy if exists "anon insert case-studies"  on storage.objects;
drop policy if exists "anon update case-studies"  on storage.objects;
drop policy if exists "anon write case-studies"   on storage.objects;
drop policy if exists "public read case-studies"  on storage.objects;

-- Read-only for everyone (anon + authenticated). No insert/update/delete
-- policies are defined, so RLS denies all writes from those roles.
create policy "public read case-studies"
  on storage.objects
  for select
  to public
  using (bucket_id = 'case-studies');

-- NOTE: do NOT add insert/update/delete policies for anon/authenticated here.
-- The upload script authenticates with the service_role key, which is exempt
-- from RLS and can still write.
