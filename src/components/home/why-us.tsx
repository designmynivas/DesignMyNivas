"use client";

import React from "react";
import { Sparkles, LayoutGrid, Layers, ShieldCheck, Workflow, KeyRound } from "lucide-react";

interface PhilosophyItem {
  number: string;
  keyword: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const philosophyItems: PhilosophyItem[] = [
  {
    number: "01",
    keyword: "Personalised",
    description: "Every layout is custom calibrated to your family's living rhythm and personal habits.",
    icon: Sparkles,
  },
  {
    number: "02",
    keyword: "Functional",
    description: "Aesthetics paired with everyday ergonomics to make daily life effortless and uncluttered.",
    icon: LayoutGrid,
  },
  {
    number: "03",
    keyword: "Detailed",
    description: "Architectural lighting, tactile veneers, and calibrated joinery down to the millimeter.",
    icon: Layers,
  },
  {
    number: "04",
    keyword: "Transparent",
    description: "Honest line-item pricing with zero hidden costs and verified factory-grade materials.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    keyword: "End-to-End",
    description: "One turnkey team managing 3D design, procurement, and on-site execution supervision.",
    icon: Workflow,
  },
  {
    number: "06",
    keyword: "Timely Handover",
    description: "Committed handover schedules with multi-stage quality audits at every key milestone.",
    icon: KeyRound,
  },
];

export default function WhyUs() {
  return (
    <section className="section why-us-section" aria-label="Why Choose Design My Nivas">
      <div className="container-wide">
        <div className="why-header">
          <span className="eyebrow why-eyebrow">Philosophy</span>
          <h2 className="why-headline">Designed around you.</h2>
          <p className="why-subtitle">
            Every home we design is guided by real living habits, practical execution and personal care.
          </p>
        </div>

        {/* 6 Cards Grid: 3 in a row on Desktop & iPad, 2 in a row on Mobile */}
        <div className="why-grid" role="list">
          {philosophyItems.map((point) => {
            const Icon = point.icon;
            return (
              <article key={point.keyword} className="why-card" role="listitem">
                <div className="why-card-top">
                  {/* Icon Box with Out-of-the-Box Micro-Interaction */}
                  <div className="why-icon-box" aria-hidden="true">
                    <Icon size={22} className="why-icon" />
                  </div>

                  {/* Primary Blue Number Badge */}
                  <span className="why-number-badge">{point.number}</span>
                </div>

                <h3 className="why-keyword">{point.keyword}</h3>
                <p className="why-description">{point.description}</p>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .why-us-section {
          background-color: var(--background);
          border: none;
          padding: clamp(3.5rem, 6vw, 6rem) 0;
        }

        .why-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto clamp(2rem, 4vw, 3.25rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-12);
        }

        .why-eyebrow {
          letter-spacing: 0.16em;
        }

        .why-headline {
          font-family: var(--font-display);
          font-size: var(--text-display);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--foreground);
          line-height: 1.15;
        }

        .why-subtitle {
          font-family: var(--font-body);
          font-size: var(--text-body-lg);
          color: var(--foreground-muted);
          line-height: 1.6;
        }

        /* Desktop & iPad: Exactly 3 cards in a row (3 cols x 2 rows = 6 cards) */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.75rem);
        }

        /* Premium Philosophy Card */
        .why-card {
          position: relative;
          background-color: #FFFFFF;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: clamp(1.4rem, 2.2vw, 1.85rem);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 2px 8px rgba(24, 24, 24, 0.03);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          cursor: default;
        }

        /* Ambient subtle radial glow on card hover */
        .why-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 25% 15%, rgba(41, 171, 226, 0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          border-radius: 20px;
        }

        /* Card Hover Effects: Shadow bloom, Elevation, and Primary Blue Border */
        .why-card:hover {
          transform: translateY(-5px);
          border-color: #29ABE2;
          box-shadow: 0 20px 42px -10px rgba(41, 171, 226, 0.22),
                      0 8px 18px -4px rgba(24, 24, 24, 0.06);
        }

        .why-card:hover::before {
          opacity: 1;
        }

        .why-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 1;
        }

        /* Icon Container: Out-of-the-Box Spring Pop */
        .why-icon-box {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(41, 171, 226, 0.08);
          border: 1px solid rgba(41, 171, 226, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible; /* Allows icon to increase out of the box */
          transition: background 0.3s ease,
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        :global(.why-icon) {
          color: #29ABE2;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      color 0.25s ease,
                      filter 0.35s ease;
          transform-origin: center center;
          display: block;
        }

        /* On Card Hover: Increase the size of the icon OUT OF THE BOX */
        .why-card:hover .why-icon-box {
          background: linear-gradient(135deg, rgba(41, 171, 226, 0.16) 0%, rgba(41, 171, 226, 0.3) 100%);
          border-color: #29ABE2;
          box-shadow: 0 4px 16px rgba(41, 171, 226, 0.35);
        }

        .why-card:hover :global(.why-icon) {
          transform: scale(1.36) translateY(-2px); /* Pops larger and out of the box */
          color: #1793C9;
          filter: drop-shadow(0 4px 8px rgba(41, 171, 226, 0.45));
        }

        /* Primary Blue Number Badge */
        .why-number-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #29ABE2;
          background: rgba(41, 171, 226, 0.08);
          border: 1px solid rgba(41, 171, 226, 0.2);
          padding: 0.25rem 0.65rem;
          border-radius: 8px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .why-card:hover .why-number-badge {
          background: #29ABE2;
          color: #FFFFFF;
          border-color: #29ABE2;
          box-shadow: 0 2px 10px rgba(41, 171, 226, 0.4);
          transform: scale(1.05);
        }

        /* Keyword Heading: Highlights to Primary Blue on Hover */
        .why-keyword {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 1.8vw, 1.45rem);
          font-weight: 650;
          color: #181818;
          letter-spacing: -0.015em;
          margin-bottom: 0.5rem;
          line-height: 1.25;
          position: relative;
          z-index: 1;
          transition: color 0.25s ease;
        }

        .why-card:hover .why-keyword {
          color: #29ABE2;
        }

        .why-description {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: #4A4A4A;
          line-height: 1.55;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Tablet / iPad Screen: Strictly 3 cards in a row */
        @media (min-width: 769px) and (max-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          .why-card {
            padding: 1.25rem 1rem;
          }

          .why-keyword {
            font-size: 1.15rem;
          }

          .why-description {
            font-size: 0.875rem;
          }
        }

        /* Mobile Screen: Strictly 2 cards in a row */
        @media (max-width: 768px) {
          .why-us-section {
            padding: 3rem 0;
          }

          .why-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .why-card {
            padding: 1.1rem 0.85rem;
            border-radius: 16px;
          }

          .why-card-top {
            margin-bottom: 0.85rem;
          }

          .why-icon-box {
            width: 38px;
            height: 38px;
            border-radius: 10px;
          }

          :global(.why-icon) {
            width: 18px;
            height: 18px;
          }

          .why-number-badge {
            font-size: 0.7rem;
            padding: 0.2rem 0.45rem;
            border-radius: 6px;
          }

          .why-keyword {
            font-size: 1.05rem;
            margin-bottom: 0.35rem;
          }

          .why-description {
            font-size: 0.78rem;
            line-height: 1.45;
          }
        }
      `}</style>
    </section>
  );
}
