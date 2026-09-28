"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useBookingModal } from "@/context/booking-modal-context";
import { MapPin, ChevronDown, ArrowRight } from "lucide-react";

const ABOUT_FAQS = [
  {
    question: "Who founded Design My Nivas?",
    answer: "Benson Cheripelli founded Design My Nivas with the mission to eliminate hidden costs, unverified material grades, and absentee supervisors from residential turnkey interiors across Telangana."
  },
  {
    question: "Where are your active studios and execution hubs located?",
    answer: "We manage active site executions with stationed supervisors and engineering hubs across Hyderabad, Warangal, and Karimnagar."
  },
  {
    question: "How is Design My Nivas different from interior aggregators?",
    answer: "We do not broker your home to random third-party contractors. Every home is built with our direct on-site engineers, factory-pressed modular woodworking, and verified IS:710 marine-grade plywood."
  },
  {
    question: "What core wood standards do you enforce?",
    answer: "We strictly utilize IS:710 Boiling Water Proof (BWP) marine plywood for wet zones (kitchens & bathrooms) and calibrated hardwood core plywood for wardrobes and dry areas, backed by a 10-year warranty."
  },
  {
    question: "What hardware brands are installed?",
    answer: "We exclusively install genuine Blum and Hettich European soft-close hinges, tandem runners, and lift-up systems tested for over 200,000 cycles."
  },
  {
    question: "What is the typical completion timeline for a home?",
    answer: "Standard 2BHK and 3BHK flats are delivered within 45 to 60 business days from 3D design sign-off. Larger villas and penthouses typically take 75 to 90 days."
  },
  {
    question: "How does your locked estimate policy work?",
    answer: "Before any construction begins, you receive an itemized Bill of Quantities (BOQ). We guarantee zero unexpected invoices or mid-build price escalations."
  },
  {
    question: "How do you keep clients updated on progress?",
    answer: "Your dedicated senior site engineer sends weekly photo and video progress logs, along with milestone timeline checks, so you can track progress without leaving your desk."
  },
  {
    question: "What warranties are included upon key handover?",
    answer: "You receive a formal handover dossier including a 10-year warranty certificate covering modular plywood carcasses, lifetime hardware warranties, and a service schedule."
  },
  {
    question: "How can we book a consultation with Benson Cheripelli?",
    answer: "Click 'Book a Consultation' on any page to schedule a complimentary 45-minute spatial consultation. We will review your floor plan, discuss your budget, and map out next steps."
  },
];

export default function AboutClient() {
  const { openBookingModal } = useBookingModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="about-page-container">
      {/* 1. Hero Section */}
      <header className="about-hero">
        <div className="container-wide">
          <div className="about-hero-content">
            <span className="eyebrow">Our Philosophy &amp; Practice</span>
            <h1 className="about-hero-title">
              Thoughtfully planned.<br />
              Honestly built.
            </h1>
            <p className="about-hero-lead">
              Design My Nivas was founded by Benson Cheripelli with a singular conviction: creating a beautiful home interior shouldn&apos;t be an exhausting ordeal of hidden costs, deceptive material grades, and absentee supervisors.
            </p>
          </div>
        </div>
      </header>

      {/* 2. Verified Studio Metrics */}
      <section className="about-metrics-section" aria-label="Studio Track Record">
        <div className="container-wide">
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-number">5+</span>
              <span className="metric-label">Years of Practice</span>
              <p className="metric-sub">Dedicated residential interior execution across Telangana.</p>
            </div>
            <div className="metric-card">
              <span className="metric-number">70+</span>
              <span className="metric-label">Completed Homes</span>
              <p className="metric-sub">Premium flats, luxury penthouses, and bespoke family villas.</p>
            </div>
            <div className="metric-card">
              <span className="metric-number">3</span>
              <span className="metric-label">Active Studio Hubs</span>
              <p className="metric-sub">Hyderabad, Warangal, and Karimnagar with local supervision.</p>
            </div>
            <div className="metric-card">
              <span className="metric-number">100%</span>
              <span className="metric-label">Locked Estimates</span>
              <p className="metric-sub">Strict BOQ contracts with zero mid-construction cost escalations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Founder Section — Benson Cheripelli */}
      <section className="about-founder-section" aria-label="Founder Benson Cheripelli">
        <div className="container-wide">
          <div className="founder-layout-grid">
            {/* Real Editorial Portrait */}
            <div className="founder-portrait-frame">
              <Image
                src="/Images/founder/benson-cheripelli.webp"
                alt="Benson Cheripelli — Founder & Principal Interior Designer at Design My Nivas"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
                className="founder-portrait-img"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
              <div className="portrait-caption-chip">
                <span>Benson Cheripelli</span>
                <span className="caption-dot">·</span>
                <span>Founder &amp; Principal</span>
              </div>
            </div>

            {/* Human, Grounded Narrative */}
            <div className="founder-story-col">
              <span className="eyebrow">The Founder</span>
              <h2 className="founder-heading">Design is personal. So is how we build.</h2>

              <blockquote className="founder-quote">
                &ldquo;When a family entrusts us with their savings to design their home, they aren&apos;t buying woodwork. They are trusting us with the backdrop of their everyday life. That trust demands complete transparency.&rdquo;
              </blockquote>

              <p className="founder-p">
                Benson Cheripelli established Design My Nivas after witnessing the widespread friction plaguing Indian home interiors: initial quotes that magically inflated by 40% before completion, low-grade commercial ply passed off as waterproof wood, and site supervisors who rarely visited the work.
              </p>

              <p className="founder-p">
                Rather than operating as an impersonal design aggregator, Benson personally leads site reviews and technical drawings. He works directly with homeowners in Hyderabad, Warangal, and Karimnagar to translate spatial aspirations into reality.
              </p>

              <p className="founder-p">
                Clients working with Design My Nivas can expect direct access, uncompromising IS:710 marine plywood specifications, weekly photographic site documentation, and a home delivered precisely as rendered in 3D.
              </p>

              <div className="founder-action-wrap">
                <button
                  type="button"
                  onClick={() => openBookingModal({ source: "about-founder-section" })}
                  className="btn btn-primary founder-meet-btn"
                >
                  <span>Book a Consultation with Benson</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Design Philosophy & Why Clients Work With Us */}
      <section className="about-values-section" aria-label="Why Clients Choose Us">
        <div className="container-wide">
          <div className="values-header">
            <span className="eyebrow">Our Standards</span>
            <h2 className="values-title">Why homeowners choose Design My Nivas.</h2>
          </div>

          <div className="values-cards-grid">
            <div className="value-card">
              <div className="value-icon">&#10003;</div>
              <h3 className="value-name">Zero Hidden Costs</h3>
              <p className="value-desc">
                Before a single screw is turned, you receive a 100% itemized Bill of Quantities with locked material rates. We do not bill surprise variations.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">&#10003;</div>
              <h3 className="value-name">Plywood You Can Verify</h3>
              <p className="value-desc">
                We exclusively specify IS:710 certified Boiling Water Proof (BWP) marine plywood for all moisture zones and modular carcasses, verified on site before laminates are applied.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">&#10003;</div>
              <h3 className="value-name">Dedicated Site Engineers</h3>
              <p className="value-desc">
                A permanent senior supervisor is stationed at your property during execution, managing carpenters, electricians, and painters while delivering weekly photo logs.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">&#10003;</div>
              <h3 className="value-name">10-Year Hardware Warranty</h3>
              <p className="value-desc">
                We partner with world-renowned European hardware manufacturers including Blum and Hettich, offering guaranteed longevity and seamless soft-close movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Active Studio Locations */}
      <section className="about-locations-section" aria-label="Studio Service Areas">
        <div className="container-wide">
          <div className="locations-header">
            <span className="eyebrow">Studio Coverage</span>
            <h2 className="locations-title">Active across Telangana</h2>
          </div>

          <div className="locations-grid">
            <div className="location-box">
              <div className="loc-badge-top">
                <MapPin size={18} className="loc-pin" />
                <span className="loc-city">Hyderabad</span>
              </div>
              <p className="loc-summary">
                Headquarters &amp; primary design studio covering Gachibowli, Jubilee Hills, Banjara Hills, Madhapur, Financial District, and Tellapur.
              </p>
            </div>

            <div className="location-box">
              <div className="loc-badge-top">
                <MapPin size={18} className="loc-pin" />
                <span className="loc-city">Warangal</span>
              </div>
              <p className="loc-summary">
                Regional site engineering team managing premium flats and independent residences across Hanamkonda, Kazipet, and Warangal city.
              </p>
            </div>

            <div className="location-box">
              <div className="loc-badge-top">
                <MapPin size={18} className="loc-pin" />
                <span className="loc-city">Karimnagar</span>
              </div>
              <p className="loc-summary">
                Dedicated turnkey execution unit servicing modern apartment interiors and villas throughout Karimnagar and neighboring districts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Frequently Asked Questions (10 Detailed Items with Accordion Toggle) */}
      <section className="about-faq-section" aria-label="About Design My Nivas FAQs">
        <div className="container-narrow">
          <div className="section-header-compact text-center">
            <span className="eyebrow">Common Enquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Clear answers regarding our design philosophy, material standards, and turnkey operations.
            </p>
          </div>

          <div className="faq-accordion-list" role="region" aria-label="FAQ Accordion">
            {ABOUT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-accordion-item ${isOpen ? "faq-open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex((prev) => (prev === idx ? null : idx))}
                    aria-expanded={isOpen}
                    aria-controls={`about-faq-answer-${idx}`}
                    id={`about-faq-btn-${idx}`}
                  >
                    <span className="faq-q-text">{faq.question}</span>
                    <div className={`faq-toggle-icon ${isOpen ? "is-expanded" : ""}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`about-faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`about-faq-btn-${idx}`}
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

      {/* 6. Final Conversion CTA */}
      <section className="about-cta-section">
        <div className="container-wide">
          <div className="about-cta-card">
            <div className="card-ambient-glow" aria-hidden="true" />
            <span className="cta-tag">Begin Your Project</span>
            <h2 className="about-cta-title">Let&apos;s build a home you will love walking into every day.</h2>
            <p className="about-cta-sub">
              Book a complimentary 45-minute architectural consultation with Benson Cheripelli and our senior design team.
            </p>
            <button
              type="button"
              onClick={() => openBookingModal({ source: "about-bottom-cta" })}
              className="about-cta-btn"
              aria-label="Book a Consultation"
            >
              <span>Book a Consultation</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page-container {
          padding-top: calc(76px + var(--space-48));
          padding-bottom: var(--space-96);
          background-color: var(--background);
        }

        /* 1. Hero */
        .about-hero {
          padding-bottom: var(--space-64);
          border-bottom: 1px solid var(--border-subtle);
        }

        .about-hero-content {
          max-width: 820px;
        }

        .about-hero-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 650;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--foreground);
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .about-hero-lead {
          font-size: 1.2rem;
          line-height: 1.7;
          color: var(--foreground-muted);
        }

        /* 2. Metrics */
        .about-metrics-section {
          padding: var(--space-64) 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .metric-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .metric-number {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4vw, 3.25rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--brand-blue);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .metric-label {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 650;
          color: var(--foreground);
          margin-bottom: 0.375rem;
        }

        .metric-sub {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--foreground-muted);
        }

        /* 3. Founder Section */
        .about-founder-section {
          padding: var(--space-80) 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .founder-layout-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.25fr;
          gap: clamp(2.5rem, 6vw, 5rem);
          align-items: center;
        }

        .founder-portrait-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          overflow: hidden;
          background-color: var(--background-muted);
          border: 1px solid var(--border);
          box-shadow: 0 16px 40px rgba(24, 24, 24, 0.08);
        }

        :global(.founder-portrait-img) {
          object-fit: cover !important;
          object-position: top center !important;
        }

        .portrait-caption-chip {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          background-color: rgba(24, 24, 24, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.5rem 0.875rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 2;
        }

        .caption-dot {
          opacity: 0.4;
        }

        .founder-story-col {
          display: flex;
          flex-direction: column;
        }

        .founder-heading {
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .founder-quote {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-style: italic;
          line-height: 1.6;
          color: var(--foreground);
          border-left: 3px solid var(--brand-blue);
          padding-left: 1.25rem;
          margin: 0 0 1.5rem 0;
        }

        .founder-p {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--foreground-muted);
          margin-bottom: 1.25rem;
        }

        .founder-action-wrap {
          margin-top: 1rem;
        }

        :global(.founder-meet-btn) {
          height: 48px;
          padding: 0 2rem;
          font-size: 0.9375rem;
          border-radius: 12px !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 28px -4px rgba(41, 171, 226, 0.52), 0 4px 10px -2px rgba(41, 171, 226, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
        }

        :global(.founder-meet-btn:hover) {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(41, 171, 226, 0.7), 0 6px 16px -2px rgba(41, 171, 226, 0.45) !important;
        }

        /* 4. Values */
        .about-values-section {
          padding: var(--space-80) 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .values-header {
          max-width: 680px;
          margin-bottom: var(--space-48);
        }

        .values-title {
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-top: 0.5rem;
        }

        .values-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .value-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2rem;
        }

        .value-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--brand-blue);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .value-name {
          font-size: 1.2rem;
          font-weight: 650;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }

        .value-desc {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--foreground-muted);
        }

        /* 5. Locations */
        .about-locations-section {
          padding: var(--space-80) 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .locations-header {
          margin-bottom: var(--space-48);
        }

        .locations-title {
          font-size: clamp(1.85rem, 3.5vw, 2.5rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-top: 0.5rem;
        }

        .locations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .location-box {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2rem;
        }

        .loc-badge-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        :global(.loc-pin) {
          color: var(--brand-blue);
        }

        .loc-city {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 650;
          color: var(--foreground);
        }

        .loc-summary {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--foreground-muted);
        }

        /* 5.5 FAQ Section */
        .about-faq-section {
          padding: var(--space-80) 0;
          border-top: 1px solid var(--border-subtle);
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
          font-weight: 650;
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

        /* 6. CTA Banner */
        .about-cta-section {
          padding-top: var(--space-80);
        }

        .about-cta-card {
          position: relative;
          background-color: #FFFFFF;
          border: 1.5px solid rgba(41, 171, 226, 0.28);
          border-radius: 24px;
          padding: clamp(2.5rem, 6vw, 4.5rem);
          text-align: center;
          color: #181818;
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

        .cta-tag {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brand-blue);
          display: block;
          margin-bottom: 0.75rem;
        }

        .about-cta-title {
          font-size: clamp(1.85rem, 4vw, 2.75rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          color: #181818;
          max-width: 720px;
          margin: 0 auto 1rem auto;
        }

        .about-cta-sub {
          font-size: 1.0625rem;
          line-height: 1.65;
          color: #555555;
          max-width: 600px;
          margin: 0 auto 2rem auto;
        }

        :global(.about-cta-btn) {
          height: 48px;
          padding: 0 2.25rem;
          font-size: 1rem;
          border-radius: 12px !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 28px -4px rgba(41, 171, 226, 0.52), 0 4px 10px -2px rgba(41, 171, 226, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
        }

        :global(.about-cta-btn:hover) {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(41, 171, 226, 0.7), 0 6px 16px -2px rgba(41, 171, 226, 0.45) !important;
        }

        /* Media Queries */
        @media (max-width: 1024px) {
          .founder-layout-grid {
            grid-template-columns: 1fr;
          }

          .founder-portrait-frame {
            max-width: 480px;
            margin: 0 auto;
          }

          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .locations-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .values-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
