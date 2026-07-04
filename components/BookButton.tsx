"use client";

import { useBookingTrigger } from "@/components/booking/BookingFlow";
import MagneticButton from "@/components/motion/MagneticButton";

type Props = {
  label?: string;
  serviceSlug?: string;
  variant?: "solid" | "outline";
  className?: string;
};

/**
 * The single Book/Schedule CTA used across the whole site. Always opens the
 * B3 appointment modal via useBookingTrigger — never routes to /contact.
 */
export default function BookButton({
  label = "Book a visit",
  serviceSlug,
  variant = "solid",
  className = "",
}: Props) {
  const { open } = useBookingTrigger();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all";
  const styles =
    variant === "solid"
      ? "bg-primary text-ink hover:opacity-90 shadow-[0_10px_40px_-12px_rgba(78,168,255,0.7)]"
      : "border border-white/20 text-white hover:border-primary hover:text-primary";

  return (
    <MagneticButton
      onClick={() => open(serviceSlug)}
      ariaLabel={label}
      className={`${base} ${styles} ${className}`}
    >
      {label}
    </MagneticButton>
  );
}
