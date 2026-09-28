"use client";

import SectionHeading from "@/components/ui/section-heading";

export default function Introduction() {
  return (
    <section className="section introduction-section">
      <div className="container">
        <div className="intro-grid">
          <div className="intro-content">
            <SectionHeading
              eyebrow="Our Philosophy"
              title="Your home should feel like yours."
              subtitle="At Design My Nivas, we believe that interior design is not about following trends — it is about understanding how you live. Every family is different. Every space has its own character. Our role is to bring these together into a home that is beautiful, functional, and personal."
            />
            <p className="intro-secondary">
              Founded by Benson Cheripelli, Design My Nivas works across
              Hyderabad, Warangal, and Karimnagar — creating residential
              interiors that are designed with intention and executed with care.
            </p>
          </div>
          <div className="intro-detail">
            <div className="intro-stat-card">
              <div className="intro-stat">
                <span className="intro-stat-label">Headquarters</span>
                <span className="intro-stat-value">Hyderabad</span>
              </div>
              <div className="intro-stat">
                <span className="intro-stat-label">Service Areas</span>
                <span className="intro-stat-value">
                  Hyderabad · Warangal · Karimnagar
                </span>
              </div>
              <div className="intro-stat">
                <span className="intro-stat-label">Practice</span>
                <span className="intro-stat-value">
                  Design to Handover — Complete Turnkey
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .introduction-section {
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .intro-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: var(--space-4xl);
          align-items: center;
        }

        .intro-secondary {
          margin-top: var(--space-lg);
          font-size: var(--text-body);
          color: var(--foreground-muted);
          line-height: 1.75;
          max-width: 540px;
        }

        .intro-stat-card {
          background-color: var(--background);
          border: 1px solid var(--border);
          padding: var(--space-2xl) var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .intro-stat {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-bottom: var(--space-lg);
          border-bottom: 1px solid var(--border);
        }

        .intro-stat:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .intro-stat-label {
          font-family: var(--font-body);
          font-size: var(--text-eyebrow);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brand-blue);
        }

        .intro-stat-value {
          font-family: var(--font-body);
          font-size: var(--text-body);
          font-weight: 500;
          color: var(--foreground);
        }

        @media (max-width: 768px) {
          .intro-grid {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }

          .intro-stat-card {
            padding: var(--space-xl);
          }
        }
      `}</style>
    </section>
  );
}
