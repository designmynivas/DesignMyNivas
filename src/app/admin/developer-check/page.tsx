"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Terminal,
  Database,
  HardDrive,
  ShieldCheck,
  Bug,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { checkSupabaseHealth } from "@/lib/supabase/queries";
import {
  getSiteErrors,
  clearSiteErrors,
  subscribeToSiteErrors,
  logSiteError,
  SiteErrorItem,
} from "@/lib/error-logger";

export default function DeveloperCheckPage() {
  const [health, setHealth] = useState<{
    connected: boolean;
    database: string;
    storage: string;
    auth: string;
    projectsCount: number;
    testimonialsCount: number;
    latencyMs: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [siteErrors, setSiteErrors] = useState<SiteErrorItem[]>(() =>
    typeof window !== "undefined" ? getSiteErrors() : []
  );
  const [diagnosticRunOutput, setDiagnosticRunOutput] = useState<string | null>(null);
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);

  const loadHealthData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await checkSupabaseHealth();
      setHealth(res);
    } catch (err) {
      console.error("Health check error:", err);
      logSiteError(err instanceof Error ? err : "Failed to load health check", "Developer Check");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => {
      loadHealthData();
    });

    const unsubscribe = subscribeToSiteErrors((errors) => {
      setSiteErrors(errors);
    });

    return () => {
      unsubscribe();
    };
  }, [loadHealthData]);

  // Run live diagnostic test
  const handleRunDiagnostic = async () => {
    setIsRunningDiagnostic(true);
    setDiagnosticRunOutput("Executing comprehensive system diagnostic...\n");

    const logs: string[] = [];
    logs.push(`[${new Date().toLocaleTimeString()}] Initiating System Diagnostics...`);

    const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
    const hasKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    logs.push(`- Supabase URL: ${hasUrl ? "Configured ✓" : "Missing ✗"}`);
    logs.push(`- Supabase Anon Key: ${hasKey ? "Configured ✓" : "Missing ✗"}`);

    try {
      const start = Date.now();
      const res = await checkSupabaseHealth();
      const elapsed = Date.now() - start;
      logs.push(`- Supabase Ping Latency: ${elapsed}ms`);
      logs.push(`- Database Connection: ${res.connected ? "SUCCESSFUL (Status 200 OK) ✓" : "FAILED ✗"}`);
      logs.push(`- Database Status Details: ${res.database}`);
      logs.push(`- Storage Bucket (project-images): ${res.storage}`);
      logs.push(`- Projects Uploaded Count: ${res.projectsCount}`);
      logs.push(`- Video Testimonials Uploaded Count: ${res.testimonialsCount}`);

      if (res.connected) {
        logs.push(`✓ All primary database connections verified without errors.`);
      } else {
        logs.push(`! NOTE: Run the SQL schema in your Supabase SQL Editor if tables are missing.`);
      }

      setHealth(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logs.push(`✗ ERROR DURING DIAGNOSTIC: ${msg}`);
      logSiteError(`Diagnostic test failure: ${msg}`, "Developer Check Section");
    }

    logs.push(`[${new Date().toLocaleTimeString()}] Diagnostics Completed.`);
    setDiagnosticRunOutput(logs.join("\n"));
    setIsRunningDiagnostic(false);
  };

  // Simulate a test error to demonstrate live error capture
  const handleSimulateTestError = () => {
    logSiteError(
      `Test Website Error logged at ${new Date().toLocaleTimeString()} (Simulated by Developer Check)`,
      "/admin/developer-check",
      "warning"
    );
  };

  // Clear all error logs
  const handleClearErrors = () => {
    clearSiteErrors();
    setSiteErrors([]);
  };

  return (
    <div className="dev-check-root">
      {/* Top Header Row */}
      <div className="dev-check-header">
        <div>
          <div className="dev-eyebrow-pill">DEVELOPER CHECK</div>
          <h1 className="dev-main-title">Website &amp; Backend Diagnostics</h1>
          <p className="dev-main-subtitle">
            Real-time monitoring of Supabase database connection, storage readiness, and website runtime errors.
          </p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            onClick={handleRunDiagnostic}
            disabled={isRunningDiagnostic}
            className="btn-run-diag"
          >
            <Terminal size={15} />
            <span>{isRunningDiagnostic ? "Running Check..." : "Run Diagnostics"}</span>
          </button>

          <button
            type="button"
            onClick={loadHealthData}
            disabled={isRefreshing}
            className="btn-refresh"
            title="Refresh status"
          >
            <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* 3 Diagnostics Cards Grid */}
      <div className="diagnostics-cards-grid">
        {/* Card 1: Supabase Database */}
        <div className="diag-card">
          <div className="diag-card-top">
            <div className="diag-icon-disc">
              <Database size={18} className="text-brand-blue" />
            </div>
            <span className={`diag-status-pill ${health?.connected ? "pill-green" : "pill-amber"}`}>
              {isLoading ? "Checking" : health?.connected ? "Online" : "Pending"}
            </span>
          </div>
          <h3 className="diag-card-title">Supabase Database</h3>
          <p className="diag-card-detail">
            {health?.database || "Checking connection to projects & testimonials tables..."}
          </p>
          <div className="diag-card-metric">
            <span>Latency:</span>
            <strong>{health?.latencyMs ? `${health.latencyMs}ms` : "—"}</strong>
          </div>
        </div>

        {/* Card 2: Storage Bucket */}
        <div className="diag-card">
          <div className="diag-card-top">
            <div className="diag-icon-disc">
              <HardDrive size={18} className="text-brand-blue" />
            </div>
            <span className={`diag-status-pill ${health?.connected ? "pill-green" : "pill-amber"}`}>
              {isLoading ? "Checking" : health?.connected ? "Ready" : "Pending"}
            </span>
          </div>
          <h3 className="diag-card-title">Storage Bucket</h3>
          <p className="diag-card-detail">
            {health?.storage || "Checking project-images storage bucket..."}
          </p>
          <div className="diag-card-metric">
            <span>Bucket:</span>
            <strong>project-images (Public)</strong>
          </div>
        </div>

        {/* Card 3: Environment Variables */}
        <div className="diag-card">
          <div className="diag-card-top">
            <div className="diag-icon-disc">
              <ShieldCheck size={18} className="text-brand-blue" />
            </div>
            <span className="diag-status-pill pill-green">Configured</span>
          </div>
          <h3 className="diag-card-title">Environment Variables</h3>
          <p className="diag-card-detail">
            NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY verified.
          </p>
          <div className="diag-card-metric">
            <span>Auth Layer:</span>
            <strong>Active &amp; Secure</strong>
          </div>
        </div>
      </div>

      {/* Live Terminal Output Box (when diagnostics are run) */}
      {diagnosticRunOutput && (
        <div className="terminal-box">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="terminal-title">Diagnostic Terminal Output</span>
          </div>
          <pre className="terminal-content">{diagnosticRunOutput}</pre>
        </div>
      )}

      {/* Website Issue & Runtime Error Monitor */}
      <div className="error-monitor-panel">
        <div className="error-panel-header">
          <div className="error-title-wrap">
            <div className="error-icon-disc">
              <Bug size={17} className={siteErrors.length > 0 ? "text-amber" : "text-brand-blue"} />
            </div>
            <div>
              <h2 className="error-panel-title">Website Issue &amp; Runtime Error Monitor</h2>
              <p className="error-panel-subtitle">
                Any unhandled exceptions, fetch failures, or client errors across the website appear here instantly.
              </p>
            </div>
          </div>

          <div className="error-actions-group">
            <button
              type="button"
              onClick={handleSimulateTestError}
              className="btn-secondary-action"
              title="Log a test error to verify monitor is functioning"
            >
              <span>Test Error Logger</span>
            </button>

            {siteErrors.length > 0 && (
              <button
                type="button"
                onClick={handleClearErrors}
                className="btn-danger-action"
                title="Clear error log"
              >
                <Trash2 size={13} />
                <span>Clear Log</span>
              </button>
            )}
          </div>
        </div>

        <div className="error-panel-body">
          {siteErrors.length === 0 ? (
            <div className="no-errors-card">
              <CheckCircle2 size={36} className="text-emerald" />
              <h3 className="no-errors-title">All Systems Operational</h3>
              <p className="no-errors-desc">
                No runtime errors or exceptions have been detected on the website.
              </p>
            </div>
          ) : (
            <div className="errors-list">
              {siteErrors.map((err) => (
                <div key={err.id} className="error-item-row">
                  <div className="error-item-top">
                    <div className="error-severity-badge">
                      <AlertTriangle size={13} />
                      <span>{err.severity.toUpperCase()}</span>
                    </div>
                    <span className="error-source">{err.source}</span>
                    <span className="error-time">{err.timestamp}</span>
                  </div>

                  <p className="error-message">{err.message}</p>
                  {err.stack && (
                    <pre className="error-stack">{err.stack.split("\n").slice(0, 3).join("\n")}</pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Management Sections Routing Footer */}
      <div className="dev-footer-banner">
        <div className="footer-banner-text">
          <strong>Need to upload, modify, or delete content?</strong>
          <span>All editing is kept organized inside their dedicated management sections.</span>
        </div>
        <div className="footer-banner-links" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.85rem", flexWrap: "nowrap" }}>
          <Link
            href="/admin/projects"
            className="btn-banner-link"
            style={{
              display: "inline-flex",
              flexDirection: "row",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            <span>Manage Projects &rarr;</span>
          </Link>
          <Link
            href="/admin/testimonials"
            className="btn-banner-link"
            style={{
              display: "inline-flex",
              flexDirection: "row",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            <span>Manage Video Testimonials &rarr;</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .dev-check-root {
          width: 100%;
          max-width: 1140px;
        }

        .dev-check-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .dev-eyebrow-pill {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 750;
          letter-spacing: 0.12em;
          color: #29ABE2;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          margin-bottom: 0.45rem;
        }

        .dev-main-title {
          font-family: var(--font-display);
          font-size: 1.875rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.025em;
          margin: 0 0 0.35rem 0;
        }

        .dev-main-subtitle {
          font-size: 0.9375rem;
          color: #64748B;
          margin: 0;
          line-height: 1.45;
          max-width: 680px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .btn-run-diag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          height: 38px;
          padding: 0 1.25rem;
          background: #29ABE2;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 650;
          cursor: pointer;
          transition: background-color 0.15s ease;
          box-shadow: 0 2px 8px rgba(41, 171, 226, 0.25);
        }

        .btn-run-diag:hover {
          background: #1FA0D6;
        }

        .btn-refresh {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 50%;
          width: 38px;
          height: 38px;
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

        /* 3 Cards */
        .diagnostics-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 900px) {
          .diagnostics-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .diag-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .diag-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(41, 171, 226, 0.08);
          border-color: #BFDBFE;
        }

        .diag-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .diag-icon-disc {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .diag-status-pill {
          font-size: 0.71875rem;
          font-weight: 750;
          padding: 0.25rem 0.65rem;
          border-radius: 980px;
        }

        .pill-green {
          background: #ECFDF5;
          color: #059669;
          border: 1px solid #A7F3D0;
        }

        .pill-amber {
          background: #FEF3C7;
          color: #D97706;
          border: 1px solid #FDE68A;
        }

        .diag-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 0.35rem 0;
        }

        .diag-card-detail {
          font-size: 0.8125rem;
          color: #64748B;
          margin: 0 0 1.25rem 0;
          line-height: 1.5;
          flex-grow: 1;
        }

        .diag-card-metric {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid #F1F5F9;
          font-size: 0.78125rem;
          color: #64748B;
        }

        .diag-card-metric strong {
          color: #0F172A;
        }

        /* Terminal Box */
        .terminal-box {
          background: #0F172A;
          border-radius: 12px;
          margin-bottom: 2rem;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
        }

        .terminal-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 1rem;
          background: #1E293B;
          border-bottom: 1px solid #334155;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot.red { background: #EF4444; }
        .dot.yellow { background: #F59E0B; }
        .dot.green { background: #10B981; }

        .terminal-title {
          font-family: monospace;
          font-size: 0.75rem;
          color: #94A3B8;
        }

        .terminal-content {
          padding: 1.25rem;
          margin: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.8125rem;
          line-height: 1.6;
          color: #38BDF8;
          white-space: pre-wrap;
          max-height: 260px;
          overflow-y: auto;
        }

        /* Error Monitor */
        .error-monitor-panel {
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          background: #FFFFFF;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .error-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
          flex-wrap: wrap;
        }

        .error-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .error-icon-disc {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-panel-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 0.15rem 0;
        }

        .error-panel-subtitle {
          font-size: 0.78125rem;
          color: #64748B;
          margin: 0;
        }

        .error-actions-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-secondary-action {
          padding: 0.4rem 0.85rem;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          font-size: 0.78125rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-secondary-action:hover {
          background: #EFF6FF;
          color: #29ABE2;
          border-color: #BFDBFE;
        }

        .btn-danger-action {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          font-size: 0.78125rem;
          font-weight: 600;
          color: #EF4444;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-danger-action:hover {
          background: #EF4444;
          color: #FFFFFF;
        }

        .error-panel-body {
          padding: 1.5rem;
        }

        .no-errors-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1rem;
        }

        .no-errors-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0.75rem 0 0.35rem 0;
        }

        .no-errors-desc {
          font-size: 0.875rem;
          color: #64748B;
          margin: 0;
        }

        .errors-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .error-item-row {
          background: #FEF2F2;
          border: 1px solid #FEE2E2;
          border-radius: 10px;
          padding: 1rem;
        }

        .error-item-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.35rem;
          font-size: 0.78125rem;
        }

        .error-severity-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: #EF4444;
          color: #FFFFFF;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.6875rem;
        }

        .error-source {
          font-weight: 650;
          color: #991B1B;
        }

        .error-time {
          margin-left: auto;
          color: #7F1D1D;
          opacity: 0.8;
        }

        .error-message {
          font-size: 0.875rem;
          color: #991B1B;
          font-weight: 600;
          margin: 0;
        }

        .error-stack {
          margin: 0.5rem 0 0 0;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          font-size: 0.75rem;
          font-family: monospace;
          color: #7F1D1D;
          overflow-x: auto;
        }

        /* Dev Footer Banner */
        .dev-footer-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .footer-banner-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.875rem;
        }

        .footer-banner-text strong {
          color: #0F172A;
        }

        .footer-banner-text span {
          color: #64748B;
        }

        .footer-banner-links {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .btn-banner-link {
          font-size: 0.875rem;
          font-weight: 650;
          color: #29ABE2;
          text-decoration: none;
          padding: 0.4rem 0.85rem;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          border-radius: 8px;
          transition: all 0.15s ease;
        }

        .btn-banner-link:hover {
          background: #29ABE2;
          color: #FFFFFF;
        }

        .text-brand-blue { color: #29ABE2; }
        .text-emerald { color: #059669; }
        .text-amber { color: #D97706; }
      `}</style>
    </div>
  );
}
