"use client";

import Link from "next/link";
import ServiceGrid from "@/components/services/service-grid";
import { useBookingModal } from "@/context/booking-modal-context";

export default function Services() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="section services-section" id="services" aria-label="Our Interior Design Services">
      <div className="container-wide">
        {/* Section Header */}
        <div className="services-header">
          <div className="services-header-text">
            <span className="eyebrow services-eyebrow">Our Specialisations</span>
            <h2 className="services-headline">What can we design for you?</h2>
            <p className="services-lead">
              From modular kitchens to complete turnkey residences across Hyderabad, Warangal, and Karimnagar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBookingModal({ source: "home-services-header" })}
            className="btn btn-primary services-header-cta"
            aria-label="Book a Consultation"
          >
            <span>Book a Consultation</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {/* 6 Large Service Cards: 2x3 Grid desktop/tablet */}
        <ServiceGrid limit={6} />

        {/* View All Services Discovery Footer */}
        <div className="services-view-all-row">
          <Link href="/services" className="btn btn-secondary view-all-services-btn">
            <span>View All Services</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .services-section {
          background-color: var(--background);
          border: none;
          padding: var(--space-96) 0;
        }

        .services-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: var(--space-48);
        }

        .services-header-text {
          max-width: 680px;
        }

        .services-eyebrow {
          margin-bottom: 0.75rem;
        }

        .services-headline {
          font-size: var(--text-statement);
          font-weight: 650;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-bottom: 0.75rem;
        }

        .services-lead {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: var(--foreground-muted);
        }

        .services-view-all-row {
          display: flex;
          justify-content: center;
          margin-top: var(--space-48);
        }

        :global(.view-all-services-btn) {
          height: 48px;
          padding: 0 2rem;
          font-size: 0.9375rem;
          font-weight: 600;
          background-color: #ffffff;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.view-all-services-btn:hover) {
          border-color: #29ABE2;
          color: #29ABE2;
          background-color: rgba(41, 171, 226, 0.04);
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.18);
          transform: translateY(-2px);
        }

        :global(.services-header-cta) {
          border-radius: 12px;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.52) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.services-header-cta:hover) {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -4px rgba(41, 171, 226, 0.7) !important;
        }

        @media (max-width: 768px) {
          .services-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }

          :global(.services-header-cta) {
            width: 100%;
            justify-content: center;
          }

          :global(.view-all-services-btn) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
