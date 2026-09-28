"use client";

import { useBookingModal } from "@/context/booking-modal-context";

interface GuideBookingButtonProps {
  source?: string;
  label?: string;
  className?: string;
}

export default function GuideBookingButton({
  source = "guide-cta",
  label = "Discuss Your Home with Benson Cheripelli",
  className = "",
}: GuideBookingButtonProps) {
  const { openBookingModal } = useBookingModal();

  return (
    <button
      type="button"
      onClick={() => openBookingModal({ source })}
      className={`btn btn-primary ${className}`}
      aria-label={label}
    >
      <span>{label}</span>
      <span aria-hidden="true" style={{ display: "inline-block", marginLeft: "0.4rem" }}>
        &rarr;
      </span>
    </button>
  );
}
