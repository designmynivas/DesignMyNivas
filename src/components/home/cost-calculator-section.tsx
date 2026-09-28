"use client";

import { useState } from "react";
import {
  Calculator,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Home,
  ChefHat,
  DoorClosed,
  Armchair,
  Building,
  Building2,
  Castle,
  LayoutGrid,
  Award,
  Crown,
  Hammer,
  Paintbrush,
  Layers,
  LucideIcon
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { formatRupees } from "@/data/pricing";
import InteriorLoader from "@/components/ui/interior-loader";

interface OptionItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

const PROJECT_TYPES: OptionItem[] = [
  { id: "full-home", label: "Full Home", icon: Home },
  { id: "modular-kitchen", label: "Modular Kitchen", icon: ChefHat },
  { id: "wardrobes", label: "Wardrobes & Storage", icon: DoorClosed },
  { id: "living-dining", label: "Living & Dining", icon: Armchair },
];

const HOME_SIZES: OptionItem[] = [
  { id: "2bhk", label: "2 BHK", icon: Building },
  { id: "3bhk", label: "3 BHK", icon: Building2 },
  { id: "4bhk", label: "4 BHK", icon: Home },
  { id: "villa", label: "Villa / Penthouse", icon: Castle },
];

const ROOM_OPTIONS: OptionItem[] = [
  { id: "living-kitchen", label: "Living + Kitchen", icon: LayoutGrid },
  { id: "2-rooms", label: "2 Bedrooms", icon: Building },
  { id: "3-rooms", label: "3 Bedrooms", icon: Building2 },
  { id: "full-residence", label: "Full Residence", icon: Home },
];

const FINISH_LEVELS: OptionItem[] = [
  { id: "essential", label: "Essential Elegance", icon: Sparkles },
  { id: "premium", label: "Premium Signature", icon: Award },
  { id: "luxury", label: "Luxury Architectural", icon: Crown },
];

const KITCHEN_OPTIONS: OptionItem[] = [
  { id: "none", label: "Not Required", icon: Layers },
  { id: "lshape", label: "L-Shaped", icon: LayoutGrid },
  { id: "parallel", label: "Parallel Galley", icon: Layers },
  { id: "island", label: "Island / U-Shape", icon: Home },
];

const WARDROBE_OPTIONS: OptionItem[] = [
  { id: "none", label: "Not Required", icon: Layers },
  { id: "2rooms", label: "2 Bedrooms", icon: DoorClosed },
  { id: "3rooms", label: "3 Bedrooms", icon: DoorClosed },
  { id: "full-bespoke", label: "Full Bespoke", icon: Crown },
];

const ADDITIONAL_WORK_OPTIONS: OptionItem[] = [
  { id: "none", label: "Woodwork Only", icon: Hammer },
  { id: "ceiling", label: "False Ceiling & Lights", icon: Sparkles },
  { id: "paint-panel", label: "Wall Panels & Paint", icon: Paintbrush },
  { id: "turnkey", label: "Full Turnkey", icon: Award },
];

export default function CostCalculatorSection() {
  const [projectType, setProjectType] = useState<string>("full-home");
  const [homeSize, setHomeSize] = useState<string>("3bhk");
  const [rooms, setRooms] = useState<string>("full-residence");
  const [finish, setFinish] = useState<string>("premium");
  const [kitchen, setKitchen] = useState<string>("lshape");
  const [wardrobe, setWardrobe] = useState<string>("3rooms");
  const [additional, setAdditional] = useState<string>("turnkey");

  // Price output state: strictly hidden until user clicks "Calculate Estimate →"
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const calculateTotal = () => {
    let baseMin = 520000;
    let baseMax = 820000;

    if (projectType === "modular-kitchen") {
      baseMin = 180000;
      baseMax = 290000;
    } else if (projectType === "wardrobes") {
      baseMin = 170000;
      baseMax = 270000;
    } else if (projectType === "living-dining") {
      baseMin = 210000;
      baseMax = 320000;
    }

    // Size multiplier
    const sizeMulti =
      homeSize === "2bhk" ? 1.0 :
      homeSize === "3bhk" ? 1.45 :
      homeSize === "4bhk" ? 2.05 :
      2.85;

    // Finish multiplier
    const finishMulti =
      finish === "essential" ? 1.0 :
      finish === "premium" ? 1.35 :
      1.75;

    // Kitchen add-on
    let kitchenAdd = 0;
    if (projectType === "full-home") {
      if (kitchen === "lshape") kitchenAdd = 180000;
      else if (kitchen === "parallel") kitchenAdd = 230000;
      else if (kitchen === "island") kitchenAdd = 320000;
    }

    // Wardrobe add-on
    let wardrobeAdd = 0;
    if (projectType === "full-home") {
      if (wardrobe === "2rooms") wardrobeAdd = 190000;
      else if (wardrobe === "3rooms") wardrobeAdd = 280000;
      else if (wardrobe === "full-bespoke") wardrobeAdd = 410000;
    }

    // Additional scope
    let addWork = 0;
    if (additional === "ceiling") addWork = 95000;
    else if (additional === "paint-panel") addWork = 140000;
    else if (additional === "turnkey") addWork = 230000;

    let min = 0;
    let max = 0;

    if (projectType === "full-home") {
      min = Math.round(((baseMin * sizeMulti * 0.65) + kitchenAdd + wardrobeAdd + addWork) * (finishMulti * 0.9) / 10000) * 10000;
      max = Math.round(((baseMax * sizeMulti * 0.72) + (kitchenAdd * 1.22) + (wardrobeAdd * 1.25) + (addWork * 1.25)) * finishMulti / 10000) * 10000;
    } else {
      min = Math.round((baseMin * finishMulti) / 10000) * 10000;
      max = Math.round((baseMax * finishMulti) / 10000) * 10000;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEstimate({ min, max });
    }, 750);
  };

  const getLabel = (list: OptionItem[], id: string) =>
    list.find((item) => item.id === id)?.label || id;

  const handleWhatsAppShare = () => {
    if (!estimate) return;
    const message = [
      "Hello Design My Nivas,",
      "",
      "I calculated an interior estimate on your website:",
      "",
      `• Project Type: ${getLabel(PROJECT_TYPES, projectType)}`,
      `• Home Size: ${getLabel(HOME_SIZES, homeSize)}`,
      `• Rooms / Spaces: ${getLabel(ROOM_OPTIONS, rooms)}`,
      `• Finish Level: ${getLabel(FINISH_LEVELS, finish)}`,
      `• Kitchen: ${getLabel(KITCHEN_OPTIONS, kitchen)}`,
      `• Wardrobes: ${getLabel(WARDROBE_OPTIONS, wardrobe)}`,
      `• Additional Work: ${getLabel(ADDITIONAL_WORK_OPTIONS, additional)}`,
      "",
      `Estimated Budget Range: ${formatRupees(estimate.min)} – ${formatRupees(estimate.max)}`,
      "",
      "Please share the detailed material specifications and schedule a consultation.",
    ].join("\n");

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="cost-calc-section" id="cost-calculator" aria-label="Interior Cost Calculator">
      <div className="container-wide">
        {/* Section Header */}
        <div className="calc-header">
          <div className="calc-badge">
            <Calculator size={14} className="calc-badge-icon" aria-hidden="true" />
            <span>Instant Estimator</span>
          </div>
          <h2 className="calc-title">Interior Cost Calculator</h2>
          <p className="calc-subtitle">
            Configure your space parameters to calculate an indicative estimate based on real Telangana residential interior standards.
          </p>
        </div>

        {/* Solid Calculator Card (Single Solid Surface, No Right-Side Price Preview, No Internal Scroll) */}
        <div className="calc-card">
          {isLoading ? (
            /* LOADING STATE: ARCHITECTURAL INTERIOR ELEMENTS (NO EMOJIS) */
            <InteriorLoader
              title="Calculating Interior Estimate..."
              subtitle="Analyzing space parameters, IS:710 materials & Telangana benchmarks..."
            />
          ) : !estimate ? (
            /* STATE 1: ALL OPTIONS FORM */
            <div className="calc-form-view">
              {/* 1. Project Type */}
              <div className="option-group">
                <label className="option-label">
                  <span className="step-num">01</span> Project Type
                </label>
                <div className="pills-grid cols-4">
                  {PROJECT_TYPES.map((opt) => {
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setProjectType(opt.id)}
                        className={`pill-btn ${projectType === opt.id ? "is-active" : ""}`}
                        aria-pressed={projectType === opt.id}
                      >
                        {IconComp && <IconComp size={15} className="pill-icon" aria-hidden="true" />}
                        <span className="pill-title">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Home Size */}
              <div className="option-group">
                <label className="option-label">
                  <span className="step-num">02</span> Home Size
                </label>
                <div className="pills-grid cols-4">
                  {HOME_SIZES.map((opt) => {
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHomeSize(opt.id)}
                        className={`pill-btn ${homeSize === opt.id ? "is-active" : ""}`}
                        aria-pressed={homeSize === opt.id}
                      >
                        {IconComp && <IconComp size={15} className="pill-icon" aria-hidden="true" />}
                        <span className="pill-title">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Rooms / Spaces */}
              <div className="option-group">
                <label className="option-label">
                  <span className="step-num">03</span> Rooms / Spaces
                </label>
                <div className="pills-grid cols-4">
                  {ROOM_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRooms(opt.id)}
                        className={`pill-btn ${rooms === opt.id ? "is-active" : ""}`}
                        aria-pressed={rooms === opt.id}
                      >
                        {IconComp && <IconComp size={15} className="pill-icon" aria-hidden="true" />}
                        <span className="pill-title">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Finish Level */}
              <div className="option-group">
                <label className="option-label">
                  <span className="step-num">04</span> Finish Level
                </label>
                <div className="pills-grid cols-3">
                  {FINISH_LEVELS.map((opt) => {
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFinish(opt.id)}
                        className={`pill-btn ${finish === opt.id ? "is-active" : ""}`}
                        aria-pressed={finish === opt.id}
                      >
                        {IconComp && <IconComp size={15} className="pill-icon" aria-hidden="true" />}
                        <span className="pill-title">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Kitchen Requirement */}
              <div className="option-group">
                <label className="option-label">
                  <span className="step-num">05</span> Kitchen Requirement
                </label>
                <div className="pills-grid cols-4">
                  {KITCHEN_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setKitchen(opt.id)}
                        className={`pill-btn ${kitchen === opt.id ? "is-active" : ""}`}
                        aria-pressed={kitchen === opt.id}
                      >
                        {IconComp && <IconComp size={15} className="pill-icon" aria-hidden="true" />}
                        <span className="pill-title">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Wardrobe Requirement */}
              <div className="option-group">
                <label className="option-label">
                  <span className="step-num">06</span> Wardrobe Requirement
                </label>
                <div className="pills-grid cols-4">
                  {WARDROBE_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setWardrobe(opt.id)}
                        className={`pill-btn ${wardrobe === opt.id ? "is-active" : ""}`}
                        aria-pressed={wardrobe === opt.id}
                      >
                        {IconComp && <IconComp size={15} className="pill-icon" aria-hidden="true" />}
                        <span className="pill-title">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. Additional Work */}
              <div className="option-group">
                <label className="option-label">
                  <span className="step-num">07</span> Additional Scope
                </label>
                <div className="pills-grid cols-4">
                  {ADDITIONAL_WORK_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAdditional(opt.id)}
                        className={`pill-btn ${additional === opt.id ? "is-active" : ""}`}
                        aria-pressed={additional === opt.id}
                      >
                        {IconComp && <IconComp size={15} className="pill-icon" aria-hidden="true" />}
                        <span className="pill-title">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Action Bar: Submit All to Calculate */}
              <div className="calc-action-bar">
                <button
                  type="button"
                  onClick={calculateTotal}
                  className="calc-submit-btn"
                  aria-label="Calculate interior estimate"
                >
                  <span>Calculate Estimate</span>
                  <ArrowRight size={17} className="btn-arrow" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            /* STATE 2: REVEALED PRICE DISPLAY & WHATSAPP ACTION */
            <div className="calc-result-view">
              <div className="revealed-header">
                <span className="revealed-tag">
                  <Sparkles size={14} className="revealed-tag-icon" aria-hidden="true" />
                  <span>Indicative Estimate</span>
                </span>
                <span className="benchmark-note">Telangana Residential Benchmark</span>
              </div>

              <div className="price-display-box">
                <div className="price-label">Estimated Budget Range</div>
                <div className="price-value">
                  {formatRupees(estimate.min)} &ndash; {formatRupees(estimate.max)}
                </div>
                <p className="price-note">
                  Covers premium IS:710 Marine Grade BWP Plywood woodwork, branded Blum/Hettich soft-close hardware, and planned architectural finishes.
                </p>
              </div>

              {/* Selected Parameters Review Summary */}
              <div className="selection-review">
                <h3 className="review-title">Your Selected Configuration:</h3>
                <div className="review-chips">
                  <div className="review-chip">
                    <span className="chip-label">Project:</span>
                    <span className="chip-value">{getLabel(PROJECT_TYPES, projectType)}</span>
                  </div>
                  <div className="review-chip">
                    <span className="chip-label">Home Size:</span>
                    <span className="chip-value">{getLabel(HOME_SIZES, homeSize)}</span>
                  </div>
                  <div className="review-chip">
                    <span className="chip-label">Rooms:</span>
                    <span className="chip-value">{getLabel(ROOM_OPTIONS, rooms)}</span>
                  </div>
                  <div className="review-chip">
                    <span className="chip-label">Finish:</span>
                    <span className="chip-value">{getLabel(FINISH_LEVELS, finish)}</span>
                  </div>
                  {kitchen !== "none" && (
                    <div className="review-chip">
                      <span className="chip-label">Kitchen:</span>
                      <span className="chip-value">{getLabel(KITCHEN_OPTIONS, kitchen)}</span>
                    </div>
                  )}
                  {wardrobe !== "none" && (
                    <div className="review-chip">
                      <span className="chip-label">Wardrobes:</span>
                      <span className="chip-value">{getLabel(WARDROBE_OPTIONS, wardrobe)}</span>
                    </div>
                  )}
                  {additional !== "none" && (
                    <div className="review-chip">
                      <span className="chip-label">Additional:</span>
                      <span className="chip-value">{getLabel(ADDITIONAL_WORK_OPTIONS, additional)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="disclaimer-strip">
                <ShieldCheck size={16} className="shield-icon" aria-hidden="true" />
                <span>
                  Indicative estimate only. Final pricing is confirmed after on-site measurement and exact material selection.
                </span>
              </div>

              {/* Action Buttons: 1st WhatsApp, 2nd Calculate Again */}
              <div className="result-actions-row">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="whatsapp-estimate-btn"
                  aria-label="Send estimate on WhatsApp"
                >
                  <span>Send Estimate on WhatsApp</span>
                  <ArrowRight size={17} className="btn-arrow" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEstimate(null);
                    setIsLoading(false);
                  }}
                  className="calc-recalculate-btn"
                  aria-label="Calculate again"
                >
                  <RefreshCw size={14} aria-hidden="true" />
                  <span>Calculate Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cost-calc-section {
          background-color: var(--background);
          padding: clamp(3.5rem, 6vw, 5.5rem) 0;
          border: none;
        }

        .calc-header {
          text-align: center;
          max-width: 660px;
          margin: 0 auto clamp(2rem, 3.5vw, 2.75rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
        }

        .calc-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.85rem;
          background: rgba(41, 171, 226, 0.08);
          border: 1px solid rgba(41, 171, 226, 0.25);
          border-radius: 9999px;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          color: #29ABE2;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .calc-badge-icon {
          color: #29ABE2;
        }

        .calc-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.75vw, 2.75rem);
          font-weight: 650;
          color: var(--foreground);
          letter-spacing: -0.025em;
          line-height: 1.15;
        }

        .calc-subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
          color: var(--foreground-muted);
          line-height: 1.6;
        }

        /* Solid Calculator Card: Single, non-split, non-scrollable surface */
        .calc-card {
          max-width: 980px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 16px 48px rgba(24, 24, 24, 0.06);
          padding: clamp(1.75rem, 3vw, 2.75rem);
          overflow: visible;
        }

        .calc-form-view {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .option-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .option-label {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: rgba(41, 171, 226, 0.12);
          color: #29ABE2;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0;
        }

        .pills-grid {
          display: grid;
          gap: 0.5rem;
        }

        .cols-4 {
          grid-template-columns: repeat(4, 1fr);
        }

        .cols-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        .pill-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 44px;
          padding: 0 0.85rem;
          background: #FAF9F6;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          font-family: var(--font-body);
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pill-btn:hover {
          border-color: #29ABE2;
          background: #FFFFFF;
          transform: translateY(-1px);
        }

        .pill-btn.is-active {
          background: #29ABE2;
          border-color: #29ABE2;
          box-shadow: 0 4px 14px -2px rgba(41, 171, 226, 0.4);
        }

        :global(.pill-icon) {
          color: #29ABE2;
          flex-shrink: 0;
          transition: color 0.18s ease;
        }

        .pill-btn.is-active :global(.pill-icon) {
          color: #FFFFFF;
        }

        .pill-title {
          font-size: 0.84375rem;
          font-weight: 600;
          color: var(--foreground);
          line-height: 1.25;
          white-space: nowrap;
        }

        .pill-btn.is-active .pill-title {
          color: #FFFFFF;
        }

        .calc-action-bar {
          margin-top: 0.75rem;
          display: flex;
          justify-content: center;
        }

        /* Vibrant Blue Glow Primary CTA (12px rounded rectangle) */
        .calc-submit-btn {
          width: 100%;
          max-width: 420px;
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
          box-shadow: 0 10px 28px -4px rgba(41, 171, 226, 0.52), 0 4px 10px -2px rgba(41, 171, 226, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .calc-submit-btn:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%);
          border-color: #1FA0D6;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(41, 171, 226, 0.7), 0 6px 16px -2px rgba(41, 171, 226, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6) !important;
        }

        .calc-submit-btn:active {
          transform: scale(0.98);
          box-shadow: 0 6px 18px -2px rgba(41, 171, 226, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3) !important;
        }

        .btn-arrow {
          transition: transform 0.2s ease;
        }

        .calc-submit-btn:hover .btn-arrow,
        .whatsapp-estimate-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* STATE 2: REVEALED RESULT VIEW */
        .calc-result-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          animation: estFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .revealed-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border);
        }

        .revealed-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 650;
          color: #29ABE2;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .benchmark-note {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--foreground-muted);
        }

        .price-display-box {
          background: #FFFFFF;
          border: 1.5px solid rgba(41, 171, 226, 0.28);
          border-radius: 16px;
          padding: 1.75rem;
          text-align: center;
          box-shadow: 0 8px 30px rgba(41, 171, 226, 0.08);
        }

        .price-label {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--foreground-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.35rem;
        }

        .price-value {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 700;
          color: #181818;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .price-note {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          color: var(--foreground-muted);
          margin-top: 0.6rem;
          line-height: 1.5;
        }

        .selection-review {
          background: #FAF9F6;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.25rem;
        }

        .review-title {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 650;
          color: var(--foreground);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .review-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .review-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #FFFFFF;
          border: 1px solid var(--border);
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 0.8125rem;
        }

        .chip-label {
          color: var(--foreground-muted);
        }

        .chip-value {
          font-weight: 600;
          color: var(--foreground);
        }

        .disclaimer-strip {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--foreground-muted);
          line-height: 1.5;
          padding: 0 0.25rem;
        }

        .shield-icon {
          color: #29ABE2;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .result-actions-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Vibrant WhatsApp CTA (12px radius) */
        .whatsapp-estimate-btn {
          flex: 1 1 280px;
          height: 48px;
          background: linear-gradient(180deg, #2ED86E 0%, #20BA5A 100%);
          color: #FFFFFF;
          border: 1px solid #25D366;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          box-shadow: 0 10px 28px -4px rgba(37, 211, 102, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .whatsapp-estimate-btn:hover {
          background: linear-gradient(180deg, #37E077 0%, #1AA84E 100%);
          border-color: #20BA5A;
          transform: translateY(-2px);
          box-shadow: 0 14px 34px -4px rgba(37, 211, 102, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.55);
        }

        .calc-recalculate-btn {
          height: 48px;
          padding: 0 1.75rem;
          background: #FFFFFF;
          color: var(--foreground);
          border: 1.5px solid #D8D5CF;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .calc-recalculate-btn:hover {
          border-color: #29ABE2;
          color: #29ABE2;
          background-color: rgba(41, 171, 226, 0.04);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.18);
        }

        @keyframes estFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 860px) {
          .cols-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          .cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
          .result-actions-row {
            flex-direction: column;
          }
          .whatsapp-estimate-btn,
          .calc-recalculate-btn {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .cols-4,
          .cols-3 {
            grid-template-columns: repeat(2, 1fr);
          }

          .pill-btn {
            height: 42px;
            padding: 0 0.5rem;
            gap: 0.35rem;
          }

          .pill-title {
            font-size: 0.78125rem;
          }
        }
      `}</style>
    </section>
  );
}
