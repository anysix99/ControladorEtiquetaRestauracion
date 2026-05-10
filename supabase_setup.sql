create table if not exists public.food_expiry_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.food_expiry_state enable row level security;

drop policy if exists "food_expiry_state_select" on public.food_expiry_state;
drop policy if exists "food_expiry_state_insert" on public.food_expiry_state;
drop policy if exists "food_expiry_state_update" on public.food_expiry_state;

create policy "food_expiry_state_select"
on public.food_expiry_state
for select
to anon
using (true);

create policy "food_expiry_state_insert"
on public.food_expiry_state
for insert
to anon
with check (true);

create policy "food_expiry_state_update"
on public.food_expiry_state
for update
to anon
using (true)
with check (true);
