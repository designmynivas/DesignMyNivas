"use client";

import { useBookingModal } from "@/context/booking-modal-context";

export default function ProjectsHeaderCTA() {
  const { openBookingModal } = useBookingModal();

  return (
    <button
      type="button"
      onClick={() => openBookingModal({ source: "projects-page-header" })}
      className="btn btn-primary projects-cta-btn"
      aria-label="Discuss Your Home"
    >
      <span>Discuss Your Home</span>
      <span aria-hidden="true">&rarr;</span>

      <style jsx>{`
        :global(.projects-cta-btn) {
          height: 48px;
          padding: 0 1.85rem;
          font-size: 0.9375rem;
          font-weight: 600;
          white-space: nowrap;
          color: #FFFFFF !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.52) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.projects-cta-btn:hover) {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          border-color: #1FA0D6 !important;
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -4px rgba(41, 171, 226, 0.7) !important;
        }

        @media (max-width: 800px) {
          :global(.projects-cta-btn) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </button>
  );
}
