-- Run this in the Supabase SQL editor and share the output.
-- It shows the true RLS state so we can see what (if anything) the migrations
-- actually applied.

-- 1. Is RLS enabled/forced on resume_leads?  (both should be true)
select relname, relrowsecurity as rls_enabled, relforcerowsecurity as rls_forced
from pg_class
where relname = 'resume_leads';

-- 2. Policies on resume_leads. Expect exactly ONE: "anon insert only", cmd=INSERT.
--    If you see any cmd=SELECT/ALL or roles={public}, that's the leak.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'resume_leads';

-- 3. Policies on storage.objects. Expect exactly ONE: "public read case-studies",
--    cmd=SELECT. ANY insert/update/delete/all policy = bucket is writable.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'storage' and tablename = 'objects';

-- 4. Is the case-studies bucket public-read?
select id, public from storage.buckets where id = 'case-studies';
