"use client";

import React from "react";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  className = "",
  rotate = "",
}: CardProps) => {
  return (
    <div
      className={`relative w-full max-w-[275px] sm:max-w-[290px] md:max-w-none md:w-[290px] mx-auto transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      <div className="bg-[#FFFFFF] p-2 sm:p-2.5 rounded-[18px] sm:rounded-[22px] shadow-[0px_6px_20px_rgba(24,24,24,0.04)] border border-[#E5E2DC]/80">
        <Pin className="w-5 h-5 sm:w-6 sm:h-6 text-[#29ABE2] z-20 mb-2 sm:mb-3 mx-auto" />
        <div className="bg-[#FAF9F6] border border-[#EAE6DF]/60 rounded-[14px] sm:rounded-[16px] p-3.5 sm:p-5 h-full flex flex-col relative overflow-hidden">
          <span className="text-[#29ABE2] text-2xl sm:text-3xl font-display font-bold mb-1.5 sm:mb-2.5 tracking-wide">
            {number}
          </span>
          <h3 className="text-base sm:text-xl font-display font-semibold text-[#181818] leading-tight mb-1 sm:mb-2">
            {title}
          </h3>
          <p className="text-[#4A4844] text-xs sm:text-sm leading-relaxed font-body">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-0 sm:rotate-[1.5deg] md:rotate-[5deg]" },
  {
    className: "md:absolute md:top-[120px] md:right-[15%]",
    rotate: "rotate-0 sm:-rotate-[1.5deg] md:-rotate-[5deg]",
  },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-0 sm:rotate-[1.5deg] md:rotate-[5deg]" },
  {
    className: "md:absolute md:top-[570px] md:right-[10%]",
    rotate: "rotate-0 sm:-rotate-[1.5deg] md:-rotate-[5deg]",
  },
  { className: "md:absolute md:top-[850px] md:left-[15%]", rotate: "rotate-0 sm:rotate-[1.5deg] md:rotate-[5deg]" },
];

export default function HowItWorks({
  features,
  className = "",
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Understand",
      description: "We start with your home, lifestyle, requirements and budget.",
      colorTheme: "blue",
    },
    {
      title: "Design",
      description: "We turn your requirements into a considered interior design.",
      colorTheme: "blue",
    },
    {
      title: "Plan",
      description: "Materials, finishes, furniture, lighting and execution are planned before work begins.",
      colorTheme: "blue",
    },
    {
      title: "Execute",
      description: "The team coordinates execution with attention to quality and detail.",
      colorTheme: "blue",
    },
    {
      title: "Handover",
      description: "Your finished space, ready to live in.",
      colorTheme: "blue",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else if (data.length === 4) height = 900;
  else height = 1130;

  return (
    <div
        className={`bg-transparent max-md:pt-8 max-md:pb-16 md:py-12 px-4 relative ${className}`}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full max-w-[1000px] mx-auto flex flex-col space-y-5 sm:space-y-6 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0)
                      return "M 290 150 C 500 150, 550 270, 710 270"; // 1 -> 2
                    if (index === 1)
                      return acc + " C 850 270, 500 350, 290 450"; // 2 -> 3
                    if (index === 2)
                      return acc + " C 290 600, 550 720, 750 720"; // 3 -> 4
                    if (index === 3)
                      return acc + " C 950 720, 500 800, 290 850"; // 4 -> 5
                    return acc;
                  }, "");
                  return (
                    <path
                      d={pathD}
                      stroke="#29ABE2"
                      strokeOpacity="0.3"
                      strokeWidth="2"
                      strokeDasharray="6 5"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    >
                      {/* Native SVG animation: avoids shipping motion (~40KB gzip) for a looping dash */}
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-140"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  colorTheme={step.colorTheme || "blue"}
                  colors={step.colors}
                  rotate={position.rotate}
                  className={position.className}
                />
              );
            })}
          </div>
        </div>
    </div>
  );
}
