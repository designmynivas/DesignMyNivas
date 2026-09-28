"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blogs" },
  { label: "Guides", href: "/guides" },
  { label: "Contact", href: "/contact" },
];

const locations = [
  { name: "Hyderabad", note: "Headquarters & Primary Studio", href: "/interior-designers/hyderabad" },
  { name: "Warangal", note: "Regional Residential Projects", href: "/interior-designers/warangal" },
  { name: "Karimnagar", note: "Turnkey Residential Execution", href: "/interior-designers/karimnagar" },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl(
    "Hello Design My Nivas, I would like to enquire about residential interior design for my home."
  );

  const contactChannels = [
    { label: "WhatsApp", href: whatsappUrl, isExternal: true },
    { label: `Phone: ${siteConfig.phone}`, href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`, isExternal: false },
    { label: `Email: ${siteConfig.email}`, href: `mailto:${siteConfig.email}`, isExternal: false },
    { label: "Instagram", href: "https://instagram.com/designmynivas", isExternal: true },
    { label: "Facebook", href: "https://facebook.com/designmynivas", isExternal: true },
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container-wide">
        {/* Upper Footer Grid */}
        <div className="footer-grid">
          {/* Brand Column with Official Unaltered Logo */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link" aria-label="Design My Nivas — Home">
              <div className="footer-logo-frame">
                <Image
                  src="/logo/dmn-logo.webp"
                  alt="Design My Nivas"
                  width={120}
                  height={120}
                  className="footer-logo-img"
                  style={{
                    width: "120px",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            </Link>
            <p className="footer-description">
              Thoughtfully designed residential interiors and turnkey execution across Hyderabad, Warangal, and Karimnagar.
              Founded by Benson Cheripelli.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <h3 className="footer-col-title">Navigation</h3>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div className="footer-col">
            <h3 className="footer-col-title">Service Areas</h3>
            <ul className="footer-links">
              {locations.map((loc) => (
                <li key={loc.name} className="footer-location-item">
                  <Link href={loc.href} className="footer-location-link">
                    <span className="footer-location-city">{loc.name}</span>
                    <span className="footer-location-note">{loc.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="footer-col">
            <h3 className="footer-col-title">Connect</h3>
            <ul className="footer-links">
              {contactChannels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.isExternal ? "_blank" : undefined}
                    rel={channel.isExternal ? "noopener noreferrer" : undefined}
                    className="footer-link"
                  >
                    {channel.label}
                    {channel.isExternal && <span className="external-arrow"> {"\u2197"}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Rule & Copyright */}
        <div className="footer-bottom">
          <hr className="rule" />
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              &copy; {currentYear} Design My Nivas. Founded by Benson Cheripelli. All rights reserved.
            </p>
            <div className="footer-tagline-text">
              {siteConfig.tagline}
            </div>
            <p className="footer-credit">
              Designed &amp; developed by{" "}
              <a
                href="https://dorabeen.com"
                target="_blank"
                rel="noopener"
                className="footer-credit-link"
              >
                Dorabeen
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: var(--surface);
          color: var(--foreground);
          border-top: 1px solid var(--border);
          padding-top: var(--space-80);
          padding-bottom: var(--space-48);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.9fr 1.1fr 1.1fr;
          gap: var(--space-48);
          padding-bottom: var(--space-64);
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: var(--space-16);
        }

        .footer-logo-link {
          display: inline-block;
          text-decoration: none;
        }

        .footer-logo-frame {
          width: 175px;
        }

        .footer-description {
          font-size: var(--text-body-sm);
          line-height: 1.7;
          color: var(--foreground-muted);
          max-width: 320px;
        }

        .footer-col-title {
          font-family: var(--font-body);
          font-size: var(--text-eyebrow);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--foreground);
          margin-bottom: var(--space-24);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .footer-link {
          font-size: var(--text-body-sm);
          color: var(--foreground-muted);
          transition: color var(--duration-fast);
          text-decoration: none;
        }

        .footer-link:hover {
          color: var(--brand-blue);
        }

        .external-arrow {
          font-size: 0.85em;
          color: var(--brand-blue);
        }

        .footer-location-item {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .footer-location-link {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          text-decoration: none;
          transition: opacity 0.15s ease;
        }

        .footer-location-link:hover .footer-location-city {
          color: var(--brand-blue);
        }

        .footer-location-city {
          font-size: var(--text-body-sm);
          font-weight: 500;
          color: var(--foreground);
          transition: color var(--duration-fast);
        }

        .footer-location-note {
          font-size: var(--text-caption);
          color: var(--foreground-muted);
        }

        .footer-bottom {
          margin-top: 0;
        }

        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-24);
          gap: var(--space-16);
        }

        .footer-copy {
          font-size: var(--text-caption);
          color: var(--foreground-muted);
        }

        .footer-credit {
          font-size: var(--text-caption);
          color: var(--foreground-muted);
        }

        .footer-credit-link {
          color: var(--foreground);
          font-weight: 600;
          text-decoration: none;
          transition: color var(--duration-fast);
        }

        .footer-credit-link:hover {
          color: var(--brand-blue);
        }

        .footer-tagline-text {
          font-family: var(--font-body);
          font-size: var(--text-caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--brand-blue);
          font-weight: 600;
        }

        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-32);
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--space-32);
          }

          .footer-logo-frame {
            width: 145px;
          }

          .footer-bottom-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
