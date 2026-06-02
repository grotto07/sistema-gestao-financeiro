-- FinanSmart database schema for Supabase.
-- Run this file in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

do $$
begin
  create type public.transaction_type as enum ('income', 'expense');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.transaction_status as enum ('pago', 'pendente', 'atrasado');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.recurrence_frequency as enum ('mensal', 'semanal', 'anual');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.wallet_type as enum ('bank', 'cash', 'credit_card', 'investment', 'digital_wallet');
exception
  when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  user_name text not null default 'Usuario',
  currency text not null default 'BRL' check (currency = 'BRL'),
  theme text not null default 'light' check (theme in ('light', 'dark')),
  compact_view boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type public.transaction_type not null,
  color text not null default '#2563eb',
  icon text not null default 'wallet',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, type, name)
);

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type public.wallet_type not null,
  initial_balance numeric(14,2) not null default 0,
  current_balance numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  wallet_id uuid references public.wallets(id) on delete set null,
  type public.transaction_type not null,
  title text not null,
  description text,
  amount numeric(14,2) not null check (amount >= 0),
  category text not null,
  payment_method text not null,
  date date not null,
  is_recurring boolean not null default false,
  recurrence_frequency public.recurrence_frequency,
  recurrence_end_date date,
  status public.transaction_status not null default 'pago',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint recurring_frequency_required check (
    (is_recurring = false and recurrence_frequency is null)
    or
    (is_recurring = true and recurrence_frequency is not null)
  )
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  target_amount numeric(14,2) not null check (target_amount > 0),
  current_amount numeric(14,2) not null default 0 check (current_amount >= 0),
  deadline date not null,
  category text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists categories_user_type_idx on public.categories(user_id, type);
create index if not exists wallets_user_idx on public.wallets(user_id);
create index if not exists transactions_user_date_idx on public.transactions(user_id, date desc);
create index if not exists transactions_user_type_idx on public.transactions(user_id, type);
create index if not exists transactions_user_category_idx on public.transactions(user_id, category);
create index if not exists goals_user_deadline_idx on public.goals(user_id, deadline);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists wallets_set_updated_at on public.wallets;
create trigger wallets_set_updated_at
before update on public.wallets
for each row execute function public.set_updated_at();

drop trigger if exists transactions_set_updated_at on public.transactions;
create trigger transactions_set_updated_at
before update on public.transactions
for each row execute function public.set_updated_at();

drop trigger if exists goals_set_updated_at on public.goals;
create trigger goals_set_updated_at
before update on public.goals
for each row execute function public.set_updated_at();

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

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, user_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'user_name', split_part(new.email, '@', 1), 'Usuario'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

create or replace view public.monthly_financial_summary as
select
  user_id,
  date_trunc('month', date)::date as month,
  sum(amount) filter (where type = 'income') as total_income,
  sum(amount) filter (where type = 'expense') as total_expense,
  coalesce(sum(amount) filter (where type = 'income'), 0) -
  coalesce(sum(amount) filter (where type = 'expense'), 0) as balance,
  count(*) as transaction_count
from public.transactions
group by user_id, date_trunc('month', date);

create or replace function public.seed_finansmart_example_data()
returns void
language plpgsql
security invoker
as $$
declare
  current_user_id uuid := auth.uid();
  nubank_id uuid := gen_random_uuid();
  cash_id uuid := gen_random_uuid();
  savings_id uuid := gen_random_uuid();
  card_id uuid := gen_random_uuid();
begin
  if current_user_id is null then
    raise exception 'Usuario nao autenticado.';
  end if;

  insert into public.categories (user_id, name, type, color, icon) values
    (current_user_id, 'Alimentacao', 'expense', '#ef4444', 'utensils'),
    (current_user_id, 'Transporte', 'expense', '#f97316', 'car'),
    (current_user_id, 'Moradia', 'expense', '#8b5cf6', 'home'),
    (current_user_id, 'Educacao', 'expense', '#2563eb', 'book'),
    (current_user_id, 'Lazer', 'expense', '#ec4899', 'sparkles'),
    (current_user_id, 'Saude', 'expense', '#14b8a6', 'heart'),
    (current_user_id, 'Assinaturas', 'expense', '#64748b', 'repeat'),
    (current_user_id, 'Compras', 'expense', '#a855f7', 'shopping'),
    (current_user_id, 'Outros', 'expense', '#71717a', 'wallet'),
    (current_user_id, 'Salario', 'income', '#16a34a', 'briefcase'),
    (current_user_id, 'Freelance', 'income', '#0ea5e9', 'laptop'),
    (current_user_id, 'Vendas', 'income', '#22c55e', 'store'),
    (current_user_id, 'Investimentos', 'income', '#6366f1', 'trending'),
    (current_user_id, 'Reembolso', 'income', '#06b6d4', 'receipt'),
    (current_user_id, 'Outros', 'income', '#10b981', 'plus')
  on conflict (user_id, type, name) do update set
    color = excluded.color,
    icon = excluded.icon;

  insert into public.wallets (id, user_id, name, type, initial_balance, current_balance) values
    (nubank_id, current_user_id, 'Nubank', 'digital_wallet', 2300, 2300),
    (cash_id, current_user_id, 'Carteira fisica', 'cash', 250, 250),
    (savings_id, current_user_id, 'Poupanca', 'investment', 1700, 1700),
    (card_id, current_user_id, 'Cartao empresarial', 'credit_card', 0, -420);

  insert into public.goals (user_id, title, target_amount, current_amount, deadline, category) values
    (current_user_id, 'Reserva de emergencia', 5000, 2500, '2026-12-30', 'Seguranca'),
    (current_user_id, 'Comprar notebook', 3500, 1350, '2026-09-15', 'Trabalho'),
    (current_user_id, 'Viagem de ferias', 4000, 920, '2026-11-20', 'Lazer');

  insert into public.transactions (
    user_id,
    wallet_id,
    type,
    title,
    description,
    amount,
    category,
    payment_method,
    date,
    is_recurring,
    recurrence_frequency,
    status
  ) values
    (current_user_id, nubank_id, 'income', 'Salario', 'Pagamento mensal', 3500, 'Salario', 'Transferencia bancaria', '2026-06-01', true, 'mensal', 'pago'),
    (current_user_id, nubank_id, 'income', 'Freelance Landing Page', null, 850, 'Freelance', 'Pix', '2026-06-05', false, null, 'pago'),
    (current_user_id, nubank_id, 'income', 'Venda de produto digital', null, 300, 'Vendas', 'Pix', '2026-06-10', false, null, 'pago'),
    (current_user_id, nubank_id, 'expense', 'Supermercado', null, 420, 'Alimentacao', 'Cartao de debito', '2026-06-03', false, null, 'pago'),
    (current_user_id, nubank_id, 'expense', 'Internet', null, 120, 'Assinaturas', 'Boleto', '2026-06-08', true, 'mensal', 'pendente'),
    (current_user_id, nubank_id, 'expense', 'Energia', null, 230, 'Moradia', 'Boleto', '2026-06-12', true, 'mensal', 'pendente'),
    (current_user_id, cash_id, 'expense', 'Combustivel', null, 180, 'Transporte', 'Dinheiro', '2026-06-15', false, null, 'pago'),
    (current_user_id, card_id, 'expense', 'Netflix', null, 39.90, 'Assinaturas', 'Cartao de credito', '2026-06-18', true, 'mensal', 'pago'),
    (current_user_id, card_id, 'expense', 'Curso online', null, 97, 'Educacao', 'Cartao de credito', '2026-06-20', false, null, 'pago');
end;
$$;
