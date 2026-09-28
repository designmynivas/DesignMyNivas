"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useBookingModal } from "@/context/booking-modal-context";
import { servicesData } from "@/data/services";
import { getWhatsAppUrl } from "@/lib/config/site";

const locations = ["Hyderabad", "Warangal", "Karimnagar", "Other Telangana"];

interface ServiceBookingModalContentProps {
  selectedService: string | null;
  source: string | null;
  closeBookingModal: () => void;
}

function ServiceBookingModalContent({
  selectedService,
  source,
  closeBookingModal,
}: ServiceBookingModalContentProps) {
  const [activeService, setActiveService] = useState<string | null>(selectedService || null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "Hyderabad",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);

  // Focus first input when moving to Step 2
  useEffect(() => {
    if (activeService) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeService]);

  const handleSelectService = (serviceName: string) => {
    setActiveService(serviceName);
  };

  const handleValidate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.location) {
      newErrors.location = "Please select your location";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    setIsSubmitting(true);

    const serviceName = activeService || "Residential Interior Design";

    // Supabase-ready payload structure
    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      location: formData.location,
      service: serviceName,
      source: source || "service-booking-modal",
      created_at: new Date().toISOString(),
    };
    console.log("[Lead Captured]:", payload);

    // Build exact pre-filled WhatsApp message as required by Phase 7 Specification 14
    const message = [
      "Hello Design My Nivas,",
      "",
      "I would like to book a consultation for:",
      "",
      `Service: ${serviceName}`,
      "",
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Location: ${formData.location}`,
      "",
      "Please let me know the next available consultation slot.",
    ].join("\n");

    const waUrl = getWhatsAppUrl(message);
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    closeBookingModal();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (modalBoxRef.current && !modalBoxRef.current.contains(e.target as Node)) {
          closeBookingModal();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalBoxRef}
        className={`modal-box ${!activeService ? "modal-box-wide" : ""}`}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={closeBookingModal}
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1L13 13M1 13L1"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {!activeService ? (
          /* STEP 1: SERVICE SELECTION (If opened without preselection) */
          <div className="modal-step1">
            <div className="modal-header-text">
              <span className="eyebrow modal-eyebrow">Service Selection</span>
              <h2 id="modal-title" className="modal-headline">
                What are you looking to design?
              </h2>
              <p className="modal-sub">
                Choose a service to continue with your direct consultation booking.
              </p>
            </div>

            <div className="services-selection-grid">
              {servicesData.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  className="service-select-card"
                  onClick={() => handleSelectService(svc.name)}
                >
                  <div className="service-card-media">
                    <Image
                      src={svc.image}
                      alt={svc.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, 260px"
                      className="modal-svc-img"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="service-card-copy">
                    <span className="service-select-name">{svc.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* STEP 2: LOW-FRICTION DETAILS (Name, Phone, Location ONLY) */
          <div className="modal-step2">
            <div className="step2-header">
              {!selectedService && (
                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  className="modal-back-btn"
                  aria-label="Back to services selection"
                >
                  &larr; Choose different service
                </button>
              )}
              <span className="eyebrow modal-eyebrow">Direct Consultation</span>
              <h2 id="modal-title" className="modal-headline">
                Book {activeService}
              </h2>
              <p className="modal-sub">
                Enter your details to connect with Benson Cheripelli on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleProceedToWhatsApp} className="modal-form" noValidate>
              <div className="form-field">
                <label htmlFor="modal-name" className="field-label">
                  Your Name
                </label>
                <input
                  ref={firstInputRef}
                  id="modal-name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`field-input ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="modal-phone" className="field-label">
                  Phone Number
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`field-input ${errors.phone ? "input-error" : ""}`}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="modal-location" className="field-label">
                  Location
                </label>
                <select
                  id="modal-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`field-select ${errors.location ? "input-error" : ""}`}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {errors.location && <span className="field-error">{errors.location}</span>}
              </div>

              <div className="modal-form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary modal-whatsapp-submit-btn"
                >
                  <span>Continue to WhatsApp</span>
                  <span className="btn-arrow" aria-hidden="true">&rarr;</span>
                </button>
              </div>

              <p className="modal-privacy">
                We will only use your details to schedule your interior design consultation.
              </p>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 200;
          background-color: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn var(--duration-fast) var(--ease-apple);
        }

        .modal-box {
          background-color: #FFFFFF;
          border-radius: 24px;
          border: 1px solid var(--border);
          box-shadow: 0 24px 64px rgba(24, 24, 24, 0.14);
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 2.5rem 2.25rem;
          animation: scaleUp var(--duration-base) var(--ease-apple);
        }

        .modal-box-wide {
          max-width: 820px;
        }

        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(24, 24, 24, 0.05);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--foreground-muted);
          transition: background-color var(--duration-fast), color var(--duration-fast);
          z-index: 10;
        }

        .modal-close-btn:hover {
          background-color: rgba(24, 24, 24, 0.12);
          color: var(--foreground);
        }

        /* Step 1: Grid — Strictly 4 items per row, 2 rows = 8 services */
        .modal-step1 {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .modal-header-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding-right: 2rem;
        }

        .modal-eyebrow {
          color: var(--brand-blue);
          letter-spacing: 0.12em;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .modal-headline {
          font-size: clamp(1.25rem, 3.5vw, 1.55rem);
          font-weight: 650;
          color: var(--foreground);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .modal-sub {
          font-size: 0.8125rem;
          color: var(--foreground-muted);
          line-height: 1.4;
        }

        .services-selection-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.625rem;
        }

        .service-select-card {
          display: flex;
          flex-direction: column;
          background-color: #FFFFFF;
          border: 1.5px solid rgba(24, 24, 24, 0.08);
          border-radius: 12px;
          overflow: hidden;
          text-align: center;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-select-card:hover {
          border-color: #29ABE2;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(41, 171, 226, 0.18);
        }

        .service-select-card:active {
          transform: scale(0.98);
        }

        .service-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background-color: #F7F5F0;
        }

        :global(.modal-svc-img) {
          object-fit: cover !important;
          transition: transform 0.3s ease;
        }

        .service-select-card:hover :global(.modal-svc-img) {
          transform: scale(1.04);
        }

        .service-card-copy {
          padding: 0.5rem 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 38px;
          background-color: #FFFFFF;
        }

        .service-select-name {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--foreground);
          line-height: 1.25;
          text-align: center;
        }


        /* Step 2 Form */
        .modal-step2 {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step2-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-back-btn {
          align-self: flex-start;
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--foreground-muted);
          cursor: pointer;
          padding: 0;
          margin-bottom: 0.25rem;
          transition: color var(--duration-fast);
        }

        .modal-back-btn:hover {
          color: var(--brand-blue);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .field-label {
          font-family: var(--font-body);
          font-size: var(--text-caption);
          font-weight: 500;
          color: var(--foreground);
          letter-spacing: -0.01em;
        }

        .field-input,
        .field-select {
          width: 100%;
          font-family: var(--font-body);
          font-size: var(--text-body);
          color: var(--foreground);
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.8125rem 1rem;
          transition: border-color var(--duration-fast);
        }

        .field-input:focus,
        .field-select:focus {
          outline: none;
          border-color: var(--brand-blue);
        }

        .input-error {
          border-color: #E53935;
        }

        .field-error {
          font-size: var(--text-caption);
          color: #E53935;
          margin-top: 0.125rem;
        }

        .modal-form-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        :global(.modal-whatsapp-submit-btn) {
          width: 100%;
          height: 48px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #FFFFFF !important;
          background: linear-gradient(180deg, #2ED86E 0%, #20BA5A 100%) !important;
          border: 1px solid #25D366 !important;
          border-radius: 12px !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 10px 28px -4px rgba(37, 211, 102, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.modal-whatsapp-submit-btn:hover) {
          background: linear-gradient(180deg, #37E077 0%, #1AA84E 100%) !important;
          border-color: #20BA5A !important;
          transform: translateY(-2px);
          box-shadow: 0 14px 34px -4px rgba(37, 211, 102, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.55) !important;
        }

        .btn-arrow {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.modal-whatsapp-submit-btn:hover .btn-arrow) {
          transform: translateX(4px);
        }

        .modal-privacy {
          font-size: var(--text-caption);
          color: var(--foreground-subtle);
          text-align: center;
          margin-top: 0.25rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 640px) {
          .modal-box {
            padding: 1.15rem 0.625rem;
            width: calc(100% - 16px);
            max-width: 480px;
            border-radius: 16px;
          }

          .modal-box-wide {
            max-width: 480px;
          }

          .modal-header-text {
            padding-right: 1.75rem;
            gap: 0.15rem;
          }

          .modal-headline {
            font-size: 1.15rem;
          }

          .modal-sub {
            font-size: 0.75rem;
          }

          .services-selection-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 0.35rem !important;
          }

          .service-select-card {
            border-radius: 8px;
            border-width: 1px;
          }

          .service-card-media {
            aspect-ratio: 1 / 1 !important;
            border-radius: 6px 6px 0 0;
          }

          .service-card-copy {
            padding: 0.3rem 0.15rem;
            min-height: 28px;
          }

          .service-select-name {
            font-size: 0.625rem;
            line-height: 1.15;
            letter-spacing: -0.01em;
            word-break: break-word;
          }
        }
      `}</style>
    </div>
  );
}

export default function ServiceBookingModal() {
  const { isOpen, selectedService, source, closeBookingModal } = useBookingModal();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeBookingModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeBookingModal]);

  if (!isOpen) return null;

  return (
    <ServiceBookingModalContent
      key={`${selectedService || "unselected"}`}
      selectedService={selectedService}
      source={source}
      closeBookingModal={closeBookingModal}
    />
  );
}
