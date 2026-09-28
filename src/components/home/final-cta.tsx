"use client";

import { getWhatsAppUrl } from "@/lib/config/site";
import { useBookingModal } from "@/context/booking-modal-context";
import { MapPin, ArrowRight, MessageCircle } from "lucide-react";

export default function FinalCTA() {
  const { openBookingModal } = useBookingModal();
  const whatsappUrl = getWhatsAppUrl(
    "Hello Design My Nivas, I would like to enquire about residential interior design for my home."
  );

  return (
    <section className="final-cta-section" aria-label="Book a Consultation">
      <div className="container">
        {/* Blue and White Rectangular CTA Card */}
        <div className="cta-rectangle-card">
          {/* Subtle Ambient Blue Top Glow */}
          <div className="card-ambient-glow" aria-hidden="true" />

          <div className="cta-content">
            <div className="cta-eyebrow-pill">
              <span>Start Your Journey</span>
            </div>

            <h2 className="cta-headline">
              Let&rsquo;s Design Your Nivas.
            </h2>

            <p className="cta-subtitle">
              Your dream home starts with a conversation. Turnkey residential interior design and execution with transparent milestone pricing across Telangana.
            </p>

            <div className="cta-actions">
              <button
                type="button"
                onClick={() => openBookingModal({ source: "final-cta" })}
                className="cta-btn-primary"
                aria-label="Book a Consultation"
              >
                <span>Book a Consultation</span>
                <ArrowRight size={17} className="btn-arrow" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn-whatsapp"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={18} className="wa-icon" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="cta-locations-strip">
              <div className="loc-item">
                <MapPin size={14} className="loc-icon" aria-hidden="true" />
                <span>Hyderabad</span>
              </div>
              <span className="loc-sep" aria-hidden="true">·</span>
              <div className="loc-item">
                <MapPin size={14} className="loc-icon" aria-hidden="true" />
                <span>Warangal</span>
              </div>
              <span className="loc-sep" aria-hidden="true">·</span>
              <div className="loc-item">
                <MapPin size={14} className="loc-icon" aria-hidden="true" />
                <span>Karimnagar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .final-cta-section {
          padding: 5rem 0 6rem 0;
          background-color: var(--background);
          position: relative;
        }

        .cta-rectangle-card {
          position: relative;
          background: #FFFFFF;
          border: 1.5px solid rgba(41, 171, 226, 0.28);
          border-radius: 24px;
          padding: 4.5rem 2.5rem;
          box-shadow: 0 20px 60px -15px rgba(41, 171, 226, 0.12),
                      0 4px 16px rgba(0, 0, 0, 0.03);
          overflow: hidden;
          text-align: center;
        }

        .card-ambient-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 120px;
          background: radial-gradient(ellipse at top, rgba(41, 171, 226, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 720px;
          margin: 0 auto;
        }

        .cta-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          color: #29ABE2;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 750;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.9rem;
          border-radius: 980px;
          margin-bottom: 1.25rem;
        }

        .cta-headline {
          color: #0F172A;
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0 0 1rem 0;
        }

        .cta-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.6vw, 1.125rem);
          color: #475569;
          line-height: 1.65;
          margin: 0 0 2.25rem 0;
          max-width: 620px;
        }

        .cta-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .cta-btn-primary {
          height: 52px;
          padding: 0 2.25rem;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 650;
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          color: #FFFFFF;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%);
          border: 1px solid #29ABE2;
          border-radius: 12px;
          box-shadow: 0 10px 24px -4px rgba(41, 171, 226, 0.45);
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-btn-primary:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%);
          border-color: #1FA0D6;
          transform: translateY(-2px);
          box-shadow: 0 16px 32px -4px rgba(41, 171, 226, 0.6);
        }

        .btn-arrow {
          transition: transform 0.22s ease;
        }

        .cta-btn-primary:hover .btn-arrow {
          transform: translateX(3px);
        }

        .cta-btn-whatsapp {
          height: 52px;
          padding: 0 2rem;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 650;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #FFFFFF;
          color: #0F172A;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .wa-icon {
          color: #25D366;
          transition: transform 0.2s ease;
        }

        .cta-btn-whatsapp:hover {
          border-color: #25D366;
          color: #25D366;
          background: rgba(37, 211, 102, 0.05);
          box-shadow: 0 8px 24px -4px rgba(37, 211, 102, 0.25);
          transform: translateY(-2px);
        }

        .cta-btn-whatsapp:hover .wa-icon {
          transform: scale(1.1);
        }

        .cta-locations-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          color: #475569;
          letter-spacing: 0.04em;
          flex-wrap: wrap;
        }

        .loc-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(.loc-icon) {
          color: #29ABE2;
        }

        .loc-sep {
          color: #CBD5E1;
        }

        @media (max-width: 640px) {
          .cta-rectangle-card {
            padding: 3rem 1.5rem;
            border-radius: 18px;
          }

          .cta-actions {
            flex-direction: column;
            width: 100%;
          }

          .cta-btn-primary,
          .cta-btn-whatsapp {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
