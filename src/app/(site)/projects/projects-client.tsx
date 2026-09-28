"use client";

import React, { useState } from "react";
import ProjectGrid from "@/components/projects/project-grid";
import { ProjectItem } from "@/data/projects";
import { useBookingModal } from "@/context/booking-modal-context";
import { ChevronDown, ArrowRight } from "lucide-react";

interface ProjectsClientProps {
  initialProjects?: ProjectItem[];
}

const PROJECT_FAQS = [
  {
    question: "Can we visit an ongoing or completed site to inspect quality?",
    answer: "Yes, we regularly arrange physical site visits to our ongoing or recently completed residences in Hyderabad, Warangal, and Karimnagar so you can examine finish quality, edge banding, and joinery in person."
  },
  {
    question: "Are all projects displayed in your portfolio real client homes?",
    answer: "Every residence in our portfolio reflects an actual turnkey project commissioned and delivered by Design My Nivas. We do not display 3D computer renders as finished projects or fabricated client stories."
  },
  {
    question: "How long does a full home interior project take from start to finish?",
    answer: "A standard 2BHK or 3BHK flat is delivered within 45 to 60 business days from 3D sign-off. Larger villas and penthouses typically take 75 to 90 days depending on the structural and civil scope."
  },
  {
    question: "Can we customize finishes, colors, and layout to our taste?",
    answer: "Every single home is 100% custom-tailored to your family's routines, aesthetic preferences, and budget. No two homes we design are ever identical."
  },
  {
    question: "How do you protect our new apartment during interior construction?",
    answer: "We lay heavy-duty corrugation sheets with sealed seams over all finished tiles/marble, foam-wrap door frames, and install zip dust barrier doors to prevent any damage to existing site assets."
  },
  {
    question: "Who is responsible for everyday on-site quality control?",
    answer: "A dedicated senior site engineer is assigned to your project. They oversee daily artisan attendance, manage material deliveries, and verify checklist adherence at every step."
  },
  {
    question: "How often will we receive project progress updates?",
    answer: "Your dedicated supervisor shares comprehensive weekly photo and video progress logs, along with milestone timeline charts, so you are always fully informed."
  },
  {
    question: "How do you guarantee that there will be no surprise cost escalations?",
    answer: "Before work begins, you receive an itemized, locked Bill of Quantities (BOQ). We guarantee 100% price lock with zero hidden charges or mid-project cost escalations."
  },
  {
    question: "What warranties are provided upon key handover?",
    answer: "You receive a formal handover dossier including a 10-year warranty certificate covering modular plywood carcasses, lifetime manufacturer hardware warranties, and a service schedule."
  },
  {
    question: "How do we get started with Design My Nivas for our home?",
    answer: "You can book a complimentary 45-minute spatial consultation online. We will review your floor plan, discuss your budget and material expectations, and prepare a tailored 3D design plan."
  },
];

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const { openBookingModal } = useBookingModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="projects-page-container">
      {/* Header */}
      <header className="projects-hero-header">
        <div className="container-wide">
          <div className="projects-header-row">
            <div className="projects-header-text">
              <span className="eyebrow">Portfolio</span>
              <h1 className="projects-main-headline">Homes we&apos;ve designed.</h1>
              <p className="projects-main-lead">
                Every residence reflects the family living inside it. Explore our real turnkey executions across Hyderabad, Warangal, and Karimnagar.
              </p>
            </div>
            <div className="projects-header-action">
              <button
                type="button"
                onClick={() => openBookingModal({ source: "projects-page-header" })}
                className="btn btn-primary projects-cta-btn"
                aria-label="Discuss Your Home"
              >
                <span>Discuss Your Home</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Portfolio Grid with Filters */}
      <section className="projects-grid-section" aria-label="Completed Residential Projects">
        <div className="container-wide">
          <ProjectGrid initialProjects={initialProjects} showFilters={true} />
        </div>
      </section>

      {/* Interactive FAQ Accordion: 10 Project Questions */}
      <section className="projects-faq-section" aria-label="Project FAQs">
        <div className="container-narrow">
          <div className="section-header-compact text-center">
            <span className="eyebrow">Common Enquiries</span>
            <h2 className="section-title">Portfolio &amp; Execution FAQs</h2>
            <p className="section-subtitle">
              Clear answers regarding our site processes, material guarantees, and execution standards.
            </p>
          </div>

          <div className="faq-accordion-list" role="region" aria-label="FAQ Accordion">
            {PROJECT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-accordion-item ${isOpen ? "faq-open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`proj-faq-answer-${idx}`}
                    id={`proj-faq-btn-${idx}`}
                  >
                    <span className="faq-q-text">{faq.question}</span>
                    <div className={`faq-toggle-icon ${isOpen ? "is-expanded" : ""}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`proj-faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`proj-faq-btn-${idx}`}
                      className="faq-answer-wrap"
                    >
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Unified White & Blue Rectangular Final Conversion Banner */}
      <section className="projects-bottom-cta">
        <div className="container-wide">
          <div className="cta-box-card">
            <div className="card-ambient-glow" aria-hidden="true" />

            <div className="cta-box-content">
              <span className="cta-eyebrow">Ready to begin?</span>
              <h2 className="cta-heading">Ready to plan your residence?</h2>
              <p className="cta-text">
                Speak with Benson Cheripelli and our senior engineering team. Get a tailored 3D space plan and a guaranteed itemized estimate.
              </p>
              <div className="cta-actions-row">
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      source: "projects-bottom-cta",
                    })
                  }
                  className="cta-action-primary"
                  aria-label="Book Consultation"
                >
                  <span>Book Consultation</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .projects-page-container {
          padding-top: calc(76px + var(--space-48));
          padding-bottom: var(--space-96);
          background-color: var(--background);
        }

        .projects-hero-header {
          padding-bottom: var(--space-48);
          border-bottom: 1px solid var(--border-subtle);
          text-align: center;
        }

        .projects-header-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .projects-header-text {
          max-width: 760px;
          text-align: center;
          margin: 0 auto;
        }

        .projects-header-action {
          display: flex;
          justify-content: center;
        }

        .projects-main-headline {
          font-size: clamp(2.35rem, 4.5vw, 3.75rem);
          font-weight: 650;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .projects-main-lead {
          font-size: 1.125rem;
          line-height: 1.65;
          color: var(--foreground-muted);
          text-align: center;
          margin: 0 auto;
        }

        .projects-grid-section {
          padding-top: var(--space-48);
          padding-bottom: var(--space-64);
        }

        :global(.projects-cta-btn) {
          height: 48px;
          padding: 0 1.75rem;
          font-size: 0.9375rem;
          border-radius: 12px !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          color: #ffffff !important;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.5) !important;
        }

        /* FAQ Section */
        .projects-faq-section {
          padding: var(--space-80) 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .section-header-compact {
          margin-bottom: 2.75rem;
        }

        .section-header-compact.text-center {
          text-align: center;
        }

        .section-header-compact .eyebrow {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #29ABE2;
          display: block;
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-size: clamp(1.85rem, 3.5vw, 2.5rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-bottom: 0.625rem;
        }

        .section-subtitle {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          max-width: 640px;
          margin: 0 auto;
        }

        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          max-width: 820px;
          margin: 0 auto;
        }

        .faq-accordion-item {
          background-color: #ffffff;
          border: 1.5px solid #E5E2DC;
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .faq-accordion-item.faq-open {
          border-color: #29ABE2;
          box-shadow: 0 6px 20px -3px rgba(41, 171, 226, 0.12);
        }

        .faq-question-btn {
          width: 100%;
          background: transparent;
          border: none;
          padding: 1.25rem 1.5rem;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          cursor: pointer;
        }

        .faq-q-text {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 600;
          color: #181818;
          line-height: 1.35;
        }

        .faq-toggle-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(41, 171, 226, 0.08);
          color: #29ABE2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
        }

        .faq-toggle-icon.is-expanded {
          transform: rotate(180deg);
          background: #29ABE2;
          color: #ffffff;
        }

        .faq-answer-wrap {
          padding: 0 1.5rem 1.35rem 1.5rem;
          border-top: 1px solid rgba(41, 171, 226, 0.15);
        }

        .faq-answer-text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: #4A4A4A;
          margin-top: 0.875rem;
        }

        /* Bottom CTA Banner */
        .projects-bottom-cta {
          padding-top: var(--space-80);
        }

        .cta-box-card {
          position: relative;
          background: #FFFFFF;
          border: 1.5px solid rgba(41, 171, 226, 0.28);
          border-radius: 24px;
          padding: clamp(2.5rem, 6vw, 4.5rem);
          color: #181818;
          text-align: center;
          box-shadow: 0 20px 60px -15px rgba(41, 171, 226, 0.12),
                      0 4px 16px rgba(0, 0, 0, 0.03);
          overflow: hidden;
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

        .cta-box-content {
          position: relative;
          z-index: 1;
          max-width: 680px;
          margin: 0 auto;
        }

        .cta-eyebrow {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #29ABE2;
          display: block;
          margin-bottom: 0.75rem;
        }

        .cta-heading {
          font-size: clamp(1.85rem, 4vw, 2.75rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          color: #181818;
          margin-bottom: 1rem;
        }

        .cta-text {
          font-size: 1.0625rem;
          line-height: 1.65;
          color: #555555;
          margin-bottom: 2rem;
        }

        .cta-actions-row {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cta-action-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 48px;
          padding: 0 2.25rem;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 650;
          border-radius: 12px;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%);
          border: 1px solid #29ABE2;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 10px 28px -4px rgba(41, 171, 226, 0.52), 0 4px 10px -2px rgba(41, 171, 226, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-action-primary:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%);
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(41, 171, 226, 0.7), 0 6px 16px -2px rgba(41, 171, 226, 0.45);
        }
      `}</style>
    </div>
  );
}
