"use client";

import React, { useState, useRef, useMemo } from "react";
import { useCostEstimator } from "@/context/cost-estimator-context";
import { servicesData } from "@/data/services";
import { pricingConfig } from "@/data/pricing";
import { calculateEstimate, EstimateResult } from "@/lib/calculator/estimate-engine";
import { getWhatsAppUrl } from "@/lib/config/site";
import { ArrowRight, RefreshCw, Sparkles, ShieldCheck, Calculator, X, ChevronDown } from "lucide-react";
import InteriorLoader from "@/components/ui/interior-loader";

interface CostEstimatorContentProps {
  initialServiceSlug: string | null;
  onClose: () => void;
}

function getDefaultSelections(slug: string | null): Record<string, string> {
  const targetSlug = slug && pricingConfig[slug] ? slug : "complete-home-interiors";
  const model = pricingConfig[targetSlug];
  if (!model) return {};
  const defaults: Record<string, string> = {};
  model.steps.forEach((s) => {
    if (s.options.length > 0) {
      defaults[s.id] = s.options[0].id;
    }
  });
  return defaults;
}

function CostEstimatorContent({ initialServiceSlug, onClose }: CostEstimatorContentProps) {
  // Normalize initial service slug/name
  const resolvedInitialSlug = useMemo(() => {
    if (!initialServiceSlug) return "complete-home-interiors";
    const match = servicesData.find(
      (s) => s.slug === initialServiceSlug || s.name.toLowerCase() === initialServiceSlug.toLowerCase()
    );
    return match ? match.slug : initialServiceSlug;
  }, [initialServiceSlug]);

  const [activeSlug, setActiveSlug] = useState<string>(
    pricingConfig[resolvedInitialSlug] ? resolvedInitialSlug : "complete-home-interiors"
  );

  // User input selections for the active pricing model
  const [selections, setSelections] = useState<Record<string, string>>(() =>
    getDefaultSelections(resolvedInitialSlug)
  );

  // Loading state with interior elements SVG animation
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Calculated estimate result state
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const activeModel = pricingConfig[activeSlug] || pricingConfig["complete-home-interiors"];

  // Compute estimate dynamically
  const estimateResult: EstimateResult = useMemo(() => {
    return calculateEstimate(activeSlug, selections);
  }, [activeSlug, selections]);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSelectService = (slug: string) => {
    setActiveSlug(slug);
    setSelections(getDefaultSelections(slug));
    setIsCalculated(false);
    setIsLoading(false);
  };

  const handleOptionChange = (stepId: string, optionId: string) => {
    setSelections((prev) => ({
      ...prev,
      [stepId]: optionId,
    }));
  };

  const handleCalculate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCalculated(true);
    }, 750);
  };

  const handleSendWhatsApp = () => {
    const detailsList = estimateResult.inputsSummary
      .map((item) => `• ${item.label}: ${item.value}`)
      .join("\n");

    const message = [
      "Hello Design My Nivas,",
      "",
      `I calculated an estimate for ${estimateResult.serviceName} on your website:`,
      "",
      `Estimated Project Cost: ${estimateResult.formattedRange}`,
      "",
      "Selected Specifications:",
      detailsList || "Standard configuration",
      "",
      "Please assist me with detailed material specifications and next steps.",
    ].join("\n");

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="estimator-backdrop"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="estimator-title"
    >
      <div ref={modalRef} className="estimator-card">
        {/* Pixel-Perfect Lucide Close Button */}
        <button
          type="button"
          className="estimator-close-btn"
          onClick={onClose}
          aria-label="Close estimator"
        >
          <X size={16} aria-hidden="true" />
        </button>

        {isLoading ? (
          /* LOADING STATE: ARCHITECTURAL INTERIOR ELEMENTS (NO EMOJIS) */
          <InteriorLoader
            title="Calculating Project Estimate..."
            subtitle={`Configuring ${activeModel.serviceName} specifications...`}
          />
        ) : !isCalculated ? (
          /* STATE 1: SOLID OPTIONS CARD (NO PREMATURE PRICE, FULLY RESPONSIVE, NO HORIZONTAL OVERFLOW) */
          <div className="card-inner-view">
            <div className="estimator-header">
              <div className="header-eyebrow-row">
                <span className="eyebrow-tag">
                  <Calculator size={13} aria-hidden="true" />
                  <span>Cost Estimator</span>
                </span>
              </div>

              <h2 id="estimator-title" className="estimator-title">
                {activeModel.serviceName}
              </h2>
              <p className="estimator-sub">
                Configure your room details and finish preferences to calculate a verified estimate.
              </p>

              {/* Accessible, Prominent Service Selector (Not cramped in top-right) */}
              <div className="service-switcher-bar">
                <label htmlFor="modal-service-select" className="switcher-label">
                  Service Category:
                </label>
                <div className="switcher-select-wrap">
                  <select
                    id="modal-service-select"
                    value={activeSlug}
                    onChange={(e) => handleSelectService(e.target.value)}
                    className="service-switcher-select"
                    aria-label="Select interior service"
                  >
                    {servicesData.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="select-chevron" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Options Flow: Clean compact options without verbose descriptions */}
            <div className="options-flow">
              {activeModel.steps.map((s) => (
                <div key={s.id} className="option-group">
                  <div className="group-heading">
                    <h3 className="group-title">{s.title}</h3>
                    {s.subtitle && <span className="group-sub">{s.subtitle}</span>}
                  </div>

                  <div className="option-cards-grid">
                    {s.options.map((opt) => {
                      const isSelected = selections[s.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleOptionChange(s.id, opt.id)}
                          className={`option-card ${isSelected ? "option-selected" : ""}`}
                          aria-pressed={isSelected}
                        >
                          <div className="radio-dot-indicator">
                            <span className={`inner-dot ${isSelected ? "active-dot" : ""}`} />
                          </div>
                          <div className="option-text">
                            <span className="option-label">{opt.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Action Bar: Submit All (No Price Preview) */}
            <div className="modal-bottom-bar">
              <button
                type="button"
                onClick={handleCalculate}
                className="modal-calc-submit-btn"
                aria-label="Calculate project estimate"
              >
                <span>Calculate Estimate</span>
                <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          /* STATE 2: CALCULATED PRICE RESULT & WHATSAPP ACTION */
          <div className="card-inner-view result-view">
            <div className="estimator-header">
              <div className="result-header-row">
                <span className="eyebrow-tag">
                  <Sparkles size={12} aria-hidden="true" />
                  <span>Estimated Project Cost</span>
                </span>
                <span className="benchmark-badge">Telangana Standards</span>
              </div>
              <h2 id="estimator-title" className="estimator-title">
                {activeModel.serviceName}
              </h2>
            </div>

            {/* Price Box */}
            <div className="result-price-box">
              <div className="price-label">Estimated Indicative Cost</div>
              <div className="price-amount">{estimateResult.formattedRange}</div>
              <p className="price-sub">
                Includes IS:710 Marine Grade BWP Plywood carcass, Blum/Hettich soft-close hardware &amp; turnkey execution.
              </p>
            </div>

            {/* Selected Breakdown Summary */}
            <div className="summary-specs-card">
              <div className="specs-title">Selected Specifications:</div>
              <div className="summary-chips-wrap">
                {estimateResult.inputsSummary.map((item, idx) => (
                  <div key={idx} className="spec-chip">
                    <span className="chip-key">{item.label}:</span>
                    <span className="chip-val">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="disclaimer-strip">
              <ShieldCheck size={16} className="shield-icon" aria-hidden="true" />
              <span>
                Indicative estimate only. Final pricing is confirmed after on-site measurement and exact material selection.
              </span>
            </div>

            {/* Two CTA Buttons: 1st WhatsApp (Primary Glow), 2nd Calculate Again (Stroke) */}
            <div className="modal-result-actions">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="modal-whatsapp-btn"
                aria-label="Send estimate on WhatsApp"
              >
                <span>Send Estimate on WhatsApp</span>
                <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCalculated(false);
                  setIsLoading(false);
                }}
                className="modal-recalc-btn"
                aria-label="Calculate again"
              >
                <RefreshCw size={14} aria-hidden="true" />
                <span>Calculate Again</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .estimator-backdrop {
          position: fixed;
          inset: 0;
          z-index: 210;
          background-color: rgba(0, 0, 0, 0.52);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: estFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Solid, Non-scrollable Card with Zero Overflow */
        .estimator-card {
          background-color: #FFFFFF;
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: 0 24px 64px rgba(24, 24, 24, 0.18);
          width: 100%;
          max-width: 720px;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
          padding: clamp(1.35rem, 2.5vw, 1.85rem) clamp(1.25rem, 2.75vw, 2rem);
          animation: estScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .estimator-close-btn {
          position: absolute;
          top: 1.15rem;
          right: 1.15rem;
          background: rgba(24, 24, 24, 0.06);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--foreground-muted);
          transition: background-color 0.15s ease, color 0.15s ease;
          z-index: 10;
        }

        .estimator-close-btn:hover {
          background-color: rgba(24, 24, 24, 0.14);
          color: var(--foreground);
        }

        .card-inner-view {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          width: 100%;
          box-sizing: border-box;
        }

        .estimator-header {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding-right: 2.25rem;
        }

        .header-eyebrow-row,
        .result-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .eyebrow-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 650;
          color: #29ABE2;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .service-switcher-bar {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: 0.5rem;
          background: #FAF9F6;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 0.5rem 0.85rem;
          width: 100%;
          box-sizing: border-box;
        }

        .switcher-label {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 650;
          color: var(--foreground);
          white-space: nowrap;
        }

        .switcher-select-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex-grow: 1;
        }

        .service-switcher-select {
          width: 100%;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.4rem 2rem 0.4rem 0.65rem;
          background: #ffffff;
          border: 1px solid rgba(41, 171, 226, 0.35);
          border-radius: 8px;
          color: #29ABE2;
          cursor: pointer;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .service-switcher-select:focus {
          border-color: #29ABE2;
          box-shadow: 0 0 0 2px rgba(41, 171, 226, 0.2);
        }

        :global(.select-chevron) {
          position: absolute;
          right: 0.65rem;
          color: #29ABE2;
          pointer-events: none;
        }

        .benchmark-badge {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--foreground-muted);
        }

        .estimator-title {
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 2.5vw, 1.65rem);
          font-weight: 650;
          letter-spacing: -0.02em;
          color: var(--foreground);
          line-height: 1.2;
        }

        .estimator-sub {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          color: var(--foreground-muted);
          line-height: 1.45;
        }

        /* Options Flow: 2-Column Responsive Grid with min-width 0 */
        .options-flow {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          width: 100%;
          box-sizing: border-box;
        }

        .option-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          width: 100%;
          box-sizing: border-box;
        }

        .group-heading {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .group-title {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--foreground);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .group-sub {
          font-size: 0.6875rem;
          color: var(--foreground-muted);
        }

        .option-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .option-card {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          padding: 0.55rem 0.75rem;
          background: #FAF9F6;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-body);
          transition: all 0.15s ease;
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }

        .option-card:hover {
          border-color: #29ABE2;
          background: #FFFFFF;
        }

        .option-selected {
          border-color: #29ABE2 !important;
          background: #FFFFFF !important;
          box-shadow: 0 0 0 1px #29ABE2;
        }

        .radio-dot-indicator {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 1.5px solid #C5C2BC;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background-color: #FFFFFF;
          margin-top: 2px;
        }

        .option-selected .radio-dot-indicator {
          border-color: #29ABE2;
        }

        .inner-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: transparent;
        }

        .active-dot {
          background-color: #29ABE2;
        }

        .option-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
        }

        .option-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--foreground);
          line-height: 1.3;
          word-break: break-word;
          white-space: normal;
        }

        .option-desc {
          font-size: 0.6875rem;
          color: var(--foreground-muted);
          line-height: 1.3;
          word-break: break-word;
          white-space: normal;
        }

        .modal-bottom-bar {
          margin-top: 0.35rem;
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }

        /* Vibrant Blue Glow Primary CTA (12px rounded rectangle) */
        .modal-calc-submit-btn {
          width: 100%;
          height: 48px;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%);
          color: #FFFFFF;
          border: 1px solid #29ABE2;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.52), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-calc-submit-btn:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%);
          border-color: #1FA0D6;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -4px rgba(41, 171, 226, 0.68), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6);
        }

        .btn-arrow {
          transition: transform 0.2s ease;
        }

        .modal-calc-submit-btn:hover .btn-arrow,
        .modal-whatsapp-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* STATE 2: RESULT VIEW */
        .result-view {
          animation: estFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .result-price-box {
          background: #FFFFFF;
          border: 1.5px solid rgba(41, 171, 226, 0.28);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          text-align: center;
          box-shadow: 0 6px 24px rgba(41, 171, 226, 0.08);
        }

        .price-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--foreground-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .price-amount {
          font-family: var(--font-display);
          font-size: clamp(1.85rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #181818;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .price-sub {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--foreground-muted);
          margin-top: 0.4rem;
          line-height: 1.4;
        }

        .summary-specs-card {
          background: #FAF9F6;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.85rem 1rem;
        }

        .specs-title {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 650;
          color: var(--foreground);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.5rem;
        }

        .summary-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .spec-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #FFFFFF;
          border: 1px solid var(--border);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-family: var(--font-body);
          font-size: 0.75rem;
        }

        .chip-key {
          color: var(--foreground-muted);
        }

        .chip-val {
          font-weight: 600;
          color: var(--foreground);
        }

        .disclaimer-strip {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          color: var(--foreground-muted);
          line-height: 1.4;
        }

        .shield-icon {
          color: #29ABE2;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .modal-result-actions {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          margin-top: 0.5rem;
        }

        /* 1st Primary CTA: Send on WhatsApp (Blue brand glow to match site) */
        .modal-whatsapp-btn {
          width: 100%;
          height: 50px;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%);
          color: #FFFFFF;
          border: 1px solid #29ABE2;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 650;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.5), 0 3px 8px -2px rgba(41, 171, 226, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-whatsapp-btn:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%);
          border-color: #1FA0D6;
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -4px rgba(41, 171, 226, 0.65), 0 5px 12px -2px rgba(41, 171, 226, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6);
        }

        /* 2nd Secondary Button: Calculate Again (Stroke, 12px radius) */
        .modal-recalc-btn {
          width: 100%;
          height: 46px;
          padding: 0 1.35rem;
          background: #FFFFFF;
          color: var(--foreground);
          border: 1.5px solid #D8D5CF;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .modal-recalc-btn:hover {
          border-color: #181818;
          color: #181818;
          background-color: #F7F5F0;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px -2px rgba(24, 24, 24, 0.08);
        }

        @keyframes estFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes estScaleUp {
          from {
            opacity: 0;
            transform: scale(0.97) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 640px) {
          .estimator-card {
            padding: 1.25rem 1rem;
            max-width: 100%;
          }
          .option-cards-grid {
            grid-template-columns: 1fr;
          }
          .modal-whatsapp-btn {
            height: 48px;
            font-size: 0.875rem;
          }
          .modal-recalc-btn {
            height: 44px;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  );
}

export default function CostEstimatorModal() {
  const { isOpen, selectedService, closeCostEstimator } = useCostEstimator();

  if (!isOpen) return null;

  return (
    <CostEstimatorContent
      initialServiceSlug={selectedService}
      onClose={closeCostEstimator}
    />
  );
}
