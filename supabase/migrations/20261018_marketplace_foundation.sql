-- DRAFT ONLY — NOT APPLIED.
-- This file is a design artifact until a dedicated AI FACTORY Supabase project is confirmed.
-- Never run against the currently connected Supabase project without verifying ownership.
-- Razorpay secrets/webhook events must remain server-side; do not expose service_role.

create extension if not exists pgcrypto;

create type public.marketplace_listing_kind as enum ('tool', 'service');
create type public.marketplace_seller_status as enum ('pending', 'approved', 'rejected', 'suspended');
create type public.marketplace_listing_status as enum ('draft', 'pending_review', 'published', 'rejected', 'archived');

create table public.marketplace_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  country_code text not null default 'IN' check (country_code = 'IN'),
  seller_status public.marketplace_seller_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.marketplace_profiles(user_id) on delete restrict,
  kind public.marketplace_listing_kind not null,
  title text not null check (char_length(title) between 3 and 100),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  summary text not null check (char_length(summary) between 20 and 240),
  description text not null check (char_length(description) between 40 and 10000),
  category text not null check (char_length(category) between 2 and 60),
  price_paise bigint not null check (price_paise >= 0 and price_paise <= 1000000000),
  currency text not null default 'INR' check (currency = 'INR'),
  billing_model text not null check (billing_model in ('free','one_time','per_project','monthly','hourly')),
  demo_url text,
  delivery_terms text,
  status public.marketplace_listing_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.marketplace_profiles enable row level security;
alter table public.marketplace_listings enable row level security;

-- Public can read approved, published listings only.
create policy "Public can read published listings"
on public.marketplace_listings for select to anon, authenticated
using (status = 'published');

-- Sellers may read their own listings, including drafts and moderation state.
create policy "Sellers can read own listings"
on public.marketplace_listings for select to authenticated
using (seller_id = (select auth.uid()));

-- Sellers may create only their own draft listing. Approval status cannot be set by clients.
create policy "Sellers can create own drafts"
on public.marketplace_listings for insert to authenticated
with check (
  seller_id = (select auth.uid())
  and status = 'draft'
  and exists (
    select 1 from public.marketplace_profiles p
    where p.user_id = (select auth.uid())
      and p.seller_status = 'approved'
  )
);

create policy "Sellers can update own draft listings"
on public.marketplace_listings for update to authenticated
using (seller_id = (select auth.uid()) and status in ('draft','rejected'))
with check (seller_id = (select auth.uid()) and status in ('draft','pending_review','rejected'));

create policy "Users can read own marketplace profile"
on public.marketplace_profiles for select to authenticated
using (user_id = (select auth.uid()));

create policy "Users can create own pending seller profile"
on public.marketplace_profiles for insert to authenticated
with check (user_id = (select auth.uid()) and seller_status = 'pending' and country_code = 'IN');

-- Intentionally no client update/delete policy for seller status, no public profile access,
-- no client write access to orders/payment attempts/webhook events, and no checkout RPC.
-- A future migration must add server-controlled orders/payment tables, safe grants,
-- moderation permissions, indexes, rate limits, and tests before real transactions.
