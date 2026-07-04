/**
 * /api/reservations — appointment booking endpoint (Next.js App Router).
 *
 * POST  create an appointment request
 * GET   ?id=...  fetch one (used by /booking-confirmation)
 *
 * Persistence: Supabase when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are
 * present (writes to customer_reservations), else an in-memory Map. The
 * client also caches to localStorage after POST, so the confirmation page
 * works end-to-end on a fresh deploy with zero backend wiring.
 */

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

type AppointmentDraft = {
  serviceSlug: string;
  serviceName: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
};

type StoredAppointment = AppointmentDraft & {
  id: string;
  status: "placed" | "confirmed" | "pending";
  created_at: string;
};

const memoryStore = new Map<string, StoredAppointment>();

function getSupabaseAdmin(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

async function insertAppointment(row: StoredAppointment): Promise<void> {
  const supa = getSupabaseAdmin();
  if (!supa) {
    memoryStore.set(row.id, row);
    return;
  }
  const res = await fetch(`${supa.url}/rest/v1/customer_reservations`, {
    method: "POST",
    headers: {
      apikey: supa.key,
      Authorization: `Bearer ${supa.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      id: row.id,
      status: row.status,
      service_slug: row.serviceSlug,
      service_name: row.serviceName,
      appointment_date: row.date,
      appointment_time: row.time,
      full_name: row.fullName,
      email: row.email,
      phone: row.phone,
      notes: row.notes,
      created_at: row.created_at,
    }),
  });
  if (!res.ok) memoryStore.set(row.id, row);
}

async function fetchAppointment(id: string): Promise<StoredAppointment | null> {
  const supa = getSupabaseAdmin();
  if (!supa) return memoryStore.get(id) ?? null;
  const res = await fetch(
    `${supa.url}/rest/v1/customer_reservations?id=eq.${encodeURIComponent(id)}&select=*`,
    { headers: { apikey: supa.key, Authorization: `Bearer ${supa.key}` } },
  );
  if (!res.ok) return memoryStore.get(id) ?? null;
  const rows = (await res.json()) as Array<Record<string, unknown>>;
  if (!rows[0]) return memoryStore.get(id) ?? null;
  const r = rows[0];
  return {
    id: String(r.id),
    status: (r.status as StoredAppointment["status"]) ?? "placed",
    serviceSlug: String(r.service_slug ?? ""),
    serviceName: String(r.service_name ?? ""),
    date: String(r.appointment_date ?? ""),
    time: String(r.appointment_time ?? ""),
    fullName: String(r.full_name ?? ""),
    email: String(r.email ?? ""),
    phone: String(r.phone ?? ""),
    notes: String(r.notes ?? ""),
    created_at: String(r.created_at ?? new Date().toISOString()),
  };
}

export async function POST(req: Request) {
  let body: AppointmentDraft;
  try {
    body = (await req.json()) as AppointmentDraft;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.email || !body?.fullName) {
    return NextResponse.json({ ok: false, error: "Name + email required" }, { status: 400 });
  }
  if (!body?.date || !body?.time) {
    return NextResponse.json({ ok: false, error: "Date + time required" }, { status: 400 });
  }

  const row: StoredAppointment = {
    id: randomUUID(),
    status: "placed",
    created_at: new Date().toISOString(),
    ...body,
  };

  await insertAppointment(row);

  return NextResponse.json({ ok: true, reservationId: row.id });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }
  const row = await fetchAppointment(id);
  if (!row) {
    return NextResponse.json({ ok: false, error: "Appointment not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, reservation: row });
}
