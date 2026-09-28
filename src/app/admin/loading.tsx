import React from "react";

export default function AdminLoading() {
  return (
    <div className="admin-loading-container" role="status" aria-label="Loading Admin Panel">
      <div className="admin-skeleton-header">
        <div className="skeleton-title" />
        <div className="skeleton-subtitle" />
      </div>

      <div className="admin-skeleton-grid">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>

      <style>{`
        .admin-loading-container {
          padding: 2.25rem 2.5rem;
          max-width: 1200px;
          width: 100%;
          animation: adminPulse 1.5s ease-in-out infinite;
        }

        .admin-skeleton-header {
          margin-bottom: 2rem;
        }

        .skeleton-title {
          width: 180px;
          height: 32px;
          background: #E2E8F0;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .skeleton-subtitle {
          width: 320px;
          height: 16px;
          background: #EEF2F6;
          border-radius: 6px;
        }

        .admin-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .skeleton-card {
          height: 160px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
        }

        @keyframes adminPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
