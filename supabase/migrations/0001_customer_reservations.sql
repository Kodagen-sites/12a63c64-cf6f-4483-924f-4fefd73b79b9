-- Appointment requests captured by the B3 booking modal.
-- The /api/reservations route writes here when SUPABASE_URL +
-- SUPABASE_SERVICE_ROLE_KEY are set; otherwise it falls back to an
-- in-memory store + client-side localStorage cache, so the booking flow
-- works end-to-end even before this migration is applied.

create table if not exists public.customer_reservations (
  id uuid primary key,
  status text not null default 'placed',
  service_slug text not null,
  service_name text not null,
  appointment_date date not null,
  appointment_time text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  notes text default '',
  created_at timestamptz not null default now()
);

create index if not exists customer_reservations_created_at_idx
  on public.customer_reservations (created_at desc);

create index if not exists customer_reservations_email_idx
  on public.customer_reservations (email);

-- Row Level Security: the service role (used by the API route) bypasses RLS.
-- No anon/public policies are added, so appointment data is never readable
-- from the browser directly.
alter table public.customer_reservations enable row level security;
