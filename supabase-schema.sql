-- Run this in your Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/bfpgtbxaxlzuvpymgsed/sql

-- Progress table
create table if not exists progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  problem_slug text not null,
  status text check (status in ('solved', 'attempted')) default 'solved',
  solved_at timestamptz default now(),
  unique(user_id, problem_slug)
);

-- User code table
create table if not exists user_code (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  problem_slug text not null,
  code text,
  language text default 'python',
  updated_at timestamptz default now(),
  unique(user_id, problem_slug)
);

-- Enable Row Level Security
alter table progress enable row level security;
alter table user_code enable row level security;

-- Drop existing policies first (safe to re-run)
drop policy if exists "Users manage own progress" on progress;
drop policy if exists "Users manage own code" on user_code;

-- RLS policies (users can only see/modify their own data)
create policy "Users manage own progress"
  on progress for all using (auth.uid() = user_id);

create policy "Users manage own code"
  on user_code for all using (auth.uid() = user_id);
