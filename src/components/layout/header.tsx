"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useBookingModal } from "@/context/booking-modal-context";
import { getWhatsAppUrl } from "@/lib/config/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleOpenConsultation = () => {
    closeMenu();
    openBookingModal({ source: "navigation" });
  };

  const whatsappUrl = getWhatsAppUrl(
    "Hello Design My Nivas, I would like to book a consultation for my home."
  );

  return (
    <>
      <header
        className={`site-header ${scrolled ? "header-scrolled" : ""} ${
          menuOpen ? "header-menu-open" : ""
        }`}
        role="banner"
      >
        <div className="header-container">
          {/* Official Brand Logo - Small, Crisp & Clean */}
          <Link href="/" className="nav-logo-link" aria-label="Design My Nivas — Home">
            <div className="nav-logo-box">
              <Image
                src="/logo/dmn-logo.webp"
                alt="Design My Nivas"
                width={38}
                height={38}
                priority
                className="nav-logo-img"
              />
              <span className="nav-brand-title">Design My Nivas</span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="nav-item" prefetch={true}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Primary Navigation CTA with Right Arrow -> Top-Right on Hover */}
          <div className="nav-cta-wrapper">
            <button
              type="button"
              onClick={handleOpenConsultation}
              className="btn btn-primary nav-cta-btn"
            >
              <span>Book a Consultation</span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`hamburger-icon ${menuOpen ? "is-open" : ""}`}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop (outside <header> to avoid backdrop-filter clipping) */}
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Floating Dropdown Panel with Round Corners Matching Navbar */}
      <div
        className={`mobile-nav-panel ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="mobile-panel-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="mobile-panel-link"
              prefetch={true}
              onClick={closeMenu}
            >
              <span>{link.label}</span>
              <span className="mobile-link-chevron" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </Link>
          ))}
        </nav>

        <div className="mobile-panel-divider" aria-hidden="true" />

        <div className="mobile-panel-ctas">
          <button
            type="button"
            className="btn btn-primary mobile-panel-consult-btn"
            onClick={handleOpenConsultation}
          >
            <span>Book Consultation</span>
            <span className="btn-arrow" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mobile-panel-wa-btn"
            onClick={closeMenu}
          >
            <span>Direct Inquiry</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        /* Separate Floating Rectangle Navbar with margins on top, left & right */
        .site-header {
          position: fixed;
          top: 18px;
          left: 24px;
          right: 24px;
          max-width: 1360px;
          margin: 0 auto;
          z-index: 120; /* High z-index so navbar remains above backdrop and never gets blurred */
          height: 64px;
          background-color: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(24, 24, 24, 0.08);
          border-radius: 16px; /* Clean rectangular corners */
          box-shadow: 0 10px 32px rgba(24, 24, 24, 0.06);
          transition: top var(--duration-fast) var(--ease-apple),
                      background-color var(--duration-fast) var(--ease-apple),
                      box-shadow var(--duration-fast) var(--ease-apple),
                      border-color var(--duration-fast) var(--ease-apple);
        }

        .header-scrolled {
          top: 12px;
          background-color: rgba(255, 255, 255, 0.96);
          border-color: rgba(24, 24, 24, 0.12);
          box-shadow: 0 16px 40px rgba(24, 24, 24, 0.10);
        }

        /* Solid, crystal-clear navbar when menu is open — no blur, cross button fully visible */
        .header-menu-open {
          background-color: #FFFFFF !important;
          border-color: rgba(24, 24, 24, 0.14) !important;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08) !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        .header-container {
          width: 100%;
          height: 100%;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Brand Logo: Small & Crisp */
        .nav-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-logo-box {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        :global(.nav-logo-img) {
          width: 38px !important;
          height: 38px !important;
          object-fit: contain;
          mix-blend-mode: multiply;
          display: block;
        }

        .nav-brand-title {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--foreground);
          transition: color var(--duration-fast);
        }

        .nav-logo-link:hover .nav-brand-title {
          color: var(--brand-blue);
        }

        /* Center Nav Items */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.625rem;
        }

        .nav-item {
          font-family: var(--font-body);
          font-size: var(--text-body-sm);
          font-weight: 500;
          color: var(--foreground);
          letter-spacing: -0.01em;
          text-decoration: none;
          padding: 0.25rem 0;
          transition: color var(--duration-fast);
          position: relative;
        }

        .nav-item:hover {
          color: var(--brand-blue);
        }

        .nav-cta-wrapper {
          display: flex;
          align-items: center;
        }

        .nav-cta-btn {
          height: 42px;
          padding: 0 1.45rem;
          font-size: var(--text-body-sm);
          font-weight: 600;
          color: #FFFFFF !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 8px 22px -4px rgba(41, 171, 226, 0.52), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-cta-btn:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          border-color: #1FA0D6 !important;
          transform: translateY(-1px);
          box-shadow: 0 12px 28px -4px rgba(41, 171, 226, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6) !important;
        }

        /* Dynamic Arrow Interaction: Points right, rotates to top-right on hover */
        .btn-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-cta-btn:hover .btn-arrow {
          transform: translate(2px, -2px) rotate(-45deg);
        }

        /* Mobile Hamburger */
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          position: relative;
          z-index: 120;
        }

        .hamburger-icon {
          display: flex;
          flex-direction: column;
          gap: 7px;
          width: 24px;
        }

        .hamburger-icon span {
          display: block;
          height: 2px;
          background-color: var(--foreground);
          border-radius: 2px;
          transition: transform var(--duration-base) var(--ease-apple),
                      opacity var(--duration-fast);
          transform-origin: center;
        }

        .hamburger-icon.is-open span:first-child {
          transform: translateY(4.5px) rotate(45deg);
        }

        .hamburger-icon.is-open span:last-child {
          transform: translateY(-4.5px) rotate(-45deg);
        }

        /* Mobile Backdrop Overlay */
        .mobile-menu-backdrop {
          position: fixed;
          inset: 0;
          z-index: 104;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: menuFadeIn 0.2s ease-out;
        }

        /* Mobile Dropdown Panel */
        .mobile-nav-panel {
          display: none;
        }

        @media (max-width: 1200px) {
          .desktop-nav {
            gap: 1rem;
          }
          .nav-item {
            font-size: 0.8125rem;
          }
        }

        @media (max-width: 1040px) {
          .site-header {
            top: 12px;
            left: 12px;
            right: 12px;
            height: 58px;
            border-radius: 14px;
          }

          .desktop-nav,
          .nav-cta-wrapper {
            display: none;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .header-container {
            padding: 0 1rem;
          }

          :global(.nav-logo-img) {
            width: 34px !important;
            height: 34px !important;
          }

          .nav-brand-title {
            font-size: 0.9375rem;
          }

          /* Mobile Floating Dropdown Panel with Round Corners matching Navbar */
          .mobile-nav-panel {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 76px;
            left: 12px;
            right: 12px;
            max-width: 1360px;
            margin: 0 auto;
            z-index: 125;
            background-color: rgba(255, 255, 255, 0.97);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(24, 24, 24, 0.08);
            border-radius: 16px; /* Round corners matching navbar */
            box-shadow: 0 20px 48px -8px rgba(0, 0, 0, 0.16), 0 4px 16px rgba(0, 0, 0, 0.06);
            padding: 1rem 0.875rem 1.25rem 0.875rem;
            max-height: calc(100dvh - 90px);
            overflow-y: auto;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px) scale(0.98);
            transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                        visibility 0.22s;
            pointer-events: none;
          }

          .mobile-nav-panel.is-open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
            pointer-events: auto;
          }

          .mobile-panel-links {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          :global(.mobile-panel-link) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 0.875rem;
            font-family: var(--font-body);
            font-size: 1.0625rem;
            font-weight: 550;
            color: var(--foreground) !important;
            text-decoration: none;
            border-radius: 10px;
            transition: background-color 0.15s, color 0.15s;
          }

          :global(.mobile-panel-link:hover),
          :global(.mobile-panel-link:active) {
            background-color: rgba(41, 171, 226, 0.08);
            color: var(--brand-blue) !important;
          }

          .mobile-link-chevron {
            color: rgba(24, 24, 24, 0.35);
            display: inline-flex;
            align-items: center;
            transition: transform 0.15s, color 0.15s;
          }

          :global(.mobile-panel-link:hover .mobile-link-chevron) {
            color: var(--brand-blue);
            transform: translateX(3px);
          }

          .mobile-panel-divider {
            height: 1px;
            background-color: rgba(24, 24, 24, 0.07);
            margin: 0.75rem 0.25rem 0.875rem 0.25rem;
          }

          .mobile-panel-ctas {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            width: 100%;
          }

          :global(.mobile-panel-consult-btn),
          :global(.mobile-panel-wa-btn) {
            flex: 1 1 0px;
            min-width: 0;
            height: 44px;
            font-size: 0.8125rem;
            font-weight: 600;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            white-space: nowrap;
            padding: 0 0.5rem;
            line-height: 1;
          }

          :global(.mobile-panel-consult-btn) {
            background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
            border: 1px solid #29ABE2 !important;
            color: #FFFFFF !important;
            box-shadow: 0 6px 18px -2px rgba(41, 171, 226, 0.45) !important;
            gap: 0.35rem;
          }

          :global(.mobile-panel-wa-btn) {
            background: #FFFFFF !important;
            border: 1.5px solid #D8D5CF !important;
            color: var(--foreground) !important;
          }

          :global(.mobile-panel-wa-btn:hover) {
            border-color: #29ABE2 !important;
            color: #29ABE2 !important;
          }
        }

        @keyframes menuFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
