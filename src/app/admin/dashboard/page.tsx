"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Video,
  BookOpen,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { checkSupabaseHealth } from "@/lib/supabase/queries";

export default function AdminDashboardPage() {
  const [health, setHealth] = useState<{
    connected: boolean;
    database: string;
    storage: string;
    auth: string;
    projectsCount: number;
    testimonialsCount: number;
    blogsCount: number;
    latencyMs: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load Supabase health & metrics
  const loadDashboardData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const healthRes = await checkSupabaseHealth();
      setHealth(healthRes);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => {
      loadDashboardData();
    });
  }, [loadDashboardData]);

  return (
    <div className="dashboard-root">
      {/* Top Header Row */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Residential Interior Portfolio &amp; Reviews Overview · Hyderabad · Warangal · Karimnagar
          </p>
        </div>

        <div className="header-actions">
          <div
            className={`connection-pill ${
              health?.connected ? "connected" : "pending"
            }`}
          >
            {health?.connected ? (
              <>
                <CheckCircle2 size={15} />
                <span>Supabase Connected</span>
              </>
            ) : (
              <>
                <AlertCircle size={15} />
                <span>Supabase Pending</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={loadDashboardData}
            disabled={isRefreshing}
            className="btn-refresh"
            title="Refresh dashboard stats"
          >
            <RefreshCw
              size={15}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* 4 Dedicated Metric Cards (Projects, Testimonials, Blogs & Supabase Connection) */}
      <div className="metrics-grid">
        {/* Card 1: Projects Uploaded */}
        <div className="metric-card">
          <div
            className="card-top-row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <span className="metric-category">PORTFOLIO</span>
            <div className="metric-icon-disc">
              <FolderKanban size={18} className="text-brand-blue" />
            </div>
          </div>
          <div
            className="metric-value-row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "8px",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <span className="metric-number">
              {isLoading ? "—" : (health?.projectsCount ?? 0)}
            </span>
            <span className="metric-unit">Projects</span>
          </div>
          <p className="metric-desc">Turnkey residential homes across Telangana</p>
          <div
            className="metric-footer"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <Link
              href="/admin/projects"
              className="metric-link"
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <span style={{ display: "inline", whiteSpace: "nowrap" }}>Manage Projects</span>
              <ArrowRight size={14} style={{ display: "inline-block", flexShrink: 0 }} />
            </Link>
          </div>
        </div>

        {/* Card 2: Testimonials Uploaded */}
        <div className="metric-card">
          <div
            className="card-top-row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <span className="metric-category">CLIENT STORIES</span>
            <div className="metric-icon-disc">
              <Video size={18} className="text-brand-blue" />
            </div>
          </div>
          <div
            className="metric-value-row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "8px",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <span className="metric-number">
              {isLoading ? "—" : (health?.testimonialsCount ?? 0)}
            </span>
            <span className="metric-unit">Video Reviews</span>
          </div>
          <p className="metric-desc">Verified homeowner stories &amp; video reviews</p>
          <div
            className="metric-footer"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <Link
              href="/admin/testimonials"
              className="metric-link"
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <span style={{ display: "inline", whiteSpace: "nowrap" }}>Manage Testimonials</span>
              <ArrowRight size={14} style={{ display: "inline-block", flexShrink: 0 }} />
            </Link>
          </div>
        </div>

        {/* Card 3: Editorial / Blog Articles */}
        <div className="metric-card">
          <div
            className="card-top-row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <span className="metric-category">EDITORIAL</span>
            <div className="metric-icon-disc">
              <BookOpen size={18} className="text-brand-blue" />
            </div>
          </div>
          <div
            className="metric-value-row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "8px",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <span className="metric-number">
              {isLoading ? "—" : (health?.blogsCount ?? 0)}
            </span>
            <span className="metric-unit">Articles</span>
          </div>
          <p className="metric-desc">Homeowner guides &amp; turnkey insights</p>
          <div
            className="metric-footer"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <Link
              href="/admin/blogs"
              className="metric-link"
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <span style={{ display: "inline", whiteSpace: "nowrap" }}>Manage Blogs</span>
              <ArrowRight size={14} style={{ display: "inline-block", flexShrink: 0 }} />
            </Link>
          </div>
        </div>

        {/* Card 4: Supabase Connection Health */}
        <div className="metric-card">
          <div
            className="card-top-row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <span className="metric-category">CONNECTION STATUS</span>
            <div className="metric-icon-disc">
              <Activity size={18} className="text-brand-blue" />
            </div>
          </div>
          <div
            className="metric-value-row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "8px",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <span className={`metric-status-text ${health?.connected ? "status-ok" : "status-warn"}`}>
              {isLoading ? "Checking..." : health?.connected ? "Connected" : "Pending"}
            </span>
          </div>
          <p className="metric-desc">
            {health?.connected
              ? `Realtime synced · Latency ${health.latencyMs}ms`
              : "Supabase connection is being checked"}
          </p>
          <div
            className="metric-footer"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            <Link
              href="/admin/developer-check"
              className="metric-link"
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <span style={{ display: "inline", whiteSpace: "nowrap" }}>View Developer Check</span>
              <ArrowRight size={14} style={{ display: "inline-block", flexShrink: 0 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* Clean System Summary Banner */}
      <div
        className="system-summary-card"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          width: "100%",
        }}
      >
        <div
          className="summary-left"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
            maxWidth: "680px",
          }}
        >
          <div className="summary-icon-box">
            <ShieldCheck size={22} className="text-brand-blue" />
          </div>
          <div>
            <h2 className="summary-heading">System Diagnostics &amp; Developer Check</h2>
            <p className="summary-sub">
              To inspect database tables, storage bucket health, latency logs, or website runtime errors, visit the dedicated Developer Check section.
            </p>
          </div>
        </div>

        <Link
          href="/admin/developer-check"
          className="btn-open-dev-check"
          style={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <span style={{ display: "inline", whiteSpace: "nowrap" }}>Go to Developer Check Section</span>
          <ArrowRight size={15} style={{ display: "inline-block", flexShrink: 0 }} />
        </Link>
      </div>

      <style jsx>{`
        .dashboard-root {
          width: 100%;
          max-width: 1140px;
        }

        /* Top Header */
        .dashboard-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .dashboard-title {
          font-family: var(--font-display);
          font-size: 1.875rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.025em;
          margin: 0 0 0.35rem 0;
        }

        .dashboard-subtitle {
          font-size: 0.9375rem;
          color: #64748B;
          margin: 0;
          line-height: 1.4;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .connection-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.9rem;
          border-radius: 980px;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .connection-pill.connected {
          background-color: #ECFDF5;
          color: #059669;
          border: 1px solid #A7F3D0;
        }

        .connection-pill.pending {
          background-color: #EFF6FF;
          color: #29ABE2;
          border: 1px solid #BFDBFE;
        }

        .btn-refresh {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-refresh:hover {
          color: #0F172A;
          border-color: #CBD5E1;
        }

        /* 4 Dedicated Metric Cards */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 1100px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        .metric-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.65rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(41, 171, 226, 0.08);
          border-color: #BFDBFE;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .metric-category {
          font-size: 0.6875rem;
          font-weight: 750;
          letter-spacing: 0.1em;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .metric-icon-disc {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-value-row {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
          margin-bottom: 0.35rem;
        }

        .metric-number {
          font-family: var(--font-display);
          font-size: 2.35rem;
          font-weight: 750;
          color: #0F172A;
          line-height: 1;
        }

        .metric-status-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
        }

        .metric-status-text.status-ok {
          color: #059669;
        }

        .metric-status-text.status-warn {
          color: #D97706;
        }

        .metric-unit {
          font-size: 0.9375rem;
          color: #64748B;
          font-weight: 600;
        }

        .metric-desc {
          font-size: 0.8125rem;
          color: #64748B;
          margin: 0 0 1.25rem 0;
          line-height: 1.45;
        }

        .metric-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-top: 0.85rem;
          border-top: 1px solid #F1F5F9;
        }

        .metric-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8125rem;
          font-weight: 650;
          color: #29ABE2;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .metric-link:hover {
          color: #1793C9;
        }

        /* Clean System Summary Card */
        .system-summary-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          flex-wrap: wrap;
        }

        .summary-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 680px;
        }

        .summary-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .summary-heading {
          font-size: 1rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 0.2rem 0;
        }

        .summary-sub {
          font-size: 0.8125rem;
          color: #64748B;
          margin: 0;
          line-height: 1.45;
        }

        .btn-open-dev-check {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          height: 42px;
          padding: 0 1.25rem;
          background: #29ABE2;
          color: #FFFFFF;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 650;
          text-decoration: none;
          transition: background-color 0.15s ease;
          box-shadow: 0 2px 8px rgba(41, 171, 226, 0.25);
          white-space: nowrap;
        }

        .btn-open-dev-check:hover {
          background: #1FA0D6;
        }

        .text-brand-blue {
          color: #29ABE2;
        }
      `}</style>
    </div>
  );
}
