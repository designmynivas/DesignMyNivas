"use client";

import Link from "next/link";

export default function ServiceIntro() {
  return (
    <section className="service-intro-section" aria-label="What We Do">
      <div className="container-wide">
        <div className="service-intro-card">
          <div className="service-intro-grid">
            <div className="service-intro-left">
              <span className="eyebrow service-eyebrow">WHAT WE DO</span>
              <h2 className="service-intro-headline">
                Interior design,<br />
                from first idea to final handover.
              </h2>
            </div>
            <div className="service-intro-right">
              <p className="service-intro-supporting">
                We design and execute residential interiors across Hyderabad, Warangal and Karimnagar — from individual rooms to complete homes.
              </p>
              <Link href="/services" className="service-intro-link">
                <span>Explore our services</span>
                <span aria-hidden="true" className="intro-arrow">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .service-intro-section {
          background-color: var(--background);
          padding-bottom: var(--space-80);
        }

        .service-intro-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: clamp(2.5rem, 5vw, 4rem);
        }

        .service-intro-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-48);
          align-items: center;
        }

        .service-intro-left {
          display: flex;
          flex-direction: column;
          gap: var(--space-16);
        }

        .service-eyebrow {
          letter-spacing: 0.16em;
        }

        .service-intro-headline {
          font-size: var(--text-display);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--foreground);
        }

        .service-intro-right {
          display: flex;
          flex-direction: column;
          gap: var(--space-24);
          align-items: flex-start;
        }

        .service-intro-supporting {
          font-size: var(--text-body-lg);
          line-height: 1.7;
          color: var(--foreground-muted);
        }

        .service-intro-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: var(--text-body);
          font-weight: 600;
          color: var(--brand-blue);
          text-decoration: none;
          transition: gap var(--duration-fast) var(--ease-apple);
        }

        .service-intro-link:hover {
          gap: 0.75rem;
        }

        .intro-arrow {
          transition: transform var(--duration-fast);
        }

        @media (max-width: 900px) {
          .service-intro-grid {
            grid-template-columns: 1fr;
            gap: var(--space-24);
          }
        }
      `}</style>
    </section>
  );
}
