"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { trustMetrics } from "@/lib/config/site";

function useCountUp(target: number, duration = 1800, startCounting = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo for dramatic luxury deceleration
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, startCounting]);

  return count;
}

function TrustItem({
  target,
  suffix,
  label,
  startCounting,
}: {
  target: number;
  suffix: string;
  label: string;
  startCounting: boolean;
}) {
  const animatedCount = useCountUp(target, 1800, startCounting);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex items-baseline justify-center tracking-tight">
        <span className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#181818] leading-none">
          {startCounting ? animatedCount : 0}
        </span>
        {suffix && (
          <span className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#29ABE2] leading-none ml-0.5">
            {suffix}
          </span>
        )}
      </div>
      <p className="font-body text-xs sm:text-sm md:text-base font-medium text-[#66625D] mt-2 sm:mt-3 leading-snug max-w-[180px]">
        {label}
      </p>
    </div>
  );
}

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    },
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.15,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <section
      ref={sectionRef}
      className="trust-section"
      aria-label="Our Track Record"
    >
      <div className="container-wide">
        <div className="trust-grid">
          {trustMetrics.map((metric) => {
            const numericMatch = metric.value.match(/^(\d+)/);
            const target = numericMatch ? parseInt(numericMatch[1], 10) : 0;
            const suffix = metric.value.replace(/^\d+/, "");

            return (
              <TrustItem
                key={metric.label}
                target={target}
                suffix={suffix}
                label={metric.label}
                startCounting={isVisible}
              />
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .trust-section {
          background-color: var(--background);
          border: none;
          padding: clamp(1.75rem, 3.5vw, 2.75rem) 0 clamp(0.75rem, 1.5vw, 1.25rem);
          position: relative;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 4vw, 3.5rem);
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .trust-section {
            padding: 1.25rem 0 0.5rem;
          }

          .trust-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
