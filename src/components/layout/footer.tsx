"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Guides", href: "/guides" },
];

const locations = [
  { name: "Hyderabad", href: "/interior-designers/hyderabad" },
  { name: "Warangal", href: "/interior-designers/warangal" },
  { name: "Karimnagar", href: "/interior-designers/karimnagar" },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl(
    "Hello Design My Nivas, I would like to enquire about residential interior design for my home."
  );

  const contactChannels = [
    { label: "WhatsApp", href: whatsappUrl, isExternal: true },
    { label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`, isExternal: false },
    { label: siteConfig.email, href: `mailto:${siteConfig.email}`, isExternal: false },
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
                  width={88}
                  height={88}
                  className="footer-logo-img"
                  style={{
                    width: "88px",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            </Link>
            <p className="footer-description">
              Residential interiors, designed and delivered across Telangana.
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
                <li key={loc.name}>
                  <Link href={loc.href} className="footer-link">
                    {loc.name}
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
            <p className="footer-credit">
              Designed &amp; developed by{" "}
              <a
                href="https://dorabeen.com"
                target="_blank"
                rel="noopener"
                className="footer-credit-link"
              >
                <Image
                  src="/logo/Dorabeen logo.png"
                  alt=""
                  width={16}
                  height={16}
                  className="footer-credit-logo"
                />
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
          padding-top: var(--space-48);
          /* Clear the floating WhatsApp / Call buttons */
          padding-bottom: 5.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.8fr 1.1fr 1.1fr;
          gap: var(--space-32);
          padding-bottom: var(--space-32);
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
          width: 88px;
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
          margin-bottom: var(--space-16);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
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
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          vertical-align: middle;
          /* Dorabeen brand red, darkened slightly from #FF0000 to pass WCAG AA contrast on white */
          color: #e60000;
          font-weight: 700;
          text-decoration: none;
          transition: opacity var(--duration-fast);
        }

        .footer-credit-link:hover {
          opacity: 0.8;
        }

        .footer-credit-link :global(.footer-credit-logo) {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-32);
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-24) var(--space-16);
          }

          .footer-brand {
            grid-column: 1 / -1;
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
