"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/queries";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (!isConfigured) {
        // If Supabase keys are not configured yet, permit local developer access to CMS
        router.push("/admin/dashboard");
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid credentials.");
        setIsLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-viewport">
      {/* Return to Public Website */}
      <div className="top-nav-bar">
        <Link href="/" className="back-link">
          <ArrowLeft size={15} />
          <span>Back to Site</span>
        </Link>
      </div>

      <div className="login-content-wrapper">
        {/* Brand Header with Official Logo */}
        <div className="brand-header-group">
          <div className="logo-card-shadow">
            <Image
              src="/logo/dmn-logo.webp"
              alt="Design My Nivas"
              width={54}
              height={54}
              priority
              className="brand-logo-img"
            />
          </div>

          <h1 className="brand-heading">
            Design My <span className="brand-accent">Nivas</span>
          </h1>

          <div className="admin-portal-label">
            <span className="dash-line" />
            <span className="portal-text">ADMIN PORTAL</span>
            <span className="dash-line" />
          </div>
        </div>

        {/* Floating White Card in Light and Blue Theme */}
        <div className="secure-access-card">
          <div className="card-lock-badge">
            <Lock size={20} className="lock-icon" />
          </div>

          <h2 className="card-title">Secure Access</h2>
          <p className="card-subtitle">Verify your credentials to manage workspace</p>

          {!isConfigured && (
            <div className="notice-pill">
              <AlertCircle size={14} className="notice-icon" />
              <span>Developer Mode: Click Authorize to Enter</span>
            </div>
          )}

          {errorMsg && (
            <div className="error-pill" role="alert">
              <AlertCircle size={14} className="error-icon" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="access-form">
            <div className="form-field-group">
              <label htmlFor="admin-email" className="field-label">
                EMAIL
              </label>
              <div className="field-input-wrapper">
                <input
                  id="admin-email"
                  type="email"
                  required={isConfigured}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@designmynivas.com"
                  className="field-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-field-group">
              <label htmlFor="admin-password" className="field-label">
                PASSWORD
              </label>
              <div className="field-input-wrapper">
                <input
                  id="admin-password"
                  type="password"
                  required={isConfigured}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="field-input"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-authorize"
            >
              {isLoading ? (
                <span className="btn-label-row">
                  <Loader2 size={16} className="animate-spin" />
                  <span>AUTHORIZING...</span>
                </span>
              ) : (
                <span className="btn-label-row">
                  <span>AUTHORIZE</span>
                  <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Security Protocol Footer */}
        <footer className="login-security-footer">
          <span className="protocol-title">DESIGN MY NIVAS · SECURITY PROTOCOL</span>
          <span className="protocol-sub">ENCRYPTED CONNECTION · AUTH V1.2</span>
        </footer>
      </div>

      <style jsx>{`
        .login-viewport {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          background-color: #F8FAFC;
          background-image: radial-gradient(ellipse 80% 60% at 50% 15%, rgba(41, 171, 226, 0.08) 0%, transparent 70%);
          font-family: var(--font-body);
          position: relative;
        }

        .top-nav-bar {
          position: absolute;
          top: 1.75rem;
          left: 2rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #64748B;
          font-size: 0.8125rem;
          font-weight: 550;
          text-decoration: none;
          padding: 0.45rem 0.85rem;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 980px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: all 0.15s ease;
        }

        .back-link:hover {
          color: #0F172A;
          border-color: #CBD5E1;
          transform: translateX(-2px);
        }

        .login-content-wrapper {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Brand Header */
        .brand-header-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-card-shadow {
          width: 78px;
          height: 78px;
          background: #FFFFFF;
          border-radius: 22px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 10px 28px rgba(41, 171, 226, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          overflow: hidden;
        }

        :global(.brand-logo-img) {
          object-fit: contain;
        }

        .brand-heading {
          font-family: var(--font-display);
          font-size: 2.15rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.025em;
          margin: 0 0 0.5rem 0;
          line-height: 1.15;
        }

        .brand-accent {
          color: #29ABE2;
        }

        .admin-portal-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .dash-line {
          width: 24px;
          height: 1px;
          background: #CBD5E1;
        }

        .portal-text {
          font-size: 0.6875rem;
          font-weight: 750;
          letter-spacing: 0.16em;
          color: #29ABE2;
          text-transform: uppercase;
        }

        /* Secure Access Card (Light & Blue) */
        .secure-access-card {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 24px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .card-lock-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.1rem;
        }

        :global(.lock-icon) {
          color: #29ABE2;
        }

        .card-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 750;
          color: #0F172A;
          margin: 0 0 0.35rem 0;
          letter-spacing: -0.015em;
        }

        .card-subtitle {
          font-size: 0.84375rem;
          color: #64748B;
          margin: 0 0 1.5rem 0;
          line-height: 1.4;
        }

        .notice-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          color: #29ABE2;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          margin-bottom: 1.25rem;
          width: 100%;
        }

        :global(.notice-icon) {
          color: #29ABE2;
          flex-shrink: 0;
        }

        .error-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #FEF2F2;
          border: 1px solid #FEE2E2;
          color: #DC2626;
          font-size: 0.75rem;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          margin-bottom: 1.25rem;
          width: 100%;
        }

        :global(.error-icon) {
          color: #DC2626;
          flex-shrink: 0;
        }

        .access-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          text-align: left;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-size: 0.6875rem;
          font-weight: 750;
          letter-spacing: 0.08em;
          color: #64748B;
          text-transform: uppercase;
        }

        .field-input-wrapper {
          position: relative;
        }

        .field-input {
          width: 100%;
          height: 48px;
          padding: 0 1rem;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          font-size: 0.9375rem;
          color: #0F172A;
          transition: all 0.15s ease;
        }

        .field-input:focus {
          outline: none;
          background: #FFFFFF;
          border-color: #29ABE2;
          box-shadow: 0 0 0 3px rgba(41, 171, 226, 0.15);
        }

        /* Authorize Button (Brand Blue) */
        .btn-authorize {
          margin-top: 0.65rem;
          width: 100%;
          height: 48px;
          background: #29ABE2;
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s ease;
          box-shadow: 0 4px 14px rgba(41, 171, 226, 0.35);
        }

        .btn-authorize:hover:not(:disabled) {
          background: #1FA0D6;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(41, 171, 226, 0.45);
        }

        .btn-authorize:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-label-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Security Footer */
        .login-security-footer {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .protocol-title {
          font-size: 0.65625rem;
          font-weight: 750;
          letter-spacing: 0.14em;
          color: #94A3B8;
        }

        .protocol-sub {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #CBD5E1;
        }

        @media (max-width: 480px) {
          .secure-access-card {
            padding: 2rem 1.5rem;
            border-radius: 20px;
          }

          .top-nav-bar {
            top: 1rem;
            left: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
