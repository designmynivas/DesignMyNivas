"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import InteriorLottieAnimation from "./interior-lottie-animation";

interface InteriorLoaderProps {
  title?: string;
  subtitle?: string;
  size?: number;
}

export default function InteriorLoader({
  title = "Calculating Interior Estimate...",
  subtitle = "Analyzing space parameters, joinery details & Telangana benchmarks...",
  size = 200,
}: InteriorLoaderProps) {
  return (
    <div className="interior-loader-wrap" role="status" aria-live="polite">
      {/* Interior Lottie Design Animation */}
      <div className="lottie-animation-box">
        <InteriorLottieAnimation size={size} />
      </div>

      {/* Reassuring Stable Title & Subtitle (No rapid cycling text) */}
      <div className="loader-text-block">
        <div className="loader-title-row">
          <Sparkles size={15} className="sparkle-accent" aria-hidden="true" />
          <h4 className="loader-title">{title}</h4>
        </div>
        <p className="loader-subtitle">{subtitle}</p>

        {/* Micro Progress Bar */}
        <div className="progress-track" aria-hidden="true">
          <div className="progress-fill" />
        </div>
      </div>

      <style jsx>{`
        .interior-loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
          min-height: 220px;
          text-align: center;
          animation: loaderFadeIn 0.25s ease-out;
        }

        .lottie-animation-box {
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          max-width: 380px;
        }

        .loader-title-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .sparkle-accent {
          color: #29ABE2;
          animation: spinPulse 2.5s ease-in-out infinite;
        }

        .loader-title {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 650;
          color: var(--foreground);
          letter-spacing: -0.015em;
        }

        .loader-subtitle {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          color: var(--foreground-muted);
          line-height: 1.45;
        }

        .progress-track {
          width: 160px;
          height: 3px;
          background: rgba(41, 171, 226, 0.15);
          border-radius: 9999px;
          overflow: hidden;
          margin-top: 0.625rem;
        }

        .progress-fill {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #3BB6EA 0%, #1793C9 100%);
          border-radius: 9999px;
          animation: progressSlide 0.85s ease-in-out infinite;
        }

        @keyframes spinPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.15) rotate(180deg);
          }
        }

        @keyframes progressSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes loaderFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
