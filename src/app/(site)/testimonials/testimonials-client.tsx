"use client";

import Link from "next/link";
import type { Testimonial } from "@/types/testimonial";
import { initialTestimonials as defaultTestimonials } from "@/data/testimonials";
import TestimonialCard from "@/components/testimonials/testimonial-card";

interface TestimonialsClientProps {
  initialTestimonials?: Testimonial[];
}

export default function TestimonialsClient({ initialTestimonials }: TestimonialsClientProps) {
  // Display video testimonials only
  const allTestimonials = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : defaultTestimonials;
  const testimonials = allTestimonials.filter((t) => Boolean(t.youtube_url));

  return (
    <div className="testimonials-page-container">
      {/* Header */}
      <header className="testimonials-hero-header">
        <div className="container-wide">
          <div className="testimonials-header-content">
            <span className="eyebrow">Client Experiences</span>
            <h1 className="testimonials-main-headline">
              Stories from families who built their homes with us.
            </h1>
            <p className="testimonials-main-lead">
              Every review reflects an actual completed turnkey residence. We do not publish fabricated ratings or unverified feedback.
            </p>
          </div>
        </div>
      </header>

      {/* Testimonials Body */}
      <section className="testimonials-grid-section" aria-label="Verified Client Stories">
        <div className="container-wide">
          {testimonials.length > 0 ? (
            <div className="testimonials-grid" role="list">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          ) : (
            <div className="testimonials-empty-state">
              <div className="empty-card">
                <span className="quote-glyph" aria-hidden="true">&ldquo;</span>
                <h2 className="empty-title">Verified Client Reviews in Progress</h2>
                <p className="empty-desc">
                  Design My Nivas records comprehensive post-handover video interviews and written client feedback after each 3-stage snagging audit. Verified testimonials from recently completed projects in Hyderabad, Warangal, and Karimnagar will appear here as final handovers conclude.
                </p>
                <div className="empty-trust-strip">
                  <span className="trust-pill">&#10003; Zero Fabricated Reviews</span>
                  <span className="trust-sep">·</span>
                  <span className="trust-pill">&#10003; 100% Real Site Handover Audits</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="testimonials-cta-banner">
        <div className="container-wide">
          <div className="testimonials-banner-card">
            <span className="banner-tag">Begin Your Project</span>
            <h2 className="banner-title">Experience the difference of transparent turnkey execution.</h2>
            <p className="banner-lead">
              Book a complimentary 45-minute spatial consultation for your flat, villa, or penthouse.
            </p>
            <Link href="/contact" className="btn btn-primary banner-action-btn">
              <span>Book a Consultation</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .testimonials-page-container {
          padding-top: calc(76px + var(--space-48));
          padding-bottom: var(--space-96);
          background-color: var(--background);
        }

        .testimonials-hero-header {
          padding-bottom: var(--space-48);
          border-bottom: 1px solid var(--border-subtle);
        }

        .testimonials-header-content {
          max-width: 760px;
        }

        .testimonials-main-headline {
          font-size: clamp(2.35rem, 4.5vw, 3.75rem);
          font-weight: 650;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-top: 0.5rem;
          margin-bottom: 1rem;
        }

        .testimonials-main-lead {
          font-size: 1.125rem;
          line-height: 1.65;
          color: var(--foreground-muted);
        }

        .testimonials-grid-section {
          padding-top: var(--space-64);
          padding-bottom: var(--space-64);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* Empty State */
        .testimonials-empty-state {
          display: flex;
          justify-content: center;
        }

        .empty-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: clamp(2.5rem, 5vw, 4rem);
          max-width: 680px;
          text-align: center;
          box-shadow: 0 4px 24px rgba(24, 24, 24, 0.04);
        }

        .quote-glyph {
          font-family: var(--font-display);
          font-size: 4rem;
          line-height: 1;
          color: var(--brand-blue);
          display: block;
          margin-bottom: 0.5rem;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 650;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin-bottom: 1rem;
        }

        .empty-desc {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--foreground-muted);
          margin-bottom: 2rem;
        }

        .empty-trust-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--foreground);
        }

        .trust-sep {
          opacity: 0.3;
        }

        /* Banner */
        .testimonials-cta-banner {
          padding-top: var(--space-32);
        }

        .testimonials-banner-card {
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

        .banner-tag {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brand-blue);
          display: block;
          margin-bottom: 0.75rem;
        }

        .banner-title {
          font-size: clamp(1.85rem, 4vw, 2.75rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          color: #181818;
          max-width: 720px;
          margin: 0 auto 1rem auto;
        }

        .banner-lead {
          font-size: 1.0625rem;
          line-height: 1.65;
          color: #555555;
          max-width: 580px;
          margin: 0 auto 2rem auto;
        }

        :global(.banner-action-btn) {
          height: 48px;
          padding: 0 2rem;
          font-size: 0.9375rem;
          border-radius: 12px !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 28px -4px rgba(41, 171, 226, 0.52), 0 4px 10px -2px rgba(41, 171, 226, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
        }

        :global(.banner-action-btn:hover) {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -4px rgba(41, 171, 226, 0.7), 0 6px 16px -2px rgba(41, 171, 226, 0.45) !important;
        }

        @media (max-width: 960px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
