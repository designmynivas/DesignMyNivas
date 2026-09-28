"use client";

import React from "react";

interface InteriorLottieAnimationProps {
  size?: number;
  className?: string;
}

export default function InteriorLottieAnimation({
  size = 220,
  className = "",
}: InteriorLottieAnimationProps) {
  return (
    <div
      className={`interior-lottie-container ${className}`}
      style={{ width: size, height: size * 0.75 }}
      aria-label="Interior design animation"
      role="img"
    >
      <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="interior-lottie-svg"
      >
        <defs>
          {/* Brand Gradients */}
          <linearGradient id="sofaGrad" x1="60" y1="140" x2="220" y2="185" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3BB6EA" />
            <stop offset="100%" stopColor="#1793C9" />
          </linearGradient>

          <linearGradient id="cushionGrad" x1="80" y1="120" x2="200" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EBF7FC" />
            <stop offset="100%" stopColor="#D4EEF9" />
          </linearGradient>

          <linearGradient id="lightBeamGrad" x1="160" y1="42" x2="160" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#29ABE2" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#29ABE2" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#29ABE2" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="potGrad" x1="250" y1="150" x2="275" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8DFD5" />
            <stop offset="100%" stopColor="#C9BEB2" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Architectural Grid Floor Line */}
        <line x1="24" y1="205" x2="296" y2="205" stroke="#E5E0D8" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="205" x2="260" y2="205" stroke="#29ABE2" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" className="anim-floor-dash" />

        {/* 2. Wall Art Frame with Abstract Composition */}
        <g className="anim-wall-art">
          <rect x="110" y="32" width="70" height="46" rx="6" fill="#FFFFFF" stroke="#E2DED6" strokeWidth="1.5" />
          <rect x="115" y="37" width="60" height="36" rx="4" fill="#F8FAFC" />
          {/* Abstract geometric artwork */}
          <circle cx="135" cy="55" r="10" fill="#3BB6EA" fillOpacity="0.4" />
          <rect x="142" y="46" width="18" height="18" rx="3" fill="#1793C9" fillOpacity="0.65" />
          <line x1="122" y1="64" x2="168" y2="64" stroke="#D1CBC1" strokeWidth="1" />
        </g>

        {/* 3. Designer Ceiling Pendant Lamp & Radiant Light Beam */}
        <g className="anim-pendant-lamp">
          {/* Wire */}
          <line x1="160" y1="0" x2="160" y2="40" stroke="#71717A" strokeWidth="1.5" />
          {/* Cone Lamp Shade */}
          <path d="M146 48 L174 48 L166 40 L154 40 Z" fill="#27272A" />
          {/* Warm LED Bulb */}
          <circle cx="160" cy="50" r="3.5" fill="#FFE58F" />
          
          {/* Illuminated Ambient Light Cone */}
          <polygon
            points="152,50 168,50 225,204 95,204"
            fill="url(#lightBeamGrad)"
            className="anim-light-cone"
          />
        </g>

        {/* 4. Luxury Designer Sofa */}
        <g className="anim-sofa">
          {/* Sofa Shadow */}
          <ellipse cx="140" cy="204" rx="66" ry="5" fill="#18181B" fillOpacity="0.08" />

          {/* Sofa Legs */}
          <line x1="82" y1="184" x2="78" y2="204" stroke="#27272A" strokeWidth="3" strokeLinecap="round" />
          <line x1="198" y1="184" x2="202" y2="204" stroke="#27272A" strokeWidth="3" strokeLinecap="round" />
          <line x1="110" y1="184" x2="108" y2="204" stroke="#3F3F46" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="170" y1="184" x2="172" y2="204" stroke="#3F3F46" strokeWidth="2.5" strokeLinecap="round" />

          {/* Sofa Main Base Chassis */}
          <rect x="74" y="162" width="132" height="24" rx="8" fill="url(#sofaGrad)" />

          {/* Sofa Backrest */}
          <rect x="78" y="112" width="124" height="52" rx="10" fill="#1992C8" />
          {/* Backrest pleat accents */}
          <line x1="120" y1="116" x2="120" y2="160" stroke="#1377A4" strokeWidth="1.5" />
          <line x1="160" y1="116" x2="160" y2="160" stroke="#1377A4" strokeWidth="1.5" />

          {/* Seat Cushions */}
          <rect x="80" y="148" width="58" height="22" rx="6" fill="url(#cushionGrad)" stroke="#1793C9" strokeWidth="1" />
          <rect x="142" y="148" width="58" height="22" rx="6" fill="url(#cushionGrad)" stroke="#1793C9" strokeWidth="1" />

          {/* Sofa Armrests */}
          <rect x="68" y="132" width="16" height="42" rx="7" fill="#1E9ED4" />
          <rect x="196" y="132" width="16" height="42" rx="7" fill="#1788BA" />

          {/* Accent Throw Pillow */}
          <g className="anim-pillow">
            <rect x="90" y="136" width="22" height="22" rx="5" transform="rotate(-12 90 136)" fill="#FFFFFF" stroke="#29ABE2" strokeWidth="1.5" />
            <line x1="94" y1="145" x2="106" y2="142" stroke="#29ABE2" strokeWidth="1.2" />
          </g>
        </g>

        {/* 5. Minimalist Nesting Coffee Table with Decor */}
        <g className="anim-table">
          {/* Table Shadow */}
          <ellipse cx="145" cy="204" rx="28" ry="4" fill="#18181B" fillOpacity="0.06" />
          {/* Slender Black Legs */}
          <line x1="130" y1="182" x2="126" y2="203" stroke="#27272A" strokeWidth="2" strokeLinecap="round" />
          <line x1="160" y1="182" x2="164" y2="203" stroke="#27272A" strokeWidth="2" strokeLinecap="round" />
          {/* Marble/Oak Tabletop */}
          <ellipse cx="145" cy="180" rx="30" ry="7" fill="#FFFFFF" stroke="#E2DED6" strokeWidth="1.5" />
          {/* Ceramic Decorative Bud Vase */}
          <path d="M142 176 C142 173 144 171 146 171 C148 171 150 173 150 176 Z" fill="#29ABE2" />
          <line x1="146" y1="171" x2="146" y2="163" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="148" cy="162" r="2.5" fill="#4ADE80" />
        </g>

        {/* 6. Indoor Statement Plant (Swaying Botanicals) */}
        <g className="anim-plant">
          {/* Planter Pot Shadow */}
          <ellipse cx="264" cy="204" rx="14" ry="3" fill="#18181B" fillOpacity="0.08" />
          {/* Ceramic Fluted Pot */}
          <path d="M252 172 L276 172 L272 202 L256 202 Z" fill="url(#potGrad)" />
          {/* Pot Rim */}
          <rect x="250" y="169" width="28" height="4" rx="2" fill="#BDB3A7" />

          {/* Organic Monstera & Ficus Leaves */}
          <g className="anim-foliage">
            {/* Center tall stem */}
            <path d="M264 170 Q266 142 272 126" stroke="#15803D" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M272 126 Q284 130 286 142 Q278 144 272 136 Z" fill="#22C55E" />

            {/* Left curved leaf */}
            <path d="M264 170 Q254 150 242 144" stroke="#15803D" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M242 144 Q232 152 236 164 Q246 160 248 152 Z" fill="#16A34A" />

            {/* Right arching leaf */}
            <path d="M264 170 Q278 154 288 156" stroke="#15803D" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M288 156 Q298 164 294 174 Q284 172 282 164 Z" fill="#15803D" />

            {/* Top fresh baby leaf */}
            <ellipse cx="268" cy="120" rx="6" ry="11" transform="rotate(15 268 120)" fill="#4ADE80" />
          </g>
        </g>

        {/* 7. Floating Architectural Blueprint Sparks & Measurement Nodes */}
        <g className="anim-sparkles">
          {/* Measurement crosshairs */}
          <path d="M50 80 L56 80 M53 77 L53 83" stroke="#29ABE2" strokeWidth="1.5" strokeLinecap="round" className="sparkle-1" />
          <path d="M240 70 L246 70 M243 67 L243 73" stroke="#29ABE2" strokeWidth="1.5" strokeLinecap="round" className="sparkle-2" />
          <circle cx="86" cy="60" r="2.5" fill="#3BB6EA" className="sparkle-3" />
          <circle cx="218" cy="95" r="2" fill="#29ABE2" className="sparkle-4" />
        </g>
      </svg>

      <style jsx>{`
        .interior-lottie-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin: 0 auto;
        }

        .interior-lottie-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* 1. Light Cone Breathing Glow */
        .anim-light-cone {
          animation: lightBreathe 3s ease-in-out infinite;
          transform-origin: 160px 50px;
        }

        @keyframes lightBreathe {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        /* 2. Soft Lamp Sway */
        .anim-pendant-lamp {
          animation: lampGentleSway 6s ease-in-out infinite;
          transform-origin: 160px 0px;
        }

        @keyframes lampGentleSway {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1.2deg);
          }
          75% {
            transform: rotate(-1.2deg);
          }
        }

        /* 3. Botanicals Swaying in Air */
        .anim-foliage {
          animation: plantBreeze 4s ease-in-out infinite;
          transform-origin: 264px 170px;
        }

        @keyframes plantBreeze {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(2.5deg) scale(1.02);
          }
        }

        /* 4. Pillow settle micro-motion */
        .anim-pillow {
          animation: pillowFloat 3.5s ease-in-out infinite;
        }

        @keyframes pillowFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1.5px);
          }
        }

        /* 5. Floor dash animation */
        .anim-floor-dash {
          animation: floorDashMove 12s linear infinite;
        }

        @keyframes floorDashMove {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 48;
          }
        }

        /* 6. Floating Blueprint Sparkles */
        .sparkle-1 {
          animation: sparkleFade 2.4s ease-in-out infinite;
        }
        .sparkle-2 {
          animation: sparkleFade 3s ease-in-out infinite 0.6s;
        }
        .sparkle-3 {
          animation: sparkleFloat 2.8s ease-in-out infinite 0.3s;
        }
        .sparkle-4 {
          animation: sparkleFloat 3.2s ease-in-out infinite 0.9s;
        }

        @keyframes sparkleFade {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
