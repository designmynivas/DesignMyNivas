"use client";

import { ArrowRight } from "lucide-react";
import { useBookingModal } from "@/context/booking-modal-context";

/** Primary conversion button: opens the booking modal, optionally with a service preselected. */
export default function BookButton({
  label = "Book a Consultation",
  service,
  source,
  className = "",
}: {
  label?: string;
  service?: string;
  source: string;
  className?: string;
}) {
  const { openBookingModal } = useBookingModal();

  return (
    <button
      type="button"
      className={`btn-cta ${className}`}
      onClick={() => openBookingModal({ service, source })}
    >
      {label} <ArrowRight size={16} aria-hidden="true" />
    </button>
  );
}
