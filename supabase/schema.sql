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

alter table resume_leads enable row level security;

-- anon can insert leads but cannot read them
create policy "anon insert only"
  on resume_leads
  for insert
  to anon
  with check (true);
