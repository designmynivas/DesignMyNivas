"use client";

import Link from "next/link";
import ServiceGrid from "@/components/services/service-grid";

export default function ServicesClient() {
  return (
    <div className="services-page-container">
      {/* Editorial Page Header */}
      <header className="services-hero-header">
        <div className="container-wide">
          <div className="services-header-content">
            <span className="eyebrow header-eyebrow">Our Specialisations</span>
            <h1 className="services-main-headline">What can we design for you?</h1>
            <p className="services-main-lead">
              From a single room to a complete home, Design My Nivas plans, designs, and executes residential interiors around how you live. Every project is backed by fixed itemized pricing, factory-crafted BWP marine-grade woodwork, and on-site senior supervision across Hyderabad, Warangal, and Karimnagar.
            </p>
          </div>
        </div>
      </header>

      {/* Main 8 Services: Full-width alternating row cards */}
      <section className="services-grid-section" aria-label="8 Core Interior Design Services">
        <div className="container-wide">
          <ServiceGrid layout="row" />
        </div>
      </section>

      {/* Clean Bottom Trust & Consultation Strip */}
      <section className="services-cta-banner" aria-label="Book a Service Consultation">
        <div className="container-wide">
          <div className="services-banner-inner">
            <div className="banner-text">
              <span className="banner-eyebrow">Unsure where to begin?</span>
              <h2 className="banner-title">Speak directly with our senior design team.</h2>
              <p className="banner-desc">
                Bring your floor plan for a complimentary 45-minute spatial consultation. We will walk you through functional layout options, realistic budgets, and material recommendations for your home.
              </p>
            </div>
            <div className="banner-action">
              <Link href="/contact" className="btn btn-primary banner-btn">
                <span>Book a Consultation</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-page-container {
          padding-top: calc(76px + var(--space-48));
          padding-bottom: var(--space-96);
          background-color: var(--background);
        }

        .services-hero-header {
          padding-bottom: var(--space-48);
          border-bottom: 1px solid var(--border-subtle);
        }

        .services-header-content {
          max-width: 780px;
        }

        .header-eyebrow {
          margin-bottom: 0.875rem;
        }

        .services-main-headline {
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-weight: 650;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-bottom: 1.25rem;
        }

        .services-main-lead {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--foreground-muted);
        }

        .services-grid-section {
          padding-top: var(--space-48);
          padding-bottom: var(--space-64);
        }

        .services-cta-banner {
          padding-top: var(--space-32);
        }

        .services-banner-inner {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: clamp(2rem, 5vw, 3.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 4px 20px rgba(24, 24, 24, 0.04);
        }

        .banner-text {
          max-width: 680px;
        }

        .banner-eyebrow {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brand-blue);
          display: block;
          margin-bottom: 0.5rem;
        }

        .banner-title {
          font-size: clamp(1.5rem, 2.8vw, 2.125rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin-bottom: 0.75rem;
        }

        .banner-desc {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--foreground-muted);
        }

        .banner-action {
          flex-shrink: 0;
        }

        :global(.banner-btn) {
          height: 48px;
          padding: 0 2rem;
          font-size: 0.9375rem;
          border-radius: 12px !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 28px -4px rgba(41, 171, 226, 0.52), 0 4px 10px -2px rgba(41, 171, 226, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
        }

        :global(.banner-btn:hover) {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(41, 171, 226, 0.7), 0 6px 16px -2px rgba(41, 171, 226, 0.45) !important;
        }

        @media (max-width: 840px) {
          .services-banner-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .banner-action {
            width: 100%;
          }

          :global(.banner-btn) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
