"use client";

import Image from "next/image";
import Link from "next/link";
import { ServiceItem } from "@/data/services";
import { useBookingModal } from "@/context/booking-modal-context";
import { useCostEstimator } from "@/context/cost-estimator-context";

interface ServiceCardProps {
  service: ServiceItem;
  priority?: boolean;
  layout?: "grid" | "row";
  reversed?: boolean;
}

export default function ServiceCard({
  service,
  priority = false,
  layout = "grid",
  reversed = false,
}: ServiceCardProps) {
  const { openBookingModal } = useBookingModal();
  const { openCostEstimator } = useCostEstimator();

  const handleBookService = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openBookingModal({
      service: service.name,
      source: `service-card-${service.slug}`,
    });
  };

  const handleEstimateCost = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openCostEstimator({
      service: service.slug,
    });
  };

  /* ─────────────────────────────────────────────────────────────
     ROW LAYOUT: Full-width alternating cards for /services page
     Card 0: Text LEFT, Image RIGHT
     Card 1: Image LEFT, Text RIGHT
     Card 2: Text LEFT, Image RIGHT ...
     ───────────────────────────────────────────────────────────── */
  if (layout === "row") {
    return (
      <article className={`service-card-row group ${reversed ? "is-reversed" : ""}`} role="listitem">
        {/* Content Column (Text, Features, 3 Action Buttons) */}
        <div className="service-row-content">
          <div className="service-row-header-meta">
            <span className="service-row-number">{service.number}</span>
            <span className="service-row-sep" aria-hidden="true">·</span>
            <span className="service-row-badge">Design My Nivas</span>
          </div>

          <Link href={`/services/${service.slug}`} className="service-title-link">
            <h2 className="service-row-title">{service.name}</h2>
          </Link>

          <p className="service-row-description">
            {service.description || service.shortDescription}
          </p>

          {/* Key Architectural Inclusions */}
          {service.features && service.features.length > 0 && (
            <ul className="service-row-features" aria-label="Key features">
              {service.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="feature-item">
                  <svg
                    className="feature-check"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#29ABE2"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 3 Call to Action Buttons: Primary + Estimate Cost + View Details */}
          <div className="service-row-actions">
            <button
              type="button"
              onClick={handleBookService}
              className="service-btn-primary"
              aria-label={`Book this service: ${service.name}`}
            >
              <span>Book this service</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </button>

            <button
              type="button"
              onClick={handleEstimateCost}
              className="service-btn-secondary"
              aria-label={`Estimate cost for ${service.name}`}
            >
              <span>Estimate cost</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </button>

            <Link
              href={`/services/${service.slug}`}
              className="service-btn-details"
              aria-label={`View details for ${service.name}`}
            >
              <span>View Details</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Media Column (Large Landscape Architectural Image) */}
        <div className="service-row-media">
          <Link
            href={`/services/${service.slug}`}
            className="service-row-image-link"
            aria-label={`View ${service.name} gallery and specifications`}
          >
            <div className="service-row-image-frame">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                priority={priority}
                className="service-row-image"
                style={{ objectFit: "cover" }}
              />
              <div className="service-badge-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <style jsx>{`
          .service-card-row {
            background-color: #FFFFFF;
            border: 1px solid #E5E2DC;
            border-radius: 24px;
            overflow: hidden;
            display: grid;
            grid-template-columns: 1.15fr 1fr;
            gap: clamp(2rem, 4vw, 3.5rem);
            align-items: center;
            padding: clamp(1.75rem, 3.5vw, 2.75rem);
            box-shadow: 0 1px 3px rgba(24, 24, 24, 0.02);
            transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 300ms cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .service-card-row:hover {
            transform: translateY(-2px);
            border-color: #29ABE2;
            box-shadow: 0 12px 32px rgba(24, 24, 24, 0.06);
          }

          /* Alternating Left & Right Layout */
          .service-row-content {
            order: 1;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .service-row-media {
            order: 2;
            position: relative;
            width: 100%;
          }

          .is-reversed .service-row-content {
            order: 2;
          }

          .is-reversed .service-row-media {
            order: 1;
          }

          .service-row-header-meta {
            display: flex;
            align-items: center;
            gap: 0.625rem;
          }

          .service-row-number {
            font-family: var(--font-display);
            font-size: 0.875rem;
            font-weight: 700;
            color: #29ABE2;
            letter-spacing: 0.08em;
          }

          .service-row-sep {
            color: var(--border);
            font-size: 0.875rem;
          }

          .service-row-badge {
            font-size: 0.6875rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: var(--foreground-subtle);
            font-weight: 600;
          }

          .service-title-link {
            text-decoration: none;
            color: inherit;
          }

          .service-row-title {
            font-family: var(--font-display);
            font-size: clamp(1.65rem, 2.8vw, 2.25rem);
            font-weight: 650;
            color: var(--foreground);
            line-height: 1.2;
            letter-spacing: -0.02em;
            margin: 0;
            transition: color 0.15s ease;
          }

          .service-card-row:hover .service-row-title {
            color: #29ABE2;
          }

          .service-row-description {
            font-family: var(--font-body);
            font-size: 1rem;
            line-height: 1.65;
            color: var(--foreground-muted);
            margin: 0;
          }

          .service-row-features {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .feature-item {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            font-size: 0.875rem;
            color: var(--foreground);
            line-height: 1.4;
          }

          .feature-check {
            flex-shrink: 0;
          }

          /* 3 Call to action buttons row */
          .service-row-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-top: 0.5rem;
          }

          /* Vibrant Blue Glow Button (12px rounded rectangle) */
          .service-btn-primary {
            height: 44px;
            padding: 0 1.35rem;
            background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%);
            color: #FFFFFF;
            border: 1px solid #29ABE2;
            border-radius: 12px;
            font-family: var(--font-body);
            font-size: 0.875rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            cursor: pointer;
            box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.5), 0 3px 8px -2px rgba(41, 171, 226, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
            transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            white-space: nowrap;
          }

          .service-btn-primary:hover {
            background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%);
            border-color: #1FA0D6;
            transform: translateY(-2px);
            box-shadow: 0 14px 32px -4px rgba(41, 171, 226, 0.68), 0 5px 12px -2px rgba(41, 171, 226, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6) !important;
          }

          .service-btn-primary:active {
            transform: scale(0.98);
            box-shadow: 0 4px 14px -2px rgba(41, 171, 226, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3) !important;
          }

          .cta-arrow {
            display: inline-block;
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .service-btn-primary:hover .cta-arrow,
          .service-btn-secondary:hover .cta-arrow,
          :global(.service-btn-details:hover) .cta-arrow {
            transform: translateX(3px);
          }

          /* 2nd Secondary Button: White BG with Blue Stroke */
          .service-btn-secondary {
            height: 44px;
            padding: 0 1.25rem;
            background: #FFFFFF;
            color: #29ABE2;
            border: 1.5px solid #29ABE2;
            border-radius: 12px;
            font-family: var(--font-body);
            font-size: 0.875rem;
            font-weight: 600;
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 0.45rem;
            cursor: pointer;
            text-decoration: none;
            box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04);
            transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            white-space: nowrap;
            flex-shrink: 0;
          }

          .service-btn-secondary:hover {
            border-color: #1FA0D6;
            color: #1FA0D6;
            background-color: rgba(41, 171, 226, 0.06);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px -3px rgba(41, 171, 226, 0.22);
          }

          /* 3rd CTA Button: White BG with Refined Grey/Black Stroke */
          :global(.service-btn-details) {
            height: 44px !important;
            padding: 0 1.25rem !important;
            background: #FFFFFF !important;
            color: #181818 !important;
            border: 1.5px solid #D8D5CF !important;
            border-radius: 12px !important;
            font-family: var(--font-body) !important;
            font-size: 0.875rem !important;
            font-weight: 600 !important;
            display: inline-flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.45rem !important;
            cursor: pointer !important;
            text-decoration: none !important;
            box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04) !important;
            transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }

          :global(.service-btn-details:hover) {
            border-color: #181818 !important;
            color: #181818 !important;
            background-color: #F7F5F0 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 18px -3px rgba(24, 24, 24, 0.12) !important;
          }

          /* Media Frame */
          .service-row-image-link {
            display: block;
            text-decoration: none;
            position: relative;
            width: 100%;
          }

          .service-row-image-frame {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            border-radius: 16px;
            overflow: hidden;
            background-color: var(--background-muted);
          }

          :global(.service-row-image) {
            object-fit: cover !important;
            transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .service-card-row:hover :global(.service-row-image) {
            transform: scale(1.03);
          }

          .service-badge-icon {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(24, 24, 24, 0.08);
            color: var(--foreground);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
            z-index: 2;
          }

          .service-card-row:hover .service-badge-icon {
            background-color: #29ABE2;
            color: #ffffff;
            border-color: #29ABE2;
            transform: scale(1.06);
          }

          @media (max-width: 960px) {
            .service-card-row {
              grid-template-columns: 1fr;
              gap: 2rem;
              padding: 1.5rem;
            }

            .service-row-content,
            .is-reversed .service-row-content {
              order: 2;
            }

            .service-row-media,
            .is-reversed .service-row-media {
              order: 1;
            }
          }

          @media (max-width: 600px) {
            .service-card-row {
              padding: 1.25rem;
              border-radius: 20px;
            }

            .service-row-actions {
              flex-wrap: wrap;
            }

            .service-btn-primary {
              width: 100%;
              flex: 0 0 100%;
              justify-content: center;
              height: 44px;
            }

            .service-btn-secondary,
            :global(.service-btn-details) {
              flex: 1 1 0px !important;
              min-width: 0 !important;
              justify-content: center !important;
              height: 42px !important;
            }
          }
        `}</style>
      </article>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     GRID LAYOUT: 2-column card for homepage
     ───────────────────────────────────────────────────────────── */
  return (
    <article className="service-card group" role="listitem">
      {/* 1. Large 16:9 Landscape Architectural Image with Visible Inset Gap */}
      <Link
        href={`/services/${service.slug}`}
        className="service-image-link"
        aria-label={`View ${service.name} details`}
      >
        <div className="service-image-frame">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 680px"
            priority={priority}
            className="service-image"
            style={{ objectFit: "cover" }}
          />
          <div className="service-badge-icon" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </Link>

      {/* 2. Structured Editorial Content */}
      <div className="service-card-body">
        <Link href={`/services/${service.slug}`} className="service-title-link">
          <h3 className="service-title">{service.name}</h3>
        </Link>

        <p className="service-description">{service.shortDescription}</p>

        {/* 3. Action Buttons Row: Primary + Secondary + Third View Details Button */}
        <div className="service-action-row">
          <div className="service-cta-buttons">
            <button
              type="button"
              onClick={handleBookService}
              className="service-btn-primary"
              aria-label={`Book this service: ${service.name}`}
            >
              <span>Book this service</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </button>

            <button
              type="button"
              onClick={handleEstimateCost}
              className="service-btn-secondary"
              aria-label={`Estimate cost for ${service.name}`}
            >
              <span>Estimate cost</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </button>

            <Link
              href={`/services/${service.slug}`}
              className="service-btn-details"
              aria-label={`View details for ${service.name}`}
            >
              <span>View Details</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .service-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E2DC;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.02);
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 300ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-card:hover {
          transform: translateY(-2px);
          border-color: #29ABE2;
          box-shadow: 0 12px 32px rgba(24, 24, 24, 0.06);
        }

        /* 16:9 Landscape Image with Visible Inset Gap */
        .service-image-link {
          display: block;
          position: relative;
          text-decoration: none;
          padding: 14px 14px 0 14px;
        }

        .service-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 14px;
          overflow: hidden;
          background-color: var(--background-muted);
        }

        :global(.service-image) {
          object-fit: cover !important;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-card:hover :global(.service-image) {
          transform: scale(1.02);
        }

        .service-badge-icon {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(24, 24, 24, 0.08);
          color: var(--foreground);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
          z-index: 2;
        }

        .service-card:hover .service-badge-icon {
          background-color: #29ABE2;
          color: #ffffff;
          border-color: #29ABE2;
          transform: scale(1.05);
        }

        /* Card Content Area */
        .service-card-body {
          padding: 1.5rem 1.5rem 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .service-title-link {
          text-decoration: none;
          color: inherit;
        }

        .service-title {
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 2.2vw, 1.625rem);
          font-weight: 650;
          color: var(--foreground);
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
          transition: color 0.15s ease;
        }

        .service-card:hover .service-title {
          color: #29ABE2;
        }

        .service-description {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          margin-bottom: 1.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* CTA Area Baseline */
        .service-action-row {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .service-cta-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* Primary Button: Vibrant Blue Glow Button (12px radius) */
        .service-btn-primary {
          height: 44px;
          padding: 0 1.35rem;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%);
          color: #FFFFFF;
          border: 1px solid #29ABE2;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.5), 0 3px 8px -2px rgba(41, 171, 226, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .service-btn-primary:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%);
          border-color: #1FA0D6;
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -4px rgba(41, 171, 226, 0.68), 0 5px 12px -2px rgba(41, 171, 226, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6) !important;
        }

        .service-btn-primary:active {
          transform: scale(0.98);
          box-shadow: 0 4px 14px -2px rgba(41, 171, 226, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3) !important;
        }

        .cta-arrow {
          display: inline-block;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-btn-primary:hover .cta-arrow,
        .service-btn-secondary:hover .cta-arrow,
        :global(.service-btn-details:hover) .cta-arrow {
          transform: translateX(3px);
        }

        /* 2nd Secondary Button: White BG with Blue Stroke */
        .service-btn-secondary {
          height: 44px;
          padding: 0 1.25rem;
          background: #FFFFFF;
          color: #29ABE2;
          border: 1.5px solid #29ABE2;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .service-btn-secondary:hover {
          border-color: #1FA0D6;
          color: #1FA0D6;
          background-color: rgba(41, 171, 226, 0.06);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px -3px rgba(41, 171, 226, 0.22);
        }

        /* 3rd CTA Button: White BG with Refined Grey/Black Stroke */
        :global(.service-btn-details) {
          height: 44px !important;
          padding: 0 1.25rem !important;
          background: #FFFFFF !important;
          color: #181818 !important;
          border: 1.5px solid #D8D5CF !important;
          border-radius: 12px !important;
          font-family: var(--font-body) !important;
          font-size: 0.875rem !important;
          font-weight: 600 !important;
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.45rem !important;
          cursor: pointer !important;
          text-decoration: none !important;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
        }

        :global(.service-btn-details:hover) {
          border-color: #181818 !important;
          color: #181818 !important;
          background-color: #F7F5F0 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 18px -3px rgba(24, 24, 24, 0.12) !important;
        }

        @media (max-width: 540px) {
          .service-image-link {
            padding: 10px 10px 0 10px;
          }

          .service-card-body {
            padding: 1.25rem 1.25rem 1.5rem 1.25rem;
          }

          .service-cta-buttons {
            flex-wrap: wrap;
          }

          .service-btn-primary {
            width: 100%;
            flex: 0 0 100%;
            justify-content: center;
            height: 44px;
          }

          .service-btn-secondary,
          :global(.service-btn-details) {
            flex: 1 1 0px !important;
            min-width: 0 !important;
            justify-content: center !important;
            height: 42px !important;
          }
        }
      `}</style>
    </article>
  );
}
