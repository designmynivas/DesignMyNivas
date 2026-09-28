"use client";

import HowItWorks, { Step } from "@/components/ui/how-it-works";

const processFeatures: Step[] = [
  {
    title: "Understand",
    description: "We start with your home, lifestyle, requirements and budget.",
    colorTheme: "blue",
  },
  {
    title: "Design",
    description: "We turn your requirements into a considered interior design.",
    colorTheme: "orange",
  },
  {
    title: "Plan",
    description: "Materials, finishes, furniture, lighting and execution are planned before work begins.",
    colorTheme: "purple",
  },
  {
    title: "Execute",
    description: "The team coordinates execution with attention to quality and detail.",
    colorTheme: "blue",
  },
  {
    title: "Handover",
    description: "Your finished space, ready to live in.",
    colorTheme: "orange",
  },
];

export default function Process() {
  return (
    <section className="section process-section" id="process" aria-label="Our Interior Design Process">
      <div className="container-wide">
        <div className="process-header">
          <span className="eyebrow process-eyebrow">Process</span>
          <h2 className="process-headline">
            From first conversation<br />to final handover.
          </h2>
          <p className="process-subtitle">
            A clear, predictable roadmap tailored to keep design decisions calm and execution on schedule.
          </p>
        </div>

        {/* 21st.dev How-It-Works Interactive Pinned Cards with Animated Path */}
        <div className="process-canvas-wrap">
          <HowItWorks
            features={processFeatures}
            className="bg-transparent dark:bg-transparent py-0 md:py-8 px-0"
          />
        </div>
      </div>

      <style jsx>{`
        .process-section {
          background-color: var(--background);
          border: none;
          padding: var(--space-96) 0;
          position: relative;
          overflow: hidden;
        }

        .process-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto var(--space-48);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-12);
        }

        .process-eyebrow {
          letter-spacing: 0.16em;
        }

        .process-headline {
          font-size: var(--text-display);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--foreground);
          line-height: 1.15;
        }

        .process-subtitle {
          font-size: var(--text-body-lg);
          color: var(--foreground-muted);
          line-height: 1.6;
        }

        .process-canvas-wrap {
          width: 100%;
          position: relative;
        }
      `}</style>
    </section>
  );
}
