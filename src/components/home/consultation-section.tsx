"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/config/site";

const projectTypes = [
  "Full Home",
  "Kitchen",
  "Living Room",
  "Bedroom",
  "Wardrobes",
  "Custom Furniture",
  "Turnkey Interiors",
  "Other",
];

const cities = ["Hyderabad", "Warangal", "Karimnagar", "Other"];

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Hyderabad",
    projectType: "Full Home",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappUrl = getWhatsAppUrl(
    "Hello Design My Nivas, I would like to schedule an interior design consultation for my home."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate phone (10 digits)
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission or connect to Supabase
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitted(true);
    } catch {
      setErrorMsg("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section consultation-section" id="consultation" aria-label="Book a Consultation">
      <div className="container-wide">
        <div className="consultation-box">
          <div className="consultation-grid">
            {/* Left Content */}
            <div className="consultation-info">
              <span className="eyebrow consult-eyebrow">Consultation</span>
              <h2 className="consult-headline">Planning your home interiors?</h2>
              <p className="consult-supporting">
                Tell us what you are building, renovating or changing. We&rsquo;ll help you understand what comes next.
              </p>

              <div className="consult-details">
                <p className="consult-note">
                  Planning a new home, renovation or room upgrade? Share a few details and Benson or our senior designer will contact you directly within 24 hours.
                </p>

                <div className="consult-quick-links">
                  <span className="quick-label">Prefer instant messaging?</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary wa-quick-btn"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.127-.061-.26-.084-.589-.196-1.011-.38-1.782-.777-2.936-2.597-3.025-2.716-.088-.119-.724-.964-.724-1.839 0-.875.459-1.306.623-1.485.163-.178.358-.223.477-.223.12 0 .239.001.343.006.11.006.257-.042.403.308.15.358.508 1.242.553 1.332.045.09.075.195.015.314-.06.12-.09.195-.179.3-.09.105-.188.234-.269.315-.09.09-.184.187-.079.367.105.18.468.773 1.004 1.25.69.614 1.272.805 1.452.895.18.09.285.075.39-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.099.84z" />
                    </svg>
                    <span>WhatsApp Us Directly</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="consultation-form-wrap">
              {submitted ? (
                <div className="consult-success-card">
                  <div className="success-icon" aria-hidden="true">&#10003;</div>
                  <h3 className="success-title">Thank you for reaching out</h3>
                  <p className="success-text">
                    We have received your enquiry. Benson or our design team will contact you shortly to discuss your home.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn btn-secondary success-reset-btn"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="consult-form" noValidate>
                  <div className="form-group">
                    <label htmlFor="consult-name" className="form-label">
                      Your Name
                    </label>
                    <input
                      id="consult-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="consult-phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        id="consult-phone"
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="consult-city" className="form-label">
                        City
                      </label>
                      <select
                        id="consult-city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="form-select"
                      >
                        {cities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="consult-project-type" className="form-label">
                      What are you looking for?
                    </label>
                    <select
                      id="consult-project-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="form-select"
                    >
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="consult-message" className="form-label">
                      Tell us about your home (optional)
                    </label>
                    <textarea
                      id="consult-message"
                      rows={3}
                      placeholder="e.g. 3BHK flat handover next month, looking for kitchen & master bedroom..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  {errorMsg && <p className="form-error">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary form-submit-btn"
                  >
                    {isSubmitting ? "Submitting..." : "Request a Consultation"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .consultation-section {
          background-color: var(--background);
        }

        .consultation-box {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-frame);
          padding: clamp(2.5rem, 5vw, 4.5rem);
          box-shadow: 0 16px 48px rgba(24, 24, 24, 0.04);
        }

        .consultation-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: var(--space-64);
          align-items: start;
        }

        .consultation-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-24);
        }

        .consult-eyebrow {
          letter-spacing: 0.16em;
        }

        .consult-headline {
          font-size: var(--text-display);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--foreground);
        }

        .consult-supporting {
          font-size: var(--text-body-lg);
          line-height: 1.65;
          color: var(--foreground-muted);
        }

        .consult-details {
          margin-top: var(--space-12);
          display: flex;
          flex-direction: column;
          gap: var(--space-24);
        }

        .consult-note {
          font-size: var(--text-body);
          line-height: 1.7;
          color: var(--foreground-muted);
          background-color: var(--background);
          border: 1px solid var(--border);
          padding: var(--space-16);
          border-radius: var(--radius-md);
        }

        .consult-quick-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          align-items: flex-start;
        }

        .quick-label {
          font-size: var(--text-caption);
          font-weight: 500;
          color: var(--foreground-subtle);
        }

        .wa-quick-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--surface);
        }

        .wa-quick-btn svg {
          color: #25D366;
        }

        /* Form */
        .consultation-form-wrap {
          background-color: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: clamp(1.75rem, 4vw, 2.5rem);
        }

        .consult-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-16);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-16);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .form-label {
          font-family: var(--font-body);
          font-size: var(--text-caption);
          font-weight: 500;
          color: var(--foreground);
          letter-spacing: -0.01em;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          font-family: var(--font-body);
          font-size: var(--text-body-sm);
          color: var(--foreground);
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.6875rem 0.875rem;
          transition: border-color var(--duration-fast), outline var(--duration-fast);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--brand-blue);
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-error {
          font-size: var(--text-caption);
          color: #E53935;
          margin: 0;
        }

        .form-submit-btn {
          width: 100%;
          margin-top: var(--space-8);
          padding: 0.875rem;
          font-size: var(--text-body);
          font-weight: 600;
          color: #FFFFFF !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 28px -4px rgba(41, 171, 226, 0.52), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .form-submit-btn:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          border-color: #1FA0D6 !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(41, 171, 226, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6) !important;
        }

        :global(.wa-quick-btn) {
          border-radius: 12px !important;
          border: 1.5px solid #25D366 !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.wa-quick-btn:hover) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -4px rgba(37, 211, 102, 0.3) !important;
        }

        /* Success Card */
        .consult-success-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--space-32) var(--space-16);
          gap: var(--space-16);
        }

        .success-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--brand-blue-subtle);
          color: var(--brand-blue);
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .success-title {
          font-size: var(--text-heading);
          font-weight: 600;
          color: var(--foreground);
        }

        .success-text {
          font-size: var(--text-body);
          color: var(--foreground-muted);
          max-width: 380px;
          line-height: 1.6;
        }

        .success-reset-btn {
          margin-top: var(--space-8);
        }

        @media (max-width: 900px) {
          .consultation-grid {
            grid-template-columns: 1fr;
            gap: var(--space-32);
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
