"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Home,
  Compass,
  ShieldCheck,
  CheckCircle2,
  PenTool,
  Layout,
  Sliders,
  ChevronDown,
  Award,
  FileCheck2,
  ArrowRight
} from "lucide-react";
import { ServiceItem } from "@/data/services";
import { getRelatedProjects } from "@/data/projects";
import { useBookingModal } from "@/context/booking-modal-context";
import { useCostEstimator } from "@/context/cost-estimator-context";
import ProjectCard from "@/components/projects/project-card";

interface ServiceDetailClientProps {
  service: ServiceItem;
  allServices: ServiceItem[];
}

const DESIGN_ICONS = [Layout, Sparkles, Compass, Home, Layers, Sliders, PenTool];
const SPEC_ICONS = [CheckCircle2, FileCheck2, ShieldCheck, Award, Layers, Sparkles];

export default function ServiceDetailClient({
  service,
}: ServiceDetailClientProps) {
  const { openBookingModal } = useBookingModal();
  const { openCostEstimator } = useCostEstimator();
  const relatedProjects = getRelatedProjects(service.slug);

  // Interactive accordion FAQ toggle state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="service-detail-container">
      {/* 01. Architectural Hero Header */}
      <section className="detail-hero-section" aria-label={`${service.name} Hero`}>
        <div className="container-wide">
          {/* Breadcrumb Navigation */}
          <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/services" className="breadcrumb-back">
              <span aria-hidden="true">&larr;</span>
              <span>All Services</span>
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{service.name}</span>
          </nav>

          <div className="hero-content-grid">
            <div className="hero-text-col">
              <div className="service-badge-tag">
                <span>0{service.number.replace(/^0+/, "")}</span>
                <span className="badge-dot">·</span>
                <span>Turnkey Residential Service</span>
              </div>

              <h1 className="service-hero-title">{service.name}</h1>

              <p className="service-hero-lead">{service.shortDescription}</p>

              <div className="hero-actions-row">
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      service: service.name,
                      source: `service-detail-${service.slug}`,
                    })
                  }
                  className="hero-book-btn"
                  aria-label={`Book this service: ${service.name}`}
                >
                  <span>Book this service</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openCostEstimator({
                      service: service.slug,
                    })
                  }
                  className="hero-estimate-btn"
                  aria-label={`Estimate cost for ${service.name}`}
                >
                  <span>Estimate cost</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Service Locations Strip */}
              <div className="hero-locations-strip">
                <span className="locations-label">Active Studio Execution in:</span>
                <div className="locations-list">
                  {service.locationAvailability.map((loc) => (
                    <Link
                      key={loc}
                      href={`/interior-designers/${loc.toLowerCase()}`}
                      className="loc-pill"
                      title={`Interior design services in ${loc}`}
                    >
                      {loc}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Large Architectural Hero Image */}
            <div className="hero-image-col">
              <div className="hero-image-frame">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="hero-service-img"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. What We Design (Scope & Deliverables: 3 in a row with Lucide icons & White/Blue Theme) */}
      <section className="detail-section scope-section" aria-label="What We Design">
        <div className="container-wide">
          <div className="section-header-compact">
            <span className="eyebrow">Scope &amp; Deliverables</span>
            <h2 className="section-title">What We Design</h2>
            <p className="section-subtitle">
              Every detail is planned around ergonomics, utility, and visual harmony in white and blue precision.
            </p>
          </div>

          <div className="scope-cards-grid">
            {service.whatWeDesign.map((item, index) => {
              const IconComp = DESIGN_ICONS[index % DESIGN_ICONS.length];
              return (
                <div key={index} className="scope-card">
                  <div className="scope-card-top">
                    <div className="scope-icon-box">
                      <IconComp size={20} className="scope-icon" />
                    </div>
                    <span className="scope-num">0{index + 1}</span>
                  </div>
                  <h3 className="scope-text">{item}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. What You Get (Material & Execution Standards: 3 in a row with Icons & Cards) */}
      <section className="detail-section specs-section" aria-label="What You Get">
        <div className="container-wide">
          <div className="section-header-compact">
            <span className="eyebrow">Material &amp; Execution Standards</span>
            <h2 className="section-title">What You Get</h2>
            <p className="section-subtitle">
              No vague luxury claims. Transparent specifications, factory-grade precision, and locked estimates.
            </p>
          </div>

          <div className="specs-cards-grid">
            {service.whatYouGet.map((spec, index) => {
              const IconComp = SPEC_ICONS[index % SPEC_ICONS.length];
              return (
                <div key={index} className="spec-card">
                  <div className="spec-icon-box">
                    <IconComp size={20} className="spec-icon" />
                  </div>
                  <div className="spec-body">
                    <p className="spec-content">{spec}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04. Service Gallery */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="detail-section gallery-section" aria-label="Service Gallery">
          <div className="container-wide">
            <div className="section-header-compact">
              <span className="eyebrow">Visual Inspiration</span>
              <h2 className="section-title">Project Gallery</h2>
              <p className="section-subtitle">
                Real residential interiors designed and delivered by Design My Nivas.
              </p>
            </div>

            <div className="gallery-masonry-grid">
              {(service.gallery && service.gallery.length >= 3
                ? service.gallery.slice(0, 3)
                : [
                    service.gallery?.[0] || service.image,
                    service.gallery?.[1] || "/Images/main-hero.webp",
                    service.gallery?.[2] || "/Images/services/complete-home-interiors.webp",
                  ]
              ).map((imgSrc, idx) => (
                <div key={idx} className="gallery-frame">
                  <Image
                    src={imgSrc}
                    alt={`${service.name} project photography ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="gallery-img"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 05. Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="detail-section related-projects-section" aria-label="Related Projects">
          <div className="container-wide">
            <div className="section-header-compact">
              <span className="eyebrow">Finished Homes</span>
              <h2 className="section-title">Homes Featuring This Work</h2>
              <p className="section-subtitle">
                Take a closer look at recent turnkey residences across Telangana.
              </p>
            </div>

            <div className="related-projects-grid">
              {relatedProjects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 06. Turnkey Execution Process */}
      <section className="detail-section process-step-section" aria-label="How We Work">
        <div className="container-wide">
          <div className="section-header-compact">
            <span className="eyebrow">Structured Execution</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              From site survey to keys in hand: predictable, stress-free milestones.
            </p>
          </div>

          <div className="process-flow-grid">
            <div className="process-flow-card">
              <div className="process-step-num">01</div>
              <h3 className="process-step-title">Site Survey &amp; 3D Design</h3>
              <p className="process-step-desc">
                Laser measurement, space planning, and photorealistic 3D drawings tailored to your everyday lifestyle.
              </p>
            </div>

            <div className="process-flow-card">
              <div className="process-step-num">02</div>
              <h3 className="process-step-title">100% Locked Estimate</h3>
              <p className="process-step-desc">
                Transparent itemized bill of quantities with guaranteed pricing. Zero surprise invoices during the build.
              </p>
            </div>

            <div className="process-flow-card">
              <div className="process-step-num">03</div>
              <h3 className="process-step-title">Factory Build &amp; Site Ownership</h3>
              <p className="process-step-desc">
                German machinery precision woodwork and senior on-site supervisor managing artisans with weekly photo updates.
              </p>
            </div>

            <div className="process-flow-card">
              <div className="process-step-num">04</div>
              <h3 className="process-step-title">Handover &amp; 10-Year Warranty</h3>
              <p className="process-step-desc">
                Thorough 3-stage snagging audit, deep cleaning, formal handover dossier, and 10-year warranty certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07. FAQ Section: Interactive Toggle Accordion with 10 Detailed Questions */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="detail-section faq-section" aria-label="Frequently Asked Questions">
          <div className="container-narrow">
            <div className="section-header-compact text-center">
              <span className="eyebrow">Common Enquiries</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Clear answers to help you plan your {service.name.toLowerCase()} with confidence. Tap each question to view details.
              </p>
            </div>

            <div className="faq-accordion-list" role="region" aria-label="FAQ Accordion">
              {service.faqs.map((faq, idx) => {
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
                      aria-controls={`faq-answer-${idx}`}
                      id={`faq-btn-${idx}`}
                    >
                      <span className="faq-q-text">{faq.question}</span>
                      <div className={`faq-toggle-icon ${isOpen ? "is-expanded" : ""}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
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
      )}

      {/* 08. Unified White & Blue Rectangular Final Conversion CTA */}
      <section className="detail-final-cta" aria-label="Book Consultation">
        <div className="container-wide">
          <div className="cta-box-card">
            {/* Ambient subtle blue top glow */}
            <div className="card-ambient-glow" aria-hidden="true" />

            <div className="cta-box-content">
              <span className="cta-eyebrow">Ready to begin?</span>
              <h2 className="cta-heading">Ready to plan your {service.name.toLowerCase()}?</h2>
              <p className="cta-text">
                Speak with Benson Cheripelli and our senior design team. Get a tailored 3D space plan and a guaranteed itemized estimate.
              </p>
              <div className="cta-dual-actions">
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      service: service.name,
                      source: `service-detail-cta-${service.slug}`,
                    })
                  }
                  className="cta-action-primary"
                  aria-label={`Book this service: ${service.name}`}
                >
                  <span>Book this service</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openCostEstimator({
                      service: service.slug,
                    })
                  }
                  className="cta-action-secondary"
                  aria-label={`Estimate cost for ${service.name}`}
                >
                  <span>Estimate cost</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .service-detail-container {
          padding-top: calc(76px + var(--space-32));
          padding-bottom: var(--space-96);
          background-color: var(--background);
        }

        /* Breadcrumb */
        .detail-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 2rem;
          font-size: 0.8125rem;
          color: var(--foreground-subtle);
        }

        .breadcrumb-back {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-weight: 600;
          color: var(--foreground);
          transition: color 0.15s ease;
          text-decoration: none;
        }

        .breadcrumb-back:hover {
          color: #29ABE2;
        }

        .breadcrumb-sep {
          opacity: 0.4;
        }

        .breadcrumb-current {
          color: var(--foreground-muted);
          font-weight: 500;
        }

        /* 01. Hero Grid */
        .detail-hero-section {
          padding-bottom: var(--space-64);
          border-bottom: 1px solid var(--border-subtle);
        }

        .hero-content-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(2rem, 5vw, 4rem);
          align-items: center;
        }

        .service-badge-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #29ABE2;
          background-color: rgba(41, 171, 226, 0.08);
          border: 1px solid rgba(41, 171, 226, 0.2);
          padding: 0.35rem 0.875rem;
          border-radius: 980px;
          margin-bottom: 1.25rem;
        }

        .badge-dot {
          opacity: 0.5;
        }

        .service-hero-title {
          font-size: clamp(2.25rem, 4.2vw, 3.5rem);
          font-weight: 650;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-bottom: 1.25rem;
        }

        .service-hero-lead {
          font-size: 1.125rem;
          line-height: 1.65;
          color: var(--foreground-muted);
          margin-bottom: 2rem;
          max-width: 580px;
        }

        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .hero-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 48px;
          padding: 0 1.65rem;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%);
          color: #ffffff;
          border: 1px solid #29ABE2;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 650;
          cursor: pointer;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.5);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-book-btn:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -4px rgba(41, 171, 226, 0.65);
        }

        .hero-estimate-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 48px;
          padding: 0 1.5rem;
          background: #ffffff;
          color: #29ABE2;
          border: 1.5px solid #29ABE2;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-estimate-btn:hover {
          background-color: rgba(41, 171, 226, 0.06);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px -3px rgba(41, 171, 226, 0.2);
        }

        .hero-locations-strip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          font-size: 0.8125rem;
          color: var(--foreground-subtle);
        }

        .locations-label {
          font-weight: 600;
        }

        .locations-list {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .loc-pill {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0.2rem 0.5rem;
          font-weight: 500;
          color: var(--foreground);
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .loc-pill:hover {
          border-color: #29ABE2;
          color: #29ABE2;
          background: #F0F9FF;
        }

        .hero-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 24px;
          overflow: hidden;
          background-color: var(--background-muted);
          border: 1px solid var(--border);
          box-shadow: 0 12px 40px rgba(24, 24, 24, 0.06);
        }

        :global(.hero-service-img) {
          object-fit: cover !important;
        }

        /* Detail Section Standards */
        .detail-section {
          padding: var(--space-80) 0;
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
        }

        .text-center .section-subtitle {
          margin: 0 auto;
        }

        /* 02. What We Design Grid: 3 IN A ROW with White Cards & Blue Hover */
        .scope-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .scope-card {
          background-color: #ffffff;
          border: 1.5px solid #E5E2DC;
          border-radius: 18px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.02);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scope-card:hover {
          border-color: #29ABE2;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px -4px rgba(41, 171, 226, 0.15), 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .scope-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .scope-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(41, 171, 226, 0.08);
          border: 1px solid rgba(41, 171, 226, 0.2);
          color: #29ABE2;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }

        .scope-card:hover .scope-icon-box {
          background: #29ABE2;
          color: #ffffff;
        }

        .scope-num {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 750;
          color: #29ABE2;
          letter-spacing: 0.08em;
        }

        .scope-text {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--foreground);
          line-height: 1.4;
          margin: 0;
        }

        /* 03. What You Get Grid: 3 IN A ROW with Icons & Cards */
        .specs-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .spec-card {
          background-color: #ffffff;
          border: 1.5px solid #E5E2DC;
          border-radius: 18px;
          padding: 1.65rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.02);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spec-card:hover {
          border-color: #29ABE2;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px -4px rgba(41, 171, 226, 0.12);
        }

        .spec-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(41, 171, 226, 0.1);
          color: #29ABE2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .spec-body {
          flex: 1;
        }

        .spec-content {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: var(--foreground);
          font-weight: 500;
          margin: 0;
        }

        /* 04. Gallery — Strictly 3 in a row */
        .gallery-masonry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .gallery-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 18px;
          overflow: hidden;
          background-color: var(--background-muted);
          border: 1px solid var(--border);
          box-shadow: 0 4px 16px rgba(24, 24, 24, 0.04);
        }

        :global(.gallery-img) {
          object-fit: cover !important;
          transition: transform 0.4s ease;
        }

        .gallery-frame:hover :global(.gallery-img) {
          transform: scale(1.03);
        }

        /* 05. Related Projects Grid */
        .related-projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        /* 06. Process Flow */
        .process-flow-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .process-flow-card {
          background-color: #ffffff;
          border: 1.5px solid #E5E2DC;
          border-radius: 18px;
          padding: 1.75rem 1.5rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .process-flow-card:hover {
          border-color: #29ABE2;
          transform: translateY(-2px);
        }

        .process-step-num {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 750;
          color: #29ABE2;
          margin-bottom: 0.875rem;
          letter-spacing: 0.05em;
        }

        .process-step-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .process-step-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--foreground-muted);
        }

        /* 07. Interactive FAQ Accordion */
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
          animation: faqFadeIn 0.25s ease;
        }

        @keyframes faqFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .faq-answer-text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: #4A4A4A;
          margin-top: 0.875rem;
        }

        /* 08. Unified White & Blue Final CTA Box Card */
        .detail-final-cta {
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

        .cta-dual-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-action-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 48px;
          padding: 0 2rem;
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

        .cta-action-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 48px;
          padding: 0 1.75rem;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: 12px;
          background: #ffffff;
          border: 1.5px solid #29ABE2;
          color: #29ABE2;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-action-secondary:hover {
          background-color: rgba(41, 171, 226, 0.06);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px -3px rgba(41, 171, 226, 0.2);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-content-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .hero-image-col {
            order: -1;
          }

          .scope-cards-grid,
          .specs-cards-grid,
          .related-projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .gallery-masonry-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .process-flow-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .scope-cards-grid,
          .specs-cards-grid,
          .related-projects-grid,
          .process-flow-grid,
          .gallery-masonry-grid {
            grid-template-columns: 1fr;
          }

          .hero-actions-row,
          .cta-dual-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-book-btn,
          .hero-estimate-btn,
          .cta-action-primary,
          .cta-action-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
