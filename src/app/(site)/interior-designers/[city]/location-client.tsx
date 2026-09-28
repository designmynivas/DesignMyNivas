"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Building,
  Home,
  Sparkles,
  PhoneCall
} from "lucide-react";
import { LocationItem } from "@/data/locations";
import { servicesData } from "@/data/services";
import { useBookingModal } from "@/context/booking-modal-context";
import { useCostEstimator } from "@/context/cost-estimator-context";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import { getLocationBreadcrumbs } from "@/lib/seo/breadcrumbs";

interface LocationClientProps {
  location: LocationItem;
}

export default function LocationClient({ location }: LocationClientProps) {
  const { openBookingModal } = useBookingModal();
  const { openCostEstimator } = useCostEstimator();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const breadcrumbs = getLocationBreadcrumbs(location.city, location.slug);

  return (
    <div className="location-page-container">
      {/* 01. Location Hero Header */}
      <section className="location-hero" aria-label={`${location.city} Interior Design Hero`}>
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} includeSchema={false} />

          <div className="hero-grid">
            <div className="hero-text-col">
              <div className="location-badge">
                <MapPin size={14} className="badge-pin-icon" />
                <span>{location.city}, {location.state} · Turnkey Interior Studio</span>
              </div>

              <h1 className="location-headline">{location.headline}</h1>

              <p className="location-lead">{location.subheadline}</p>

              <div className="hero-actions-row">
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      service: `Interior Design in ${location.city}`,
                      source: `location-${location.slug}-hero`,
                    })
                  }
                  className="btn-primary-location"
                  aria-label={`Book Consultation in ${location.city}`}
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openCostEstimator({
                      service: "complete-home-interiors",
                    })
                  }
                  className="btn-outline-location"
                  aria-label={`Estimate Interior Cost for ${location.city}`}
                >
                  <span>Estimate Cost</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="hero-metrics-strip">
                <div className="metric-pill">
                  <span className="metric-val">5+</span>
                  <span className="metric-txt">Years in Practice</span>
                </div>
                <div className="metric-divider" />
                <div className="metric-pill">
                  <span className="metric-val">70+</span>
                  <span className="metric-txt">Completed Homes</span>
                </div>
                <div className="metric-divider" />
                <div className="metric-pill">
                  <span className="metric-val">100%</span>
                  <span className="metric-txt">Itemized BOQ Pricing</span>
                </div>
              </div>
            </div>

            <div className="hero-image-col">
              <div className="hero-image-frame">
                <Image
                  src={location.heroImage}
                  alt={`${location.city} Residential Interiors by Design My Nivas`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="hero-location-img"
                  style={{ objectFit: "cover" }}
                />
                <div className="image-caption-pill">
                  <span>Active Residential Projects in {location.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Direct AEO Overview */}
      <section className="overview-section" aria-label="City Overview">
        <div className="container-wide">
          <div className="overview-card">
            <span className="section-eyebrow">Local Practice & Entity</span>
            <h2 className="overview-title">Turnkey Interior Design in {location.city} by Design My Nivas</h2>
            <p className="overview-text">{location.overview}</p>
          </div>
        </div>
      </section>

      {/* 03. Types of Homes Served */}
      <section className="homes-served-section" aria-label="Home Typologies Served">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-eyebrow">Home Typologies</span>
            <h2 className="section-title">Residential Homes We Design in {location.city}</h2>
            <p className="section-subtitle">
              Every residence in {location.city} has unique architectural traits. Here is how we customize layouts for different home structures.
            </p>
          </div>

          <div className="homes-grid">
            {location.homeTypesServed.map((type, idx) => (
              <div key={type.title} className="home-type-card">
                <div className="card-top-icon">
                  {idx === 0 ? <Building size={22} /> : idx === 1 ? <Home size={22} /> : <Sparkles size={22} />}
                </div>
                <h3 className="card-heading">{type.title}</h3>
                <p className="card-description">{type.description}</p>
                <div className="areas-tag-list">
                  <span className="areas-label">Common Areas:</span>
                  <div className="tags-flex">
                    {type.typicalAreas.map((area) => (
                      <span key={area} className="area-tag">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Local Design Considerations */}
      <section className="considerations-section" aria-label="Local Design Considerations">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-eyebrow">Architectural Engineering</span>
            <h2 className="section-title">Design Considerations Unique to {location.city}</h2>
            <p className="section-subtitle">
              From regional climate challenges to spatial needs, our engineering team factors local site conditions into every drawing.
            </p>
          </div>

          <div className="considerations-grid">
            {location.localDesignConsiderations.map((item, idx) => (
              <div key={item.title} className="consideration-card">
                <div className="consideration-num">0{idx + 1}</div>
                <h3 className="consideration-title">{item.title}</h3>
                <p className="consideration-desc">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Contextual Link to Local Homeowner Guide */}
          <div className="location-guide-banner" style={{ marginTop: "2.5rem", padding: "1.5rem 2rem", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #CBD5E1", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.25rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0284C7", display: "block", marginBottom: "0.35rem" }}>
                Deep Topical Planning Guide
              </span>
              <h3 style={{ fontSize: "1.1875rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                Planning home interiors in {location.city}? Read our comprehensive local guide
              </h3>
            </div>
            <Link href={`/interior-designers/${location.slug}/home-interior-guide`} className="btn btn-secondary" style={{ whiteSpace: "nowrap" }}>
              <span>Read {location.city} Guide</span>
              <ArrowRight size={15} aria-hidden="true" style={{ marginLeft: "0.35rem" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* 05. Service Coverage & Execution Guarantees */}
      <section className="coverage-section" aria-label="Service Coverage">
        <div className="container-wide">
          <div className="coverage-card-wrapper">
            <div className="coverage-text-side">
              <span className="section-eyebrow">Quality & Site Control</span>
              <h2 className="coverage-title">How We Supervise Sites in {location.city}</h2>
              <div className="coverage-items-list">
                {location.serviceCoverage.map((cov) => (
                  <div key={cov.title} className="coverage-item">
                    <CheckCircle2 size={20} className="check-icon" />
                    <div>
                      <h4 className="coverage-item-title">{cov.title}</h4>
                      <p className="coverage-item-desc">{cov.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="coverage-cta-side">
              <div className="consult-box">
                <h3 className="consult-box-title">Planning a home in {location.city}?</h3>
                <p className="consult-box-desc">
                  Bring your floor plan for a 45-minute spatial consultation with our senior design team.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      service: `Turnkey Interior in ${location.city}`,
                      source: `location-${location.slug}-cta-box`,
                    })
                  }
                  className="consult-box-btn"
                >
                  <PhoneCall size={16} />
                  <span>Book Site Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Projects in this location */}
      {location.localProjects.length > 0 && (
        <section className="location-projects-section" aria-label="Completed Projects">
          <div className="container-wide">
            <div className="section-header">
              <span className="section-eyebrow">Real Evidence</span>
              <h2 className="section-title">Completed Work in {location.city}</h2>
              <p className="section-subtitle">
                Explore real homes designed and executed by Design My Nivas.
              </p>
            </div>

            <div className="projects-grid">
              {location.localProjects.map((p) => (
                <div key={p.slug} className="local-project-card">
                  <div className="project-image-box">
                    <Image
                      src={p.image}
                      alt={`${p.title} — ${p.type} in ${p.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="project-thumb-img"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="project-city-tag">{p.location}</div>
                  </div>
                  <div className="project-details-box">
                    <span className="project-cat">{p.type}</span>
                    <h3 className="project-name">{p.title}</h3>
                    <p className="project-scope-txt">{p.scope}</p>
                    <div className="project-actions">
                      <Link href={`/projects/${p.slug}`} className="project-view-link">
                        <span>View Project Details</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 07. Core Services Available */}
      <section className="services-cluster-section" aria-label="Services Available">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-eyebrow">Specialized Services</span>
            <h2 className="section-title">Interior Design Services Available in {location.city}</h2>
            <p className="section-subtitle">
              Each service is coordinated directly under our single-point turnkey execution contract.
            </p>
          </div>

          <div className="services-links-grid">
            {servicesData.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="service-link-card"
              >
                <div className="svc-top">
                  <span className="svc-num">{svc.number}</span>
                  <ArrowRight size={16} className="svc-arrow" />
                </div>
                <h3 className="svc-name">{svc.name}</h3>
                <p className="svc-desc">{svc.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 08. Local FAQs Accordion (AEO Direct Answers) */}
      <section className="faqs-section" aria-label="Frequently Asked Questions">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-eyebrow">Direct Answers (AEO)</span>
            <h2 className="section-title">Common Questions About Interior Design in {location.city}</h2>
            <p className="section-subtitle">
              Transparent, factual answers about pricing, site timelines, and material warranties.
            </p>
          </div>

          <div className="faqs-accordion">
            {location.localFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-icon-wrap">
                      <ChevronDown
                        size={18}
                        className={`faq-chevron ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 09. Final Bottom CTA */}
      <section className="location-bottom-cta">
        <div className="container-wide">
          <div className="bottom-cta-banner">
            <h2 className="bottom-cta-headline">
              Ready to design your home in {location.city}?
            </h2>
            <p className="bottom-cta-sub">
              Book a complimentary 45-minute consultation with Benson Cheripelli and our senior design engineering team.
            </p>
            <div className="bottom-cta-actions">
              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    service: `Home Interior Consultation in ${location.city}`,
                    source: `location-${location.slug}-bottom-cta`,
                  })
                }
                className="btn-primary-location"
              >
                <span>Book Consultation</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() =>
                  openCostEstimator({
                    service: "complete-home-interiors",
                  })
                }
                className="btn-outline-location"
              >
                <span>Estimate Your Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .location-page-container {
          background-color: #FAFAFA;
          color: #181818;
          padding-top: 100px;
          min-height: 100vh;
        }

        .container-wide {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Hero */
        .location-hero {
          padding: 1.5rem 0 3.5rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3rem;
          align-items: center;
        }

        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(2, 132, 199, 0.08);
          color: #0284C7;
          border: 1px solid rgba(2, 132, 199, 0.2);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        .location-headline {
          font-family: var(--font-inter, sans-serif);
          font-size: clamp(2rem, 3.8vw, 3.125rem);
          font-weight: 700;
          color: #0F172A;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0 0 1.25rem 0;
        }

        .location-lead {
          font-size: 1.0625rem;
          line-height: 1.65;
          color: #475569;
          margin: 0 0 2rem 0;
          max-width: 620px;
        }

        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.25rem;
        }

        .btn-primary-location {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0284C7;
          color: #FFFFFF;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.875rem 1.625rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
          white-space: nowrap;
        }

        .btn-primary-location:hover {
          background: #0369A1;
          transform: translateY(-1px);
        }

        .btn-outline-location {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          color: #0F172A;
          border: 1px solid #CBD5E1;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .btn-outline-location:hover {
          border-color: #0284C7;
          color: #0284C7;
        }

        .hero-metrics-strip {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 1.25rem;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          max-width: fit-content;
        }

        .metric-pill {
          display: flex;
          flex-direction: column;
        }

        .metric-val {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          line-height: 1;
        }

        .metric-txt {
          font-size: 0.75rem;
          color: #64748B;
          margin-top: 0.2rem;
          font-weight: 500;
        }

        .metric-divider {
          width: 1px;
          height: 28px;
          background: #E2E8F0;
        }

        .hero-image-frame {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          border: 1px solid #E2E8F0;
        }

        .image-caption-pill {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 500;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
        }

        /* Overview */
        .overview-section {
          padding: 2.5rem 0;
        }

        .overview-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0284C7;
          margin-bottom: 0.5rem;
        }

        .overview-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 1rem 0;
        }

        .overview-text {
          font-size: 1rem;
          line-height: 1.7;
          color: #475569;
          margin: 0;
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 3rem auto;
        }

        .section-title {
          font-size: clamp(1.75rem, 2.8vw, 2.25rem);
          font-weight: 700;
          color: #0F172A;
          line-height: 1.2;
          margin: 0 0 0.75rem 0;
        }

        .section-subtitle {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #64748B;
          margin: 0;
        }

        /* Homes Served */
        .homes-served-section {
          padding: 4rem 0;
        }

        .homes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .home-type-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 6px rgba(0,0,0,0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .home-type-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .card-top-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(2, 132, 199, 0.08);
          color: #0284C7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .card-heading {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 0.75rem 0;
        }

        .card-description {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #64748B;
          margin: 0 0 1.25rem 0;
          flex-grow: 1;
        }

        .areas-tag-list {
          border-top: 1px solid #F1F5F9;
          padding-top: 1rem;
        }

        .areas-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 0.4rem;
        }

        .tags-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .area-tag {
          font-size: 0.75rem;
          background: #F8FAFC;
          color: #475569;
          border: 1px solid #E2E8F0;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        /* Considerations */
        .considerations-section {
          padding: 3.5rem 0;
          background: #F1F5F9;
        }

        .considerations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .consideration-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 2rem;
          position: relative;
        }

        .consideration-num {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0284C7;
          opacity: 0.3;
          margin-bottom: 0.5rem;
        }

        .consideration-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 0.65rem 0;
        }

        .consideration-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: #64748B;
          margin: 0;
        }

        /* Coverage */
        .coverage-section {
          padding: 4rem 0;
        }

        .coverage-card-wrapper {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 3rem;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 3rem;
          align-items: center;
        }

        .coverage-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 1.75rem 0;
        }

        .coverage-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .coverage-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .check-icon {
          color: #0284C7;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .coverage-item-title {
          font-size: 1rem;
          font-weight: 600;
          color: #0F172A;
          margin: 0 0 0.25rem 0;
        }

        .coverage-item-desc {
          font-size: 0.875rem;
          line-height: 1.55;
          color: #64748B;
          margin: 0;
        }

        .consult-box {
          background: #0F172A;
          color: #FFFFFF;
          border-radius: 14px;
          padding: 2.25rem;
        }

        .consult-box-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.75rem 0;
          color: #FFFFFF;
        }

        .consult-box-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #94A3B8;
          margin: 0 0 1.5rem 0;
        }

        .consult-box-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #0284C7;
          color: #FFFFFF;
          width: 100%;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.875rem 1rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .consult-box-btn:hover {
          background: #0369A1;
        }

        /* Projects */
        .location-projects-section {
          padding: 3.5rem 0;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .local-project-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.03);
        }

        .project-image-box {
          position: relative;
          aspect-ratio: 16/10;
          background: #0F172A;
        }

        .project-city-tag {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(15, 23, 42, 0.8);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          backdrop-filter: blur(4px);
        }

        .project-details-box {
          padding: 1.5rem;
        }

        .project-cat {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #0284C7;
          letter-spacing: 0.05em;
        }

        .project-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0.35rem 0 0.5rem 0;
          text-transform: capitalize;
        }

        .project-scope-txt {
          font-size: 0.875rem;
          color: #64748B;
          line-height: 1.5;
          margin: 0 0 1.25rem 0;
        }

        .project-view-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0284C7;
          text-decoration: none;
        }

        .project-view-link:hover {
          text-decoration: underline;
        }

        /* Services Cluster */
        .services-cluster-section {
          padding: 4rem 0;
          background: #F8FAFC;
        }

        .services-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .service-link-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 1.5rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .service-link-card:hover {
          border-color: #0284C7;
          transform: translateY(-2px);
        }

        .svc-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .svc-num {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .svc-arrow {
          color: #94A3B8;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .service-link-card:hover .svc-arrow {
          color: #0284C7;
          transform: translateX(3px);
        }

        .svc-name {
          font-size: 1rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 0.5rem 0;
        }

        .svc-desc {
          font-size: 0.8125rem;
          color: #64748B;
          line-height: 1.5;
          margin: 0;
        }

        /* FAQs */
        .faqs-section {
          padding: 4rem 0;
        }

        .faqs-accordion {
          max-width: 840px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .faq-item {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
        }

        .faq-item.is-open {
          border-color: #BAE6FD;
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          gap: 1rem;
        }

        .faq-question-text {
          font-size: 1rem;
          font-weight: 600;
          color: #0F172A;
          line-height: 1.4;
        }

        .faq-icon-wrap {
          color: #0284C7;
          flex-shrink: 0;
        }

        .faq-chevron {
          transition: transform 0.2s ease;
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .faq-answer-panel {
          padding: 0 1.5rem 1.25rem 1.5rem;
        }

        .faq-answer-text {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: #475569;
          margin: 0;
        }

        /* Bottom CTA */
        .location-bottom-cta {
          padding: 2rem 0 5rem;
        }

        .bottom-cta-banner {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          border-radius: 18px;
          padding: clamp(2.5rem, 5vw, 4rem);
          text-align: center;
          color: #FFFFFF;
        }

        .bottom-cta-headline {
          font-size: clamp(1.75rem, 3.2vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: #FFFFFF;
        }

        .bottom-cta-sub {
          font-size: 1.0625rem;
          color: #94A3B8;
          max-width: 580px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        .bottom-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .homes-grid, .considerations-grid {
            grid-template-columns: 1fr;
          }
          .coverage-card-wrapper {
            grid-template-columns: 1fr;
            padding: 2rem;
          }
          .services-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .services-links-grid {
            grid-template-columns: 1fr;
          }
          .hero-actions-row {
            flex-direction: column;
            align-items: stretch;
          }
          .btn-primary-location, .btn-outline-location {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
