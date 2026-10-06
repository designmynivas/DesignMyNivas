"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { formatRupees } from "@/data/pricing";
import { useBookingModal } from "@/context/booking-modal-context";

interface Option {
  id: string;
  label: string;
}

const HOME_TYPES: Option[] = [
  { id: "2bhk", label: "2 BHK" },
  { id: "3bhk", label: "3 BHK" },
  { id: "4bhk", label: "4 BHK" },
  { id: "villa", label: "Villa" },
];

const SCOPES: Option[] = [
  { id: "full-home", label: "Complete Home" },
  { id: "modular-kitchen", label: "Kitchen" },
  { id: "wardrobes", label: "Wardrobes" },
  { id: "living-dining", label: "Living Room" },
  { id: "other", label: "Something else" },
];

const SIZE_MULTIPLIER: Record<string, number> = { "2bhk": 1.0, "3bhk": 1.45, "4bhk": 2.05, villa: 2.85 };
const WARDROBE_ADD: Record<string, number> = { "2bhk": 190000, "3bhk": 280000, "4bhk": 410000, villa: 410000 };
const BASE: Record<string, [number, number]> = {
  "full-home": [520000, 820000],
  "modular-kitchen": [180000, 290000],
  wardrobes: [170000, 270000],
  "living-dining": [210000, 320000],
};

// Finish level, kitchen layout and extra work are no longer asked; the
// estimate uses the defaults the full calculator used to start with
// (premium finish, L-shaped kitchen, full turnkey scope).
const FINISH = 1.35;
const KITCHEN_ADD = 180000;
const TURNKEY_ADD = 230000;
const round = (n: number) => Math.round(n / 10000) * 10000;

function estimate(home: string, scope: string): { min: number; max: number } | null {
  const base = BASE[scope];
  if (!base) return null;
  const [baseMin, baseMax] = base;

  if (scope !== "full-home") {
    return { min: round(baseMin * FINISH), max: round(baseMax * FINISH) };
  }

  const size = SIZE_MULTIPLIER[home];
  const wardrobe = WARDROBE_ADD[home];
  return {
    min: round((baseMin * size * 0.65 + KITCHEN_ADD + wardrobe + TURNKEY_ADD) * FINISH * 0.9),
    max: round((baseMax * size * 0.72 + KITCHEN_ADD * 1.22 + wardrobe * 1.25 + TURNKEY_ADD * 1.25) * FINISH),
  };
}

const labelOf = (list: Option[], id: string) => list.find((o) => o.id === id)?.label ?? id;

export default function CostCalculatorSection() {
  const { openBookingModal } = useBookingModal();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [home, setHome] = useState("");
  const [scope, setScope] = useState("");

  const result = step === 3 ? estimate(home, scope) : null;
  const range = result ? `${formatRupees(result.min)} – ${formatRupees(result.max)}` : null;

  const whatsappUrl = getWhatsAppUrl(
    [
      "Hello Design My Nivas,",
      "",
      "I used the cost calculator on your website.",
      `• Home: ${labelOf(HOME_TYPES, home)}`,
      `• Scope: ${labelOf(SCOPES, scope)}`,
      range ? `• Estimated range: ${range}` : "",
      "",
      "Please share an exact estimate for my home.",
    ]
      .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
      .join("\n")
  );

  const reset = () => {
    setStep(1);
    setHome("");
    setScope("");
  };

  return (
    <section className="block calc-block" id="cost-calculator" aria-labelledby="calc-title">
      <div className="container-wide">
        <div className="calc-layout">
          <div className="block-head reveal">
            <h2 id="calc-title" className="block-title">
              Interior Cost <span className="hl">Calculator</span>
            </h2>
            <p className="block-sub">Two quick questions. An instant estimate.</p>
          </div>

          <div className="calc-card reveal" aria-live="polite">
            <div className="calc-progress" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} className={n <= step ? "is-done" : ""} />
              ))}
            </div>

            {step === 1 && (
              <fieldset className="calc-step">
                <legend className="calc-q">
                  <span className="calc-step-num">Step 1 of 2</span>
                  What are you designing?
                </legend>
                <div className="calc-options cols-4">
                  {HOME_TYPES.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`calc-opt ${home === o.id ? "is-active" : ""}`}
                      aria-pressed={home === o.id}
                      onClick={() => {
                        setHome(o.id);
                        setStep(2);
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="calc-step">
                <legend className="calc-q">
                  <span className="calc-step-num">Step 2 of 2 · {labelOf(HOME_TYPES, home)}</span>
                  What do you need?
                </legend>
                <div className="calc-options cols-5">
                  {SCOPES.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`calc-opt ${scope === o.id ? "is-active" : ""}`}
                      aria-pressed={scope === o.id}
                      onClick={() => {
                        setScope(o.id);
                        setStep(3);
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                <button type="button" className="calc-back" onClick={() => setStep(1)}>
                  <ArrowLeft size={14} aria-hidden="true" /> Back
                </button>
              </fieldset>
            )}

            {step === 3 && (
              <div className="calc-step calc-result">
                <span className="calc-step-num">
                  {labelOf(HOME_TYPES, home)} · {labelOf(SCOPES, scope)}
                </span>
                {range ? (
                  <>
                    <p className="calc-range-label">Estimated project range</p>
                    <p className="calc-range">{range}</p>
                  </>
                ) : (
                  <p className="calc-range calc-range-text">Let&rsquo;s talk through your scope.</p>
                )}
                <p className="calc-note">Indicative only. Your exact estimate is itemised after a site visit.</p>

                <div className="calc-actions">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="calc-wa">
                    Get Exact Estimate on WhatsApp <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    className="calc-secondary"
                    onClick={() => openBookingModal({ source: "calculator-result" })}
                  >
                    Book a Consultation
                  </button>
                </div>

                <button type="button" className="calc-back" onClick={reset}>
                  <RotateCcw size={14} aria-hidden="true" /> Start over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .calc-layout {
          max-width: 820px;
          margin: 0 auto;
        }

        .calc-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: clamp(1.25rem, 3vw, 2rem);
          box-shadow: 0 12px 40px rgba(24, 24, 24, 0.05);
          min-height: 260px;
        }

        .calc-progress {
          display: flex;
          gap: 0.375rem;
          margin-bottom: 1.5rem;
        }

        .calc-progress span {
          flex: 1;
          height: 3px;
          border-radius: 3px;
          background: var(--border);
          transition: background 0.3s var(--ease-out);
        }

        .calc-progress span.is-done {
          background: var(--brand-blue);
        }

        .calc-step {
          border: none;
          margin: 0;
          padding: 0;
          min-width: 0;
          text-align: center;
          animation: stepIn 0.35s var(--ease-out);
        }

        .calc-q {
          width: 100%;
          padding: 0;
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2.2vw, 1.5rem);
          font-weight: 650;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin-bottom: 1.25rem;
        }

        .calc-step-num {
          display: block;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--foreground-subtle);
          margin-bottom: 0.4rem;
        }

        .calc-options {
          display: grid;
          gap: 0.625rem;
        }

        .cols-4 {
          grid-template-columns: repeat(4, 1fr);
        }

        .cols-5 {
          grid-template-columns: repeat(5, 1fr);
        }

        .calc-opt {
          min-height: 56px;
          padding: 0.75rem 0.5rem;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          background: #ffffff;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--foreground);
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s;
        }

        .calc-opt:hover {
          border-color: var(--brand-blue);
          color: var(--brand-blue);
          transform: translateY(-1px);
        }

        .calc-opt.is-active {
          border-color: var(--brand-blue);
          background: var(--brand-blue-subtle);
          color: var(--brand-blue);
        }

        .calc-back {
          margin-top: 1.25rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          padding: 0.25rem 0;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground-muted);
          cursor: pointer;
        }

        .calc-back:hover {
          color: var(--brand-blue);
        }

        .calc-range-label {
          font-size: 0.875rem;
          color: var(--foreground-muted);
        }

        .calc-range {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3.6vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--foreground);
          margin: 0.25rem 0 0.5rem;
        }

        .calc-range-text {
          font-size: clamp(1.4rem, 2.6vw, 1.875rem);
        }

        .calc-note {
          font-size: 0.8125rem;
          color: var(--foreground-subtle);
        }

        .calc-actions {
          justify-content: center;
          display: flex;
          flex-wrap: wrap;
          gap: 0.625rem;
          margin-top: 1.5rem;
        }

        .calc-wa,
        .calc-secondary {
          height: 50px;
          padding: 0 1.4rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, border-color 0.15s, color 0.15s;
        }

        .calc-wa {
          color: #ffffff;
          background: linear-gradient(180deg, #3bb6ea 0%, #1793c9 100%);
          border: 1px solid #29abe2;
          box-shadow: 0 8px 22px -6px rgba(41, 171, 226, 0.55);
        }

        .calc-wa:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 28px -6px rgba(41, 171, 226, 0.7);
        }

        .calc-secondary {
          background: #ffffff;
          border: 1.5px solid var(--border);
          color: var(--foreground);
        }

        .calc-secondary:hover {
          border-color: var(--brand-blue);
          color: var(--brand-blue);
        }

        @keyframes stepIn {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 1100px) {
          .cols-5 {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 560px) {
          .cols-4,
          .cols-5 {
            grid-template-columns: repeat(2, 1fr);
          }

          .calc-wa,
          .calc-secondary {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .calc-step {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
