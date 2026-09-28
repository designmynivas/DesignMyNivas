"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";
import TestimonialCard from "@/components/testimonials/testimonial-card";
import { Testimonial } from "@/types/testimonial";
import { initialTestimonials } from "@/data/testimonials";

interface TestimonialsProps {
  initialTestimonials?: Testimonial[];
}

export default function Testimonials({ initialTestimonials: propInitial }: TestimonialsProps = {}) {
  const [items, setItems] = useState<Testimonial[]>(() => {
    if (propInitial && propInitial.length > 0) {
      const videoReviews = propInitial.filter((t) => Boolean(t.youtube_url));
      if (videoReviews.length > 0) return videoReviews;
    }
    return initialTestimonials.filter((t) => Boolean(t.youtube_url));
  });
  const [prevPropInitial, setPrevPropInitial] = useState(propInitial);

  if (propInitial !== prevPropInitial) {
    setPrevPropInitial(propInitial);
    if (propInitial && propInitial.length > 0) {
      const videoReviews = propInitial.filter((t) => Boolean(t.youtube_url));
      if (videoReviews.length > 0) setItems(videoReviews);
    }
  }

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = () => {
      import("@/lib/supabase/queries").then(({ getTestimonials }) => getTestimonials()).then((res) => {
        if (isMounted && res) {
          const videoReviews = res.filter((t) => Boolean(t.youtube_url));
          if (videoReviews.length > 0) {
            setItems(videoReviews);
          }
        }
      });
    };

    if (!propInitial || propInitial.length === 0) {
      fetchLatest();
    }

    const handleUpdate = () => fetchLatest();
    window.addEventListener("dmn-testimonials-updated", handleUpdate);
    window.addEventListener("focus", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("dmn-testimonials-updated", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, [propInitial]);

  // Limit featured testimonials on home page to exactly the newest 3
  const displayTestimonials = (items && items.length > 0 ? items : initialTestimonials).slice(0, 3);

  return (
    <section className="section testimonials-section" aria-label="Client Video Testimonials">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Homeowner Video Stories"
          title="Stories from our homeowners."
          subtitle="Watch real walkthrough reviews from families who trusted Design My Nivas with their personal living spaces across Hyderabad, Warangal, and Karimnagar."
          align="center"
        />

        <div className="home-testimonials-grid" role="list">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="testimonials-action-row">
          <Link href="/testimonials" className="btn btn-secondary view-all-testimonials-btn">
            <span>View All Client Stories</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          background-color: var(--background);
          border: none;
          padding: var(--space-96) 0;
        }

        .home-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .testimonials-action-row {
          display: flex;
          justify-content: center;
          margin-top: 2.5rem;
        }

        :global(.view-all-testimonials-btn) {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 48px;
          padding: 0 1.75rem;
          background: #FFFFFF;
          border: 1.5px solid #D8D5CF;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--foreground);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }

        :global(.view-all-testimonials-btn:hover) {
          border-color: #29ABE2;
          color: #29ABE2;
          background-color: rgba(41, 171, 226, 0.04);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px -3px rgba(41, 171, 226, 0.18);
        }


        @media (max-width: 1024px) {
          .home-testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .home-testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
