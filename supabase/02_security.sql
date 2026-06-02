-- FinanSmart - Step 2: row level security and policies.
-- Run this after 01_schema.sql.

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.wallets enable row level security;
alter table public.transactions enable row level security;
alter table public.goals enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "categories_crud_own" on public.categories;
create policy "categories_crud_own"
on public.categories for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "wallets_crud_own" on public.wallets;
create policy "wallets_crud_own"
on public.wallets for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "transactions_crud_own" on public.transactions;
create policy "transactions_crud_own"
on public.transactions for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "goals_crud_own" on public.goals;
create policy "goals_crud_own"
on public.goals for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
