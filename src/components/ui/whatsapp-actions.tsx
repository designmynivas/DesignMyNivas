"use client";

import { useState, useEffect } from "react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { useBookingModal } from "@/context/booking-modal-context";

export default function WhatsAppActions() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { openBookingModal } = useBookingModal();

  const whatsappUrl = getWhatsAppUrl(
    "Hello Design My Nivas, I would like to enquire about residential interior design for my home."
  );

  /* Show mobile sticky bar only after scrolling past the hero section (~100vh) */
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setShowStickyBar(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookConsultation = () => {
    openBookingModal({ source: "mobile-sticky-bar" });
  };

  return (
    <>
      {/* Mobile Sticky Bottom Action Bar — Hidden in hero, visible after scroll */}
      <div
        className={`mobile-sticky-actions ${showStickyBar ? "is-visible" : ""}`}
        role="region"
        aria-label="Mobile quick actions"
      >
        {/* 1st: Book Consultation (Primary Blue) */}
        <button
          type="button"
          onClick={handleBookConsultation}
          className="mobile-action-btn mobile-consult-btn"
        >
          <span>Book Consultation</span>
        </button>

        {/* 2nd: WhatsApp (Stroke) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-action-btn mobile-whatsapp-btn"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.127-.061-.26-.084-.589-.196-1.011-.38-1.782-.777-2.936-2.597-3.025-2.716-.088-.119-.724-.964-.724-1.839 0-.875.459-1.306.623-1.485.163-.178.358-.223.477-.223.12 0 .239.001.343.006.11.006.257-.042.403.308.15.358.508 1.242.553 1.332.045.09.075.195.015.314-.06.12-.09.195-.179.3-.09.105-.188.234-.269.315-.09.09-.184.187-.079.367.105.18.468.773 1.004 1.25.69.614 1.272.805 1.452.895.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.099.84z" />
          </svg>
          <span>WhatsApp Us</span>
        </a>
      </div>

      <style jsx>{`
        /* Mobile Sticky Actions — hidden by default, slides up after scroll */
        .mobile-sticky-actions {
          display: none;
        }

        @media (max-width: 768px) {

          .mobile-sticky-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 95;
            padding: 0.625rem 0.75rem calc(0.625rem + env(safe-area-inset-bottom));
            background-color: rgba(255, 255, 255, 0.97);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(24, 24, 24, 0.08);
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
            transform: translateY(120%);
            opacity: 0;
            visibility: hidden;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.25s ease,
                        visibility 0.3s;
            pointer-events: none;
          }

          .mobile-sticky-actions.is-visible {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }

          .mobile-action-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            height: 44px;
            border-radius: 12px;
            font-family: var(--font-body);
            font-size: 0.8125rem;
            font-weight: 600;
            text-decoration: none;
            line-height: 1;
            text-align: center;
            transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            white-space: nowrap;
            border: none;
            cursor: pointer;
          }

          /* 1st: Book Consultation — Primary Blue */
          .mobile-consult-btn {
            background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
            color: #FFFFFF !important;
            border: 1px solid #29ABE2 !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 14px -2px rgba(41, 171, 226, 0.4) !important;
            font-weight: 650;
          }

          .mobile-consult-btn:hover {
            background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
            border-color: #1FA0D6 !important;
            box-shadow: 0 8px 22px -4px rgba(41, 171, 226, 0.55) !important;
          }

          /* 2nd: WhatsApp — Stroke */
          .mobile-whatsapp-btn {
            background-color: #FFFFFF;
            color: var(--foreground);
            border: 1.5px solid #D8D5CF;
            border-radius: 12px;
          }

          .mobile-whatsapp-btn:hover {
            border-color: #25D366;
            color: #25D366;
            background-color: rgba(37, 211, 102, 0.04);
            box-shadow: 0 4px 14px -2px rgba(37, 211, 102, 0.2);
          }

          .mobile-whatsapp-btn svg {
            color: #25D366;
            flex-shrink: 0;
          }
        }
      `}</style>
    </>
  );
}
