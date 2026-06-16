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

-- Column-level constraints (apply even to service_role writes).
-- Guard against oversized / malformed payloads and storage abuse.
alter table resume_leads
  drop constraint if exists resume_leads_email_len,
  drop constraint if exists resume_leads_email_shape,
  drop constraint if exists resume_leads_name_len,
  drop constraint if exists resume_leads_source_len,
  drop constraint if exists resume_leads_message_len;

alter table resume_leads
  add constraint resume_leads_email_len   check (char_length(email) <= 254),
  add constraint resume_leads_email_shape check (position('@' in email) > 1),
  add constraint resume_leads_name_len    check (name is null or char_length(name) <= 120),
  add constraint resume_leads_source_len  check (source is null or char_length(source) <= 40),
  add constraint resume_leads_message_len check (message is null or char_length(message) <= 2000);

alter table resume_leads enable row level security;
-- Defense in depth: deny by default even if the table is altered later.
alter table resume_leads force row level security;

-- anon may INSERT leads only. No select/update/delete policies exist for anon,
-- so RLS denies reads/edits of captured emails by default.
drop policy if exists "anon insert only" on resume_leads;
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
