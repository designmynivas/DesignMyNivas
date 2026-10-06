"use client";

import { useEffect, useRef, useState } from "react";
import { trustMetrics } from "@/lib/config/site";

function useCountUp(target: number, start: boolean, duration = 1100) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const total = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : duration;

    let startTime: number | null = null;
    let raf: number;
    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = total === 0 ? 1 : Math.min((timestamp - startTime) / total, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return count;
}

function Metric({ value, label, start }: { value: string; label: string; start: boolean }) {
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/^\d+/, "");
  const count = useCountUp(target, start);

  return (
    <div className="metric">
      <div className="metric-value" aria-hidden="true">
        {count}
        <span className="metric-suffix">{suffix}</span>
      </div>
      <span className="sr-only">{value}</span>
      <p className="metric-label">{label}</p>

      <style jsx>{`
        .metric {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          transition: border-color 0.2s, transform 0.2s var(--ease-out);
        }

        .metric:hover {
          border-color: var(--brand-blue-border);
          transform: translateY(-2px);
        }

        .metric-value {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.6vw, 2.875rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--foreground);
          font-variant-numeric: tabular-nums;
        }

        .metric-suffix {
          color: var(--brand-blue);
          margin-left: 2px;
        }

        .metric-label {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.3;
          color: var(--foreground-muted);
        }

        @media (max-width: 640px) {
          .metric {
            padding: 1rem 1.1rem;
            border-radius: 14px;
          }

          .metric-label {
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  );
}

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="trust-strip" aria-label="Our track record">
      <div className="container-wide">
        <div className="trust-grid">
          {trustMetrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} start={visible} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .trust-strip {
          padding: clamp(1.5rem, 3vw, 2.25rem) 0 0;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.625rem;
          }
        }
      `}</style>
    </section>
  );
}
