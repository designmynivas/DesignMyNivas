"use client";

import React, { useEffect, useRef } from "react";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionEl = sectionRef.current;
    const headingEl = headingRef.current;
    if (!sectionEl || !headingEl) return;

    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let isDisposed = false;
    let cleanupTimeline: (() => void) | null = null;

    // Load GSAP only when statement section approaches viewport (rootMargin: 150px)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();

          Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]).then(([gsapModule, stModule]) => {
            if (isDisposed) return;

            const gsap = gsapModule.default || gsapModule;
            const ScrollTrigger = stModule.default || stModule;
            gsap.registerPlugin(ScrollTrigger);

            const lines = headingEl.querySelectorAll(".statement-line");
            gsap.set(lines, { opacity: 0.25, y: 15 });

            const stTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: sectionEl,
                start: "top 75%",
                end: "bottom 55%",
                scrub: 0.4,
              },
            });

            lines.forEach((line) => {
              stTimeline.to(
                line,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                },
                ">0.2"
              );
            });

            cleanupTimeline = () => {
              stTimeline.kill();
              ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === sectionEl) t.kill();
              });
            };
          }).catch(() => {
            // Fallback: keep visible
          });
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(sectionEl);

    return () => {
      isDisposed = true;
      observer.disconnect();
      if (cleanupTimeline) cleanupTimeline();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="statement-section"
      aria-label="Design My Nivas Philosophy"
    >
      <div className="container-narrow">
        <div className="statement-content">
          {/* Subtle Eyebrow */}
          <span className="eyebrow statement-eyebrow">
            Architecture of Living
          </span>

          {/* Kinetic Scroll-Scrubbed Heading */}
          <h2 ref={headingRef} className="statement-heading">
            <span className="statement-line block-line">Your home should</span>
            <span className="statement-line block-line headline-strong">
              look beautiful.
            </span>
            <span className="statement-line block-line accent-line">
              It should also
            </span>
            <span className="statement-line block-line headline-strong brand-highlight">
              work beautifully.
            </span>
          </h2>
        </div>
      </div>

      <style jsx>{`
        .statement-section {
          background-color: var(--background);
          padding-top: clamp(1rem, 2.5vw, 2rem);
          padding-bottom: clamp(3rem, 5.5vw, 5rem);
          text-align: center;
          position: relative;
        }

        .statement-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-20);
        }

        .statement-eyebrow {
          letter-spacing: 0.16em;
          margin-bottom: 0.5rem;
        }

        .statement-heading {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5.5vw, 4.25rem);
          font-weight: 650;
          line-height: 1.14;
          letter-spacing: -0.03em;
          color: var(--foreground);
        }

        .block-line {
          display: block;
          transition: color 0.3s ease;
        }

        .headline-strong {
          color: var(--foreground);
        }

        .accent-line {
          color: var(--foreground-muted);
        }

        .brand-highlight {
          color: #29ABE2;
        }
      `}</style>
    </section>
  );
}
