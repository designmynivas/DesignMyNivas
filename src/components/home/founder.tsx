"use client";

import Image from "next/image";
import Link from "next/link";
import { useBookingModal } from "@/context/booking-modal-context";

export default function Founder() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="section founder-section" aria-label="Founder of Design My Nivas">
      <div className="container">
        <div className="founder-grid">
          {/* Real High-End Architectural Studio Portrait */}
          <div className="founder-visual">
            <div className="founder-image-frame">
              <Image
                src="/Images/founder/benson-cheripelli.webp"
                alt="Benson Cheripelli — Founder of Design My Nivas"
                fill
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 40vw"
                className="founder-img"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
              <div className="founder-caption-tag">
                <span className="founder-name-tag">Benson Cheripelli</span>
                <span className="founder-title-tag">Founder &amp; Principal Designer</span>
              </div>
            </div>
          </div>

          {/* Concise, Human, Personal Connection */}
          <div className="founder-content">
            <span className="eyebrow founder-eyebrow">The Studio Founder</span>
            <h2 className="founder-headline">Meet Benson.</h2>

            <blockquote className="founder-quote">
              &ldquo;Good interior design should be beautiful, practical, and personal — not an ordeal of hidden costs and empty promises.&rdquo;
            </blockquote>

            <p className="founder-body">
              Design My Nivas was founded by Benson Cheripelli with a simple belief: every family deserves a home that is thoughtfully planned and honestly built.
            </p>

            <p className="founder-body">
              Working directly with homeowners across Hyderabad, Warangal, and Karimnagar, Benson personally oversees architectural drawings, material quality, and site execution — ensuring your vision stays at the center of the journey.
            </p>

            <div className="founder-actions">
              <Link href="/about" className="btn btn-secondary founder-story-btn">
                <span>Our Full Story</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <button
                type="button"
                onClick={() => openBookingModal({ source: "home-founder-cta" })}
                className="btn btn-primary founder-consult-btn"
              >
                <span>Book a Consultation</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .founder-section {
          background-color: var(--background);
          padding: var(--space-96) 0;
        }

        .founder-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.25fr;
          gap: var(--space-64);
          align-items: center;
        }

        .founder-visual {
          position: relative;
        }

        .founder-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background-color: var(--background-muted);
          border: 1px solid var(--border);
          box-shadow: 0 16px 40px rgba(24, 24, 24, 0.08);
        }

        :global(.founder-img) {
          object-fit: cover !important;
          object-position: top center !important;
        }

        .founder-caption-tag {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          background-color: rgba(24, 24, 24, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 0.625rem 1rem;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          z-index: 2;
        }

        .founder-name-tag {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 650;
        }

        .founder-title-tag {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.75);
        }

        .founder-content {
          display: flex;
          flex-direction: column;
        }

        .founder-eyebrow {
          margin-bottom: 0.5rem;
        }

        .founder-headline {
          font-size: var(--text-statement);
          font-weight: 650;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-bottom: 1.25rem;
        }

        .founder-quote {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-style: italic;
          line-height: 1.6;
          color: var(--foreground);
          border-left: 3px solid var(--brand-blue);
          padding-left: 1.25rem;
          margin: 0 0 1.25rem 0;
        }

        .founder-body {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--foreground-muted);
          margin-bottom: 1rem;
        }

        .founder-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        :global(.founder-story-btn) {
          height: 48px;
          padding: 0 1.65rem;
          background-color: #ffffff;
          border: 1.5px solid var(--border);
          border-radius: 12px !important;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.founder-story-btn:hover) {
          border-color: #29ABE2;
          color: #29ABE2;
          background-color: rgba(41, 171, 226, 0.04);
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.18);
          transform: translateY(-2px);
        }

        :global(.founder-consult-btn) {
          height: 48px;
          padding: 0 1.75rem;
          font-weight: 600;
          color: #FFFFFF !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.52) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.founder-consult-btn:hover) {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          border-color: #1FA0D6 !important;
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -4px rgba(41, 171, 226, 0.7) !important;
        }

        @media (max-width: 900px) {
          .founder-grid {
            grid-template-columns: 1fr;
            gap: var(--space-48);
          }

          .founder-image-frame {
            max-width: 440px;
            margin: 0 auto;
          }

          .founder-actions {
            width: 100%;
          }

          :global(.founder-story-btn),
          :global(.founder-consult-btn) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
