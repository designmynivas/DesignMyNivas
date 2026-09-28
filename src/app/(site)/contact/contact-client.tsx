"use client";

import { useState } from "react";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { servicesData } from "@/data/services";
import { Phone, MessageSquare, Mail, MapPin, ChevronDown } from "lucide-react";

const CONTACT_FAQS = [
  {
    question: "Is the initial 45-minute spatial consultation free of charge?",
    answer: "Yes, our initial consultation is completely complimentary. We review your floor plan, discuss your family's routines and preferences, and explain practical material options."
  },
  {
    question: "What documents should I prepare for our first discussion?",
    answer: "Having your builder's 2D floor plan or architectural layout is very helpful. If you have any visual inspiration photos or specific material preferences, feel free to share them as well."
  },
  {
    question: "Can we arrange a site visit directly at our flat or villa?",
    answer: "Yes, our senior engineers can meet you directly on-site across Hyderabad, Warangal, or Karimnagar to take laser measurements and assess physical beam drops and plumbing lines."
  },
  {
    question: "How soon will I receive an itemized estimate after the consultation?",
    answer: "We typically furnish a comprehensive, itemized Bill of Quantities (BOQ) with locked milestone pricing within 48 to 72 business hours after floor plan review."
  },
  {
    question: "Can I contact you directly via WhatsApp for quick questions?",
    answer: "Yes, you can tap the 'Chat on WhatsApp' button anywhere on our website to chat directly with our design and execution coordination team."
  },
  {
    question: "What locations do you cover for full turnkey projects?",
    answer: "We actively execute turnkey residential projects in Hyderabad, Warangal, and Karimnagar with local supervisors stationed on site."
  },
  {
    question: "Can we make design consultations on weekends?",
    answer: "Yes, we schedule video and in-person spatial consultations on Saturdays and Sundays to fit comfortably around your working hours."
  },
  {
    question: "Is there any obligation to proceed after receiving an estimate?",
    answer: "None whatsoever. Our estimates are 100% transparent and without obligation so you can make informed decisions in your own time."
  },
  {
    question: "Who will manage our site once we confirm the booking?",
    answer: "A dedicated senior site engineer is assigned exclusively to your home, managing artisans, daily quality audits, and sending weekly photo/video logs."
  },
  {
    question: "How are project payments structured?",
    answer: "Payments are tied strictly to verifiable construction milestones: initial 3D drawing sign-off, factory woodwork production, site assembly, and final snag clearance."
  },
];

export default function ContactClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "Hyderabad",
    service: "Complete Home Interiors",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappUrl = getWhatsAppUrl(
    "Hello Design My Nivas, I would like to talk about residential interiors for my home."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate or submit lead to Supabase
      await new Promise((res) => setTimeout(res, 500));
      setSubmitted(true);
    } catch {
      setErrorMsg("Something went wrong. Please reach us via WhatsApp instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-container">
      {/* 1. Header */}
      <header className="contact-hero-header">
        <div className="container-wide">
          <div className="contact-header-content">
            <span className="eyebrow">Connect Directly</span>
            <h1 className="contact-main-headline">Let&apos;s talk about your home.</h1>
            <p className="contact-main-lead">
              Planning a new flat, villa interior, or modular renovation? Share your requirements or reach out directly. Benson Cheripelli and our senior design team will respond within 24 hours.
            </p>
          </div>
        </div>
      </header>

      {/* 2. Direct Channels & Locations Grid */}
      <section className="contact-methods-section" aria-label="Direct Contact Channels">
        <div className="container-wide">
          <div className="contact-methods-grid">
            {/* Phone */}
            <div className="contact-method-card">
              <div className="method-icon-wrap">
                <Phone size={20} className="method-icon" />
              </div>
              <span className="method-label">Direct Phone</span>
              <p className="method-desc">Call for immediate project discussions</p>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="method-action-link">
                {siteConfig.phone}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="contact-method-card">
              <div className="method-icon-wrap">
                <MessageSquare size={20} className="method-icon" />
              </div>
              <span className="method-label">Direct WhatsApp</span>
              <p className="method-desc">Share floor plans, photos &amp; drawings</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="method-action-link"
              >
                Chat on WhatsApp &rarr;
              </a>
            </div>

            {/* Email */}
            <div className="contact-method-card">
              <div className="method-icon-wrap">
                <Mail size={20} className="method-icon" />
              </div>
              <span className="method-label">Direct Email</span>
              <p className="method-desc">Send formal architectural briefs &amp; tender BOQs</p>
              <a href={`mailto:${siteConfig.email}`} className="method-action-link">
                {siteConfig.email}
              </a>
            </div>

            {/* Service Locations */}
            <div className="contact-method-card">
              <div className="method-icon-wrap">
                <MapPin size={20} className="method-icon" />
              </div>
              <span className="method-label">Service Locations</span>
              <p className="method-desc">Active turnkey studio sites across Telangana</p>
              <span className="method-locations-text">Hyderabad · Warangal · Karimnagar</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Streamlined Consultation Form */}
      <section className="contact-form-section" aria-label="Book Consultation Form">
        <div className="container-narrow">
          <div className="contact-form-card">
            <span className="form-eyebrow">Schedule a Discussion</span>
            <h2 className="form-title">Tell us about your space.</h2>
            <p className="form-subtitle">
              Nothing unnecessary. Just your name, contact, location, and desired service.
            </p>

            {submitted ? (
              <div className="form-success-state">
                <div className="success-icon">&#10003;</div>
                <h3 className="success-title">Thank you. Your request has been received.</h3>
                <p className="success-desc">
                  Benson Cheripelli or our senior designer will call you within 24 hours to discuss your floor plan and timeline.
                </p>
                <div className="success-actions">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary success-wa-btn"
                  >
                    <span>Message on WhatsApp &rarr;</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn btn-secondary"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="minimal-contact-form">
                {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

                <div className="form-field">
                  <label htmlFor="contact-name" className="field-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Sateesh Gavara"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="field-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-phone" className="field-label">
                    Phone Number <span className="req">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="field-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-location" className="field-label">
                    Project Location <span className="req">*</span>
                  </label>
                  <select
                    id="contact-location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="field-select"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Warangal">Warangal</option>
                    <option value="Karimnagar">Karimnagar</option>
                    <option value="Other Telangana">Other Location (Telangana)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-service" className="field-label">
                    Desired Service <span className="req">*</span>
                  </label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="field-select"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="General Consultation">General Consultation / Unsure</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary form-submit-btn"
                >
                  <span>{isSubmitting ? "Submitting..." : "Book a Consultation"}</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions: 10 Consultation Questions */}
      <section className="contact-faq-section" aria-label="Consultation FAQs">
        <div className="container-narrow">
          <div className="section-header-compact text-center">
            <span className="eyebrow">Common Enquiries</span>
            <h2 className="section-title">Consultation &amp; Pricing FAQs</h2>
            <p className="section-subtitle">
              Everything you need to know about our initial consultation, estimates, and turnkey booking process.
            </p>
          </div>

          <div className="faq-accordion-list" role="region" aria-label="FAQ Accordion">
            {CONTACT_FAQS.map((faq, idx) => {
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
                    aria-controls={`contact-faq-answer-${idx}`}
                    id={`contact-faq-btn-${idx}`}
                  >
                    <span className="faq-q-text">{faq.question}</span>
                    <div className={`faq-toggle-icon ${isOpen ? "is-expanded" : ""}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`contact-faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`contact-faq-btn-${idx}`}
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

      <style jsx>{`
        .contact-page-container {
          padding-top: calc(76px + var(--space-48));
          padding-bottom: var(--space-96);
          background-color: var(--background);
        }

        /* FAQ Section */
        .contact-faq-section {
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

        .contact-hero-header {
          padding-bottom: var(--space-48);
          border-bottom: 1px solid var(--border-subtle);
        }

        .contact-header-content {
          max-width: 760px;
        }

        .contact-main-headline {
          font-size: clamp(2.35rem, 4.5vw, 3.75rem);
          font-weight: 650;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-top: 0.5rem;
          margin-bottom: 1rem;
        }

        .contact-main-lead {
          font-size: 1.125rem;
          line-height: 1.65;
          color: var(--foreground-muted);
        }

        /* Direct Channels Grid */
        .contact-methods-section {
          padding-top: var(--space-48);
          padding-bottom: var(--space-48);
        }

        .contact-methods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .contact-method-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .method-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: var(--background);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        :global(.method-icon) {
          color: var(--brand-blue);
        }

        .method-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--foreground-subtle);
          margin-bottom: 0.375rem;
        }

        .method-desc {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--foreground-muted);
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .method-action-link {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 650;
          color: var(--foreground);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .method-action-link:hover {
          color: var(--brand-blue);
        }

        .method-locations-text {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 650;
          color: var(--foreground);
        }

        /* Form */
        .contact-form-section {
          padding-top: var(--space-32);
        }

        .contact-form-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: clamp(2rem, 5vw, 3.5rem);
          box-shadow: 0 4px 24px rgba(24, 24, 24, 0.04);
        }

        .form-eyebrow {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brand-blue);
          display: block;
          margin-bottom: 0.5rem;
        }

        .form-title {
          font-size: clamp(1.75rem, 3.2vw, 2.35rem);
          font-weight: 650;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: var(--foreground-muted);
          margin-bottom: 2rem;
        }

        .minimal-contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-label {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--foreground);
        }

        .req {
          color: #ef4444;
        }

        .field-input,
        .field-select {
          height: 48px;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0 1rem;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--foreground);
          background-color: #ffffff;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .field-input:focus,
        .field-select:focus {
          border-color: var(--brand-blue);
          box-shadow: 0 0 0 3px rgba(41, 171, 226, 0.15);
        }

        :global(.form-submit-btn) {
          height: 48px;
          margin-top: 0.75rem;
          font-size: 0.9375rem;
          border-radius: 12px !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 28px -4px rgba(41, 171, 226, 0.52), 0 4px 10px -2px rgba(41, 171, 226, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
        }

        :global(.form-submit-btn:hover) {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(41, 171, 226, 0.7), 0 6px 16px -2px rgba(41, 171, 226, 0.45) !important;
        }

        :global(.success-wa-btn) {
          border-radius: 12px !important;
          background: linear-gradient(180deg, #2ED87B 0%, #20BA59 100%) !important;
          border: 1px solid #25D366 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 28px -4px rgba(37, 211, 102, 0.5), 0 4px 10px -2px rgba(37, 211, 102, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
        }

        :global(.success-wa-btn:hover) {
          background: linear-gradient(180deg, #38E487 0%, #19A44D 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(37, 211, 102, 0.65), 0 6px 16px -2px rgba(37, 211, 102, 0.4) !important;
        }

        .form-error-banner {
          background-color: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
        }

        /* Success State */
        .form-success-state {
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #059669;
          color: #ffffff;
          font-size: 24px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
        }

        .success-title {
          font-size: 1.35rem;
          font-weight: 650;
          color: var(--foreground);
          margin-bottom: 0.75rem;
        }

        .success-desc {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          max-width: 480px;
          margin: 0 auto 2rem auto;
        }

        .success-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Media Queries */
        @media (max-width: 1024px) {
          .contact-methods-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .contact-methods-grid {
            grid-template-columns: 1fr;
          }

          .success-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
