"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, CalendarCheck } from "lucide-react";
import { siteConfig } from "@/content/site-config";

type Appointment = {
  id: string;
  status: "placed" | "confirmed" | "pending";
  serviceName: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
};

function Confirmation() {
  const params = useSearchParams();
  const reservationId = params?.get("id") ?? "";
  const [r, setR] = useState<Appointment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reservationId) {
      setError("No appointment reference provided.");
      return;
    }
    let cancelled = false;
    try {
      const cached = window.localStorage.getItem(`brightsmile-appointment:${reservationId}`);
      if (cached) {
        setR(JSON.parse(cached));
        return;
      }
    } catch { /* private mode */ }
    (async () => {
      try {
        const res = await fetch(`/api/reservations?id=${encodeURIComponent(reservationId)}`);
        if (!res.ok) throw new Error("Appointment not found");
        const data = await res.json();
        if (!cancelled) setR(data.reservation ?? null);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load the appointment.");
      }
    })();
    return () => { cancelled = true; };
  }, [reservationId]);

  const fmtDate = (iso: string) => {
    if (!iso) return "";
    try {
      return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      });
    } catch { return iso; }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg py-24">
      <div className="container-x max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
          <Check size={26} className="text-primary" />
        </div>
        <h1 className="mb-4 font-display text-3xl font-light text-white lg:text-4xl">
          Your visit is booked.
        </h1>
        <p className="mb-8 leading-relaxed text-white/70">
          Thanks for choosing {siteConfig.company.name}. Our front desk will confirm the details
          shortly by phone or email. We can&apos;t wait to see your smile.
        </p>

        {reservationId && (
          <p className="mb-6 text-xs uppercase tracking-widest text-white/50">
            Reference: <span className="tabular-nums text-primary">{reservationId.slice(0, 8).toUpperCase()}</span>
          </p>
        )}

        {error && (
          <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {r && (
          <div className="mb-8 space-y-2 rounded-xl border border-white/10 bg-surface px-6 py-5 text-left text-sm">
            <Row label="Service" value={r.serviceName} />
            <Row label="Date" value={fmtDate(r.date)} />
            <Row label="Time" value={r.time} />
            <Row label="Name" value={r.fullName} />
          </div>
        )}

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-90">
            Back to home
          </Link>
          <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/40">
            <CalendarCheck size={15} /> Explore services
          </Link>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/55">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-bg" />}>
      <Confirmation />
    </Suspense>
  );
}
