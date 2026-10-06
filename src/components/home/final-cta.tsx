"use client";

import { ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { useBookingModal } from "@/context/booking-modal-context";

export default function FinalCTA({
  title = "Let’s build a home you’ll",
  highlight = "love living in.",
  source = "final-cta",
}: {
  title?: string;
  highlight?: string;
  source?: string;
}) {
  const { openBookingModal } = useBookingModal();
  const whatsappUrl = getWhatsAppUrl(
    "Hello Design My Nivas, I would like to discuss interiors for my home."
  );

  return (
    <section className="final-cta" aria-labelledby={`${source}-title`}>
      <div className="container-wide">
        <div className="cta-card reveal">
          <div>
            <h2 id={`${source}-title`} className="cta-title">
              {title} <span className="hl">{highlight}</span>
            </h2>
            <p className="cta-sub">Free consultation · Hyderabad, Warangal &amp; Karimnagar</p>
          </div>
          <div className="cta-actions">
            <button
              type="button"
              onClick={() => openBookingModal({ source })}
              className="cta-primary"
            >
              Book a Consultation <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cta-secondary">
              WhatsApp Us <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .final-cta {
          padding: clamp(1rem, 3vw, 2rem) 0 clamp(3.5rem, 7vw, 5.5rem);
        }

        .cta-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.75rem;
          padding: clamp(1.75rem, 4vw, 3rem);
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid var(--brand-blue-border);
          box-shadow: 0 16px 48px -12px rgba(41, 171, 226, 0.18);
        }

        .cta-title {
          font-size: clamp(1.6rem, 3.2vw, 2.5rem);
          font-weight: 650;
          line-height: 1.1;
          letter-spacing: -0.03em;
          max-width: 26ch;
          margin: 0 auto;
        }

        .hl {
          color: var(--brand-blue);
        }

        .cta-sub {
          margin-top: 0.75rem;
          font-size: 0.9375rem;
          color: var(--foreground-muted);
        }

        .cta-actions {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .cta-primary,
        .cta-secondary {
          height: 52px;
          padding: 0 1.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, border-color 0.15s, color 0.15s;
        }

        .cta-primary {
          color: #ffffff;
          background: linear-gradient(180deg, #3bb6ea 0%, #1793c9 100%);
          border: 1px solid #29abe2;
          box-shadow: 0 10px 26px -6px rgba(41, 171, 226, 0.55);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -6px rgba(41, 171, 226, 0.7);
        }

        .cta-secondary {
          background: #ffffff;
          border: 1.5px solid var(--border);
          color: var(--foreground);
        }

        .cta-secondary:hover {
          border-color: var(--brand-blue);
          color: var(--brand-blue);
          transform: translateY(-2px);
        }

        @media (max-width: 520px) {
          .cta-actions {
            flex-direction: column;
            width: 100%;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
