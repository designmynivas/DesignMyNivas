"use client";

import { useBookingModal } from "@/context/booking-modal-context";

export default function HeroBookingButton({
  className = "",
  arrowClassName = "",
}: {
  className?: string;
  arrowClassName?: string;
}) {
  const { openBookingModal } = useBookingModal();

  return (
    <button
      type="button"
      onClick={() => openBookingModal({ source: "hero-primary" })}
      className={`btn btn-primary ${className}`}
      aria-label="Book a Consultation"
    >
      <span>Book a Consultation</span>
      <span className={arrowClassName} aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </button>
  );
}
