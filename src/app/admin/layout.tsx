"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Video,
  BookOpen,
  Activity,
  Globe,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { initGlobalErrorCapture } from "@/lib/error-logger";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initGlobalErrorCapture();
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
      router.push("/admin/login");
    }
  };

  // If on login page, render children directly without admin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/admin/dashboard",
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: FolderKanban,
      isActive: pathname.startsWith("/admin/projects"),
    },
    {
      label: "Video Testimonials",
      href: "/admin/testimonials",
      icon: Video,
      isActive: pathname.startsWith("/admin/testimonials"),
    },
    {
      label: "Blogs",
      href: "/admin/blogs",
      icon: BookOpen,
      isActive: pathname.startsWith("/admin/blogs"),
    },
    {
      label: "Developer Check",
      href: "/admin/developer-check",
      icon: Activity,
      isActive: pathname.startsWith("/admin/developer-check"),
    },
  ];

  return (
    <div className="admin-shell">
      {/* Mobile Sticky Top Header */}
      <header className="mobile-header">
        <div className="mobile-brand">
          <div className="mobile-logo-circle">
            <Image
              src="/logo/dmn-logo.webp"
              alt="Design My Nivas"
              width={26}
              height={26}
              priority
              className="logo-img"
            />
          </div>
          <div>
            <span className="mobile-brand-title">Design My Nivas</span>
            <span className="mobile-brand-sub">ADMIN PANEL</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-hamburger-btn"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Solid Left Sidebar (Notion-style) */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? "drawer-open" : ""}`}>
        {/* Brand Header Block */}
        <div className="sidebar-brand-header">
          <Link
            href="/admin/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="brand-link-group"
          >
            <div className="brand-avatar-box">
              <Image
                src="/logo/dmn-logo.webp"
                alt="Design My Nivas"
                width={30}
                height={30}
                priority
                className="logo-img"
              />
            </div>
            <div className="brand-text-block">
              <span className="brand-primary-name">Design My Nivas</span>
              <span className="brand-tag-name">ADMIN PANEL</span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="sidebar-close-btn"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notion-style Navigation List */}
        <nav className="sidebar-nav" aria-label="Main Admin Navigation">
          <div className="nav-group">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    height: "38px",
                    padding: "0 10px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    boxSizing: "border-box",
                  }}
                  className={`notion-nav-row ${item.isActive ? "active" : ""}`}
                >
                  <span
                    className="row-icon-cell"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      minWidth: "20px",
                      height: "20px",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} className="row-icon" />
                  </span>
                  <span
                    className="row-label"
                    style={{
                      display: "inline",
                      fontSize: "0.875rem",
                      lineHeight: "1",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="sidebar-footer" style={{ paddingBottom: "85px" }}>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              height: "36px",
              padding: "0 10px",
              borderRadius: "8px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxSizing: "border-box",
            }}
            className="notion-nav-row sub-row"
          >
            <span
              className="row-icon-cell"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                minWidth: "20px",
                height: "20px",
                flexShrink: 0,
              }}
            >
              <Globe size={17} className="row-icon" />
            </span>
            <span
              className="row-label"
              style={{
                display: "inline",
                fontSize: "0.8125rem",
                lineHeight: "1",
                whiteSpace: "nowrap",
              }}
            >
              View Live Site
            </span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              height: "36px",
              padding: "0 10px",
              borderRadius: "8px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxSizing: "border-box",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            className="notion-nav-row logout-row"
          >
            <span
              className="row-icon-cell"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                minWidth: "20px",
                height: "20px",
                flexShrink: 0,
              }}
            >
              <LogOut size={17} className="row-icon logout-icon" />
            </span>
            <span
              className="row-label"
              style={{
                display: "inline",
                fontSize: "0.8125rem",
                lineHeight: "1",
                whiteSpace: "nowrap",
              }}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="admin-main-viewport">
        <main className="admin-main-content">{children}</main>
      </div>

      <style jsx>{`
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background-color: #F8FAFC;
          font-family: var(--font-body);
          position: relative;
        }

        /* Mobile Header */
        .mobile-header {
          display: none;
        }

        @media (max-width: 1023px) {
          .mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: #FFFFFF;
            border-bottom: 1px solid #E2E8F0;
            padding: 0 1.25rem;
            z-index: 40;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          }

          .mobile-brand {
            display: flex;
            align-items: center;
            gap: 0.65rem;
          }

          .mobile-logo-circle {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F1F5F9;
            border: 1px solid #E2E8F0;
            overflow: hidden;
          }

          .mobile-brand-title {
            display: block;
            font-size: 0.9375rem;
            font-weight: 700;
            color: #0F172A;
            line-height: 1.2;
          }

          .mobile-brand-sub {
            display: block;
            font-size: 0.625rem;
            font-weight: 750;
            letter-spacing: 0.08em;
            color: #94A3B8;
          }

          .mobile-hamburger-btn {
            background: none;
            border: none;
            color: #334155;
            padding: 0.5rem;
            cursor: pointer;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-hamburger-btn:hover {
            background: #F1F5F9;
          }
        }

        /* Backdrop */
        .mobile-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(2px);
          z-index: 45;
        }

        /* Notion-style Left Sidebar */
        .admin-sidebar {
          width: 250px;
          min-width: 250px;
          background: #FFFFFF;
          border-right: 1px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
        }

        @media (max-width: 1023px) {
          .admin-sidebar {
            transform: translateX(-100%);
            transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
          }

          .admin-sidebar.drawer-open {
            transform: translateX(0);
          }
        }

        /* Sidebar Brand Header */
        .sidebar-brand-header {
          padding: 1.15rem 1.15rem 1.15rem 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #F1F5F9;
        }

        .brand-link-group {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
        }

        .brand-avatar-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          flex-shrink: 0;
        }

        :global(.logo-img) {
          object-fit: contain;
        }

        .brand-text-block {
          display: flex;
          flex-direction: column;
        }

        .brand-primary-name {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .brand-tag-name {
          font-size: 0.625rem;
          font-weight: 750;
          letter-spacing: 0.08em;
          color: #94A3B8;
          margin-top: 0.1rem;
        }

        .sidebar-close-btn {
          display: none;
          background: none;
          border: none;
          color: #94A3B8;
          padding: 0.25rem;
          cursor: pointer;
          border-radius: 6px;
        }

        .sidebar-close-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        @media (max-width: 1023px) {
          .sidebar-close-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Notion-style Navigation List */
        .sidebar-nav {
          padding: 1rem 0.75rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .nav-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        /* STRICT SINGLE-LINE HORIZONTAL NOTION ROW */
        .notion-nav-row {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-start !important;
          flex-wrap: nowrap !important;
          gap: 10px !important;
          width: 100% !important;
          height: 38px !important;
          padding: 0 10px !important;
          border-radius: 8px !important;
          text-decoration: none !important;
          background: transparent;
          border: none;
          cursor: pointer;
          box-sizing: border-box !important;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .notion-nav-row:hover {
          background-color: #F1F5F9 !important;
        }

        .notion-nav-row.active {
          background-color: #EFF6FF !important;
        }

        .row-icon-cell {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 20px !important;
          min-width: 20px !important;
          height: 20px !important;
          flex-shrink: 0 !important;
        }

        :global(.row-icon) {
          color: #64748B;
          transition: color 0.15s ease;
          display: block !important;
        }

        .notion-nav-row:hover :global(.row-icon) {
          color: #0F172A;
        }

        .notion-nav-row.active :global(.row-icon) {
          color: #29ABE2 !important;
        }

        .row-label {
          display: inline-block !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          color: #334155 !important;
          line-height: 1 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }

        .notion-nav-row:hover .row-label {
          color: #0F172A !important;
        }

        .notion-nav-row.active .row-label {
          color: #29ABE2 !important;
          font-weight: 650 !important;
        }

        /* Sidebar Footer */
        .sidebar-footer {
          padding: 0.85rem 0.75rem;
          border-top: 1px solid #F1F5F9;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .sub-row .row-label {
          font-size: 0.8125rem !important;
          color: #64748B !important;
        }

        .logout-row:hover {
          background-color: #FEF2F2 !important;
        }

        .logout-row:hover .row-label {
          color: #EF4444 !important;
        }

        .logout-row:hover :global(.logout-icon) {
          color: #EF4444 !important;
        }

        /* Main Viewport */
        .admin-main-viewport {
          flex-grow: 1;
          margin-left: 250px;
          min-height: 100vh;
          background-color: #F8FAFC;
          display: flex;
          flex-direction: column;
        }

        .admin-main-content {
          padding: 2.25rem 2.5rem;
          max-width: 1200px;
          width: 100%;
        }

        @media (max-width: 1023px) {
          .admin-main-viewport {
            margin-left: 0;
            padding-top: 60px;
          }

          .admin-main-content {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
