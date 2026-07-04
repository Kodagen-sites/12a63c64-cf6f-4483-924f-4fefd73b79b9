"use client";

/**
 * BookingFlow (variant B3) — appointment-booking router for the medical
 * industry gate. Provides a trigger context so ANY "Book" / "Schedule" CTA
 * anywhere in the app can open the centered modal wizard via
 * useBookingTrigger().open(serviceSlug?).
 *
 * Mounted once in app/layout.tsx, wrapping the whole app:
 *   <BookingFlow>{children}</BookingFlow>
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import BookingModal from "./BookingModal";

interface BookingTriggerContextType {
  open: (defaultServiceSlug?: string) => void;
  close: () => void;
  isOpen: boolean;
}

const BookingTriggerContext = createContext<BookingTriggerContextType | null>(null);

export function useBookingTrigger(): BookingTriggerContextType {
  const ctx = useContext(BookingTriggerContext);
  if (ctx) return ctx;
  // Safe no-op if a CTA renders outside the provider (e.g. in isolation).
  return { open: () => {}, close: () => {}, isOpen: false };
}

export default function BookingFlow({ children }: { children?: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultSlug, setDefaultSlug] = useState<string | undefined>();

  const open = useCallback((slug?: string) => {
    setDefaultSlug(slug);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BookingTriggerContext.Provider value={{ open, close, isOpen }}>
      {children}
      <BookingModal open={isOpen} onClose={close} defaultServiceSlug={defaultSlug} />
    </BookingTriggerContext.Provider>
  );
}
