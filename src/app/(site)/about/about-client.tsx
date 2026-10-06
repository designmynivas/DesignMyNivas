"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import { useBookingModal } from "@/context/booking-modal-context";
import { getWhatsAppUrl, siteConfig } from "@/lib/config/site";
import TrustSection from "@/components/home/trust-section";
import { TrustPoints } from "@/components/home/why-us";
import BookButton from "@/components/ui/book-button";
import FeaturedTestimonials from "@/components/testimonials/featured-testimonials";
import type { Testimonial } from "@/types/testimonial";
import { aboutFaqs } from "@/data/about";

const AREAS = [
  { name: "Hyderabad", href: "/interior-designers/hyderabad" },
  { name: "Warangal", href: "/interior-designers/warangal" },
  { name: "Karimnagar", href: "/interior-designers/karimnagar" },
];

export default function AboutClient({ testimonials }: { testimonials: Testimonial[] }) {
  const { openBookingModal } = useBookingModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const whatsappUrl = getWhatsAppUrl("Hello Design My Nivas, I would like to start my home interior project.");
  const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="about">
      {/* 1. Intro */}
      <header className="about-hero">
        <div className="container-wide">
          <h1 className="about-title">
            Thoughtfully planned.
            <br />
            <span className="hl">Honestly built.</span>
          </h1>
          <p className="about-lead">
            A residential interior studio in Telangana, founded by Benson Cheripelli — built on clear pricing and
            homes delivered exactly as designed.
          </p>
        </div>
      </header>

      <TrustSection />

      {/* 2. Founder */}
      <section className="block" aria-labelledby="founder-title">
        <div className="container-wide block-head reveal">
          <h2 id="founder-title" className="block-title">
            Meet the <span className="hl">Founder</span>
          </h2>
        </div>
        <div className="container-wide founder-grid">
          <div className="founder-photo reveal">
            <Image
              src="/Images/founder/benson-cheripelli.webp"
              alt="Benson Cheripelli — Founder & Principal Interior Designer at Design My Nivas"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
          <div className="reveal">
            <p className="founder-name">Benson Cheripelli</p>
            <p className="founder-role">Founder &amp; Principal Designer</p>
            <blockquote className="founder-quote">
              &ldquo;When a family trusts us with their home, they&rsquo;re trusting us with the backdrop of their
              everyday life. That demands complete transparency.&rdquo;
            </blockquote>
            <p className="founder-p">
              Benson leads design reviews and site visits himself, working directly with homeowners in Hyderabad,
              Warangal and Karimnagar.
            </p>
            <BookButton label="Book a Consultation with Benson" source="about-founder-section" className="founder-cta" />
          </div>
        </div>
      </section>

      {/* 3. Why Design My Nivas */}
      <section className="block block-tight" aria-labelledby="why-about-title">
        <div className="container-wide reveal">
          <div className="block-head">
            <h2 id="why-about-title" className="block-title">
              Why <span className="hl">Design My Nivas</span>
            </h2>
          </div>
          <TrustPoints wide />
        </div>
      </section>

      {/* 4. Testimonials */}
      {testimonials.length > 0 && (
        <section className="block block-tight" id="testimonials" aria-labelledby="testimonials-title">
          <div className="container-wide">
            <div className="block-head reveal">
              <h2 id="testimonials-title" className="block-title">
                Client <span className="hl">Stories</span>
              </h2>
            </div>
            <div className="reveal">
              <FeaturedTestimonials items={testimonials} />
            </div>
          </div>
        </section>
      )}

      {/* 5. FAQ */}
      <section className="block block-tight" aria-labelledby="faq-title">
        <div className="container-narrow">
          <div className="block-head reveal">
            <h2 id="faq-title" className="block-title">
              Common <span className="hl">Questions</span>
            </h2>
          </div>
          <div className="faq-list reveal">
            {aboutFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.question} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className="faq-chevron" aria-hidden="true" />
                  </button>
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a" hidden={!isOpen}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Contact */}
      <section className="block contact-block" id="contact" aria-labelledby="contact-title">
        <div className="container-wide">
          <div className="contact-card reveal">
            <div className="contact-intro">
              <h2 id="contact-title" className="block-title">
                Start Your <span className="hl">Project</span>
              </h2>
              <p className="contact-areas">
                Serving{" "}
                {AREAS.map((a, i) => (
                  <span key={a.name}>
                    <Link href={a.href} className="contact-area-link">
                      {a.name}
                    </Link>
                    {i < AREAS.length - 2 ? ", " : i === AREAS.length - 2 ? " & " : ""}
                  </span>
                ))}
              </p>
            </div>

            <div className="contact-actions">
              <button
                type="button"
                className="contact-action is-primary"
                onClick={() => openBookingModal({ source: "about-contact" })}
              >
                <CalendarCheck size={22} aria-hidden="true" />
                <span className="contact-action-label">Book a Consultation</span>
                <span className="contact-action-sub">Free, 45 minutes</span>
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-action">
                <MessageCircle size={22} aria-hidden="true" />
                <span className="contact-action-label">WhatsApp</span>
                <span className="contact-action-sub">Quick replies</span>
              </a>
              <a href={telHref} className="contact-action">
                <Phone size={22} aria-hidden="true" />
                <span className="contact-action-label">Call Us</span>
                <span className="contact-action-sub">{siteConfig.phone}</span>
              </a>
            </div>

            <a href={`mailto:${siteConfig.email}`} className="contact-email">
              <Mail size={15} aria-hidden="true" /> {siteConfig.email}
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about {
          padding-top: calc(76px + clamp(2rem, 5vw, 3.5rem));
        }

        .about-hero {
          text-align: center;
        }

        .about-title {
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 680;
          line-height: 1.02;
          letter-spacing: -0.04em;
        }

        .about-title .hl {
          color: var(--brand-blue);
        }

        .about-lead {
          margin: 1.25rem auto 0;
          max-width: 560px;
          font-size: 1.0625rem;
          line-height: 1.55;
        }

        .block-tight {
          padding-top: clamp(1.5rem, 4vw, 3rem);
        }

        .founder-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(1.5rem, 5vw, 4.5rem);
          align-items: center;
        }

        .founder-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          max-height: 620px;
          border-radius: 20px;
          overflow: hidden;
          background: var(--background-muted);
        }

        .founder-quote {
          margin: 1.5rem 0 0;
          padding-left: 1.125rem;
          border-left: 3px solid var(--brand-blue);
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 1.8vw, 1.3rem);
          font-style: italic;
          line-height: 1.5;
          color: var(--foreground);
        }

        .founder-p {
          margin-top: 1.25rem;
          max-width: 520px;
          font-size: 1rem;
        }

        .founder-name {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 680;
          letter-spacing: -0.02em;
          color: var(--foreground);
        }

        .founder-role {
          margin-top: 0.15rem;
          font-size: 0.9375rem;
          color: var(--brand-blue);
          font-weight: 600;
        }

        .founder-grid :global(.founder-cta) {
          margin-top: 1.75rem;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .faq-item {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: border-color 0.2s;
        }

        .faq-item.is-open {
          border-color: var(--brand-blue-border);
        }

        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: none;
          border: none;
          text-align: left;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          color: var(--foreground);
          cursor: pointer;
        }

        .faq-q :global(.faq-chevron) {
          flex-shrink: 0;
          color: var(--brand-blue);
          transition: transform 0.25s var(--ease-out);
        }

        .is-open .faq-q :global(.faq-chevron) {
          transform: rotate(180deg);
        }

        .faq-a {
          padding: 0 1.25rem 1.1rem;
        }

        .faq-a p {
          font-size: 0.9375rem;
          line-height: 1.55;
        }

        .contact-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: clamp(1.25rem, 3vw, 2rem);
          padding: clamp(1.5rem, 4vw, 3rem);
          background: #ffffff;
          border: 1px solid var(--brand-blue-border);
          border-radius: 24px;
          box-shadow: 0 16px 48px -12px rgba(41, 171, 226, 0.18);
        }

        .contact-areas {
          margin-top: 0.875rem;
          font-size: 0.9375rem;
        }

        .contact-area-link {
          color: var(--foreground);
          font-weight: 600;
          border-bottom: 1px solid var(--border);
        }

        .contact-area-link:hover {
          color: var(--brand-blue);
          border-color: var(--brand-blue);
        }

        .contact-actions {
          width: 100%;
          max-width: 820px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .contact-action {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
          padding: 1.25rem;
          border-radius: 16px;
          border: 1.5px solid var(--border);
          background: #ffffff;
          color: var(--foreground);
          font-family: var(--font-body);
          text-align: left;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.2s var(--ease-out), box-shadow 0.2s;
        }

        .contact-action :global(svg) {
          color: var(--brand-blue);
          margin-bottom: 0.5rem;
        }

        .contact-action:hover {
          border-color: var(--brand-blue);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -8px rgba(41, 171, 226, 0.3);
        }

        .contact-action.is-primary {
          background: linear-gradient(180deg, #3bb6ea 0%, #1793c9 100%);
          border-color: #29abe2;
          color: #ffffff;
        }

        .contact-action.is-primary :global(svg),
        .contact-action.is-primary .contact-action-sub {
          color: rgba(255, 255, 255, 0.9);
        }

        .contact-action-label {
          font-size: 1rem;
          font-weight: 650;
        }

        .contact-action-sub {
          font-size: 0.8125rem;
          color: var(--foreground-muted);
        }

        .contact-email {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          color: var(--foreground-muted);
        }

        .contact-email:hover {
          color: var(--brand-blue);
        }

        @media (max-width: 900px) {
          .founder-grid {
            grid-template-columns: 1fr;
          }

          .founder-photo {
            aspect-ratio: 4 / 3;
          }
        }

        @media (max-width: 560px) {
          .contact-actions {
            grid-template-columns: 1fr;
          }

          .contact-action {
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            gap: 0 0.75rem;
            padding: 1rem;
          }

          .contact-action :global(svg) {
            margin-bottom: 0;
          }

          .contact-action-sub {
            margin-left: auto;
          }
        }
      `}</style>
    </div>
  );
}
