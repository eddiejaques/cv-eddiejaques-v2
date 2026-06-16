create table if not exists resume_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  email text not null,
  company text,
  role text,
  message text,
  source text
);

-- ---------------------------------------------------------------------------
-- Row Level Security (do this FIRST so the security fix lands even if a later
-- statement is skipped).
-- ---------------------------------------------------------------------------
alter table resume_leads enable row level security;
-- Defense in depth: deny by default even if the table is altered later.
alter table resume_leads force row level security;

-- Drop EVERY existing policy on resume_leads first. Multiple permissive
-- policies are OR'd together by Postgres, so a leftover `with check (true)`
-- (or any SELECT policy that exposes captured emails) would defeat the
-- stricter setup below.
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'resume_leads'
  loop
    execute format('drop policy if exists %I on resume_leads', p.policyname);
  end loop;
end $$;

-- anon may INSERT leads only. No select/update/delete policies exist for anon,
-- so RLS denies reads/edits of captured emails by default.
create policy "anon insert only"
  on resume_leads
  for insert
  to anon
  with check (
    -- Only the columns the public form actually submits may be set.
    email is not null
    and char_length(email) <= 254
    and position('@' in email) > 1
    and (name is null or char_length(name) <= 120)
    and source = 'resume-gate'
    -- Block anon from stuffing arbitrary data into unused columns.
    and company is null
    and role is null
    and message is null
  );

-- ---------------------------------------------------------------------------
-- Column-level constraints (apply to ALL writers, incl. service_role).
-- Added NOT VALID so pre-existing rows can't abort this migration; they still
-- apply to every new insert/update.
-- ---------------------------------------------------------------------------
alter table resume_leads
  drop constraint if exists resume_leads_email_len,
  drop constraint if exists resume_leads_email_shape,
  drop constraint if exists resume_leads_name_len,
  drop constraint if exists resume_leads_source_len,
  drop constraint if exists resume_leads_message_len;

alter table resume_leads
  add constraint resume_leads_email_len   check (char_length(email) <= 254) not valid,
  add constraint resume_leads_email_shape check (position('@' in email) > 1) not valid,
  add constraint resume_leads_name_len    check (name is null or char_length(name) <= 120) not valid,
  add constraint resume_leads_source_len  check (source is null or char_length(source) <= 40) not valid,
  add constraint resume_leads_message_len check (message is null or char_length(message) <= 2000) not valid;
