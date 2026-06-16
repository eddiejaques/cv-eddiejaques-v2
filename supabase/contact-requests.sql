-- ============================================================================
-- contact_requests: inbound "start a conversation" submissions from the
-- value-first CTA on case studies.
--
-- Writes go through the /api/contact serverless function using the service_role
-- key (which bypasses RLS). So we enable RLS with NO policies => the public
-- anon key cannot read OR write this table at all. Most locked-down posture.
-- Run in the Supabase SQL editor (project hpsyoanvfysdntpgqebm).
-- ============================================================================

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  email text not null,
  company text,
  challenge text,        -- "what are you trying to solve / hire for"
  case_study_ref text,   -- slug of the case study the visitor came from
  source text
);

-- RLS on + forced, and drop any policies => only service_role (bypassrls) writes.
alter table contact_requests enable row level security;
alter table contact_requests force row level security;

do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'contact_requests'
  loop
    execute format('drop policy if exists %I on contact_requests', p.policyname);
  end loop;
end $$;

-- Length guards for all writers (NOT VALID: don't abort on pre-existing rows).
alter table contact_requests
  drop constraint if exists contact_requests_email_len,
  drop constraint if exists contact_requests_challenge_len;

alter table contact_requests
  add constraint contact_requests_email_len     check (char_length(email) <= 254) not valid,
  add constraint contact_requests_challenge_len check (challenge is null or char_length(challenge) <= 2000) not valid;
