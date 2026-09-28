import React from "react";

/**
 * Lightweight CSS-only loading indicator.
 * The previous version imported InteriorLottieAnimation (11KB client component with
 * complex SVG animations), adding unnecessary JS to every route navigation.
 * This pure-CSS version achieves the same branded feel at zero JS cost.
 */
export default function Loading() {
  return (
    <div className="site-page-loading" role="status" aria-label="Loading page">
      {/* Top slim glowing brand progress bar */}
      <div className="site-route-loader">
        <div className="route-progress-bar" />
      </div>

      {/* Lightweight CSS-only loading indicator */}
      <div className="loading-card">
        <div className="loading-spinner" aria-hidden="true">
          <div className="spinner-ring" />
        </div>
        <div className="loading-meta">
          <p className="loading-title">Crafting your dream space...</p>
          <span className="loading-subtitle">Design My Nivas</span>
        </div>
      </div>

      <style>{`
        .site-page-loading {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F7F5F0;
          padding: 40px 20px;
        }
        .site-route-loader {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 99999;
          pointer-events: none;
          background: rgba(41, 171, 226, 0.12);
          overflow: hidden;
        }
        .route-progress-bar {
          height: 100%;
          width: 50%;
          background: linear-gradient(90deg, #29ABE2 0%, #52BCE8 100%);
          box-shadow: 0 0 10px rgba(41, 171, 226, 0.7);
          animation: routeProgress 0.7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes routeProgress {
          0% { transform: translateX(-100%); width: 25%; }
          50% { transform: translateX(80%); width: 65%; }
          100% { transform: translateX(250%); width: 25%; }
        }
        .loading-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: fadeIn 0.3s ease-out;
        }
        .loading-spinner {
          width: 56px;
          height: 56px;
          position: relative;
        }
        .spinner-ring {
          width: 100%;
          height: 100%;
          border: 3px solid rgba(41, 171, 226, 0.15);
          border-top-color: #29ABE2;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-meta {
          margin-top: 18px;
        }
        .loading-title {
          font-family: var(--font-display, -apple-system, sans-serif);
          font-size: 1.05rem;
          font-weight: 600;
          color: #18181B;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .loading-subtitle {
          display: block;
          font-family: var(--font-body, -apple-system, sans-serif);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #29ABE2;
          margin-top: 4px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
