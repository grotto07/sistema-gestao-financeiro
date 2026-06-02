-- FinanSmart - Step 1: tables, enums, indexes and updated_at triggers.
-- Run this first in Supabase SQL Editor.

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
