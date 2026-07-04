"use client";

/**
 * BookingModal (B3) — centered appointment wizard for the dental studio.
 * 3 steps: Choose (service + date + time) → Details (name/email/phone) →
 * Review. Submits to /api/reservations, caches client-side, and routes to
 * /booking-confirmation. Midnight-azure theme.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronRight, Loader2, CalendarCheck } from "lucide-react";
import { siteConfig } from "@/content/site-config";

export type AppointmentDraft = {
  serviceSlug: string;
  serviceName: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
};

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

interface Props {
  open: boolean;
  onClose: () => void;
  defaultServiceSlug?: string;
}

export default function BookingModal({ open, onClose, defaultServiceSlug }: Props) {
  const router = useRouter();
  const services = siteConfig.services;

  const [step, setStep] = useState<"choose" | "details" | "review">("choose");
  const [serviceSlug, setServiceSlug] = useState(defaultServiceSlug ?? services[0]?.slug ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const service = services.find((s) => s.slug === serviceSlug);

  useEffect(() => {
    if (open) {
      setStep("choose");
      setSubmitting(false);
      if (defaultServiceSlug) setServiceSlug(defaultServiceSlug);
    }
  }, [open, defaultServiceSlug]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = orig;
    };
  }, [open, onClose]);

  const canChoose = serviceSlug && date && time;
  const canDetails =
    fullName.trim().length >= 2 && /\S+@\S+\.\S+/.test(email) && phone.trim().length >= 6;

  async function handleConfirm() {
    if (!service) return;
    setSubmitting(true);
    const draft: AppointmentDraft = {
      serviceSlug, serviceName: service.name, date, time, fullName, email, phone, notes,
    };
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (!data?.ok) throw new Error(data?.error || "Booking failed");
      try {
        window.localStorage.setItem(
          `brightsmile-appointment:${data.reservationId}`,
          JSON.stringify({ id: data.reservationId, status: "placed", ...draft, created_at: new Date().toISOString() }),
        );
      } catch { /* private mode */ }
      onClose();
      router.push(`/booking-confirmation?id=${encodeURIComponent(data.reservationId)}`);
    } catch (err) {
      console.error("Booking failed:", err);
      setSubmitting(false);
    }
  }

  if (!open) return null;
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button type="button" onClick={onClose} aria-label="Close" className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative flex w-full max-w-lg max-h-[92vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <h2 className="flex items-center gap-2 font-display text-base font-medium text-white">
            <CalendarCheck size={18} className="text-primary" />
            {step === "choose" ? "Book your visit" : step === "details" ? "Your details" : "Review & confirm"}
          </h2>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-1 text-white/60 hover:bg-white/5 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 border-b border-white/5 px-6 py-3">
          <Dot active={step === "choose"} done={step !== "choose"} />
          <Dot active={step === "details"} done={step === "review"} />
          <Dot active={step === "review"} done={false} />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === "choose" && (
            <div className="space-y-4">
              <Labeled label="Service">
                <select
                  value={serviceSlug}
                  onChange={(e) => setServiceSlug(e.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none [&>option]:text-ink"
                >
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </Labeled>
              <Labeled label="Preferred date">
                <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]" />
              </Labeled>
              <div>
                <span className="mb-2 block text-[10px] uppercase tracking-widest text-white/50">Preferred time</span>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded-lg border px-2 py-2 text-xs transition-colors ${
                        time === t ? "border-primary bg-primary/15 text-white" : "border-white/10 text-white/70 hover:border-white/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="space-y-3">
              <Field placeholder="Full name" type="text" value={fullName} onChange={setFullName} />
              <Field placeholder="Email" type="email" value={email} onChange={setEmail} />
              <Field placeholder="Phone" type="tel" value={phone} onChange={setPhone} />
              <textarea
                placeholder="Anything we should know? (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-primary/60"
              />
            </div>
          )}

          {step === "review" && (
            <div className="space-y-3 text-sm">
              <Row label="Service" value={service?.name ?? ""} />
              <Row label="Date" value={date} />
              <Row label="Time" value={time} />
              <Row label="Name" value={fullName} />
              <Row label="Email" value={email} />
              <Row label="Phone" value={phone} />
              {notes && <Row label="Notes" value={notes} />}
              <p className="pt-2 text-xs leading-relaxed text-white/50">
                This is a request — our front desk will confirm your appointment by phone or email shortly.
              </p>
            </div>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-white/8 px-6 py-4">
          {step === "choose" && (
            <button onClick={() => setStep("details")} disabled={!canChoose} className="ml-auto inline-flex items-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-40">
              Continue <ChevronRight size={14} />
            </button>
          )}
          {step === "details" && (
            <>
              <button onClick={() => setStep("choose")} className="text-sm text-white/55 hover:text-white">Back</button>
              <button onClick={() => setStep("review")} disabled={!canDetails} className="inline-flex items-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-40">
                Continue <ChevronRight size={14} />
              </button>
            </>
          )}
          {step === "review" && (
            <>
              <button onClick={() => setStep("details")} className="text-sm text-white/55 hover:text-white">Back</button>
              <button onClick={handleConfirm} disabled={submitting} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50">
                {submitting && <Loader2 size={14} className="animate-spin" />}
                {submitting ? "Booking…" : "Confirm booking"}
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

function Dot({ active, done }: { active: boolean; done: boolean }) {
  return <span className={`h-1.5 rounded-full transition-all ${active ? "w-8 bg-primary" : done ? "w-3 bg-primary/60" : "w-3 bg-white/15"}`} />;
}
function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-colors focus-within:border-primary/60">
      <span className="mb-0.5 block text-[10px] uppercase tracking-widest text-white/50">{label}</span>
      {children}
    </label>
  );
}
function Field({ placeholder, type, value, onChange }: { placeholder: string; type: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-primary/60"
    />
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/55">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}
