-- ============================================================================
-- contact_requests: inbound "start a conversation" submissions from the
-- value-first CTA on case studies. Unlike resume_leads, this DOES capture a
-- free-text challenge and the originating case study (attribution).
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

-- RLS first, so the security fix lands regardless of later statements.
alter table contact_requests enable row level security;
alter table contact_requests force row level security;

-- Wipe any pre-existing policies, then create a single insert-only policy.
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

-- anon may INSERT only. No select/update/delete policies => captured contact
-- details cannot be read back by the public key.
create policy "anon insert contact"
  on contact_requests
  for insert
  to anon
  with check (
    email is not null
    and char_length(email) <= 254
    and position('@' in email) > 1
    and (name is null or char_length(name) <= 120)
    and (company is null or char_length(company) <= 120)
    and (challenge is null or char_length(challenge) <= 2000)
    and (case_study_ref is null or char_length(case_study_ref) <= 100)
    and source = 'contact-form'
  );

-- Length guards for all writers (NOT VALID: don't abort on pre-existing rows).
alter table contact_requests
  drop constraint if exists contact_requests_email_len,
  drop constraint if exists contact_requests_challenge_len;

alter table contact_requests
  add constraint contact_requests_email_len     check (char_length(email) <= 254) not valid,
  add constraint contact_requests_challenge_len check (challenge is null or char_length(challenge) <= 2000) not valid;
