import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/config/site";
import StyledJsxRegistry from "@/lib/styled-jsx-registry";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // Not preloaded: keeps the 48KB font off the LCP critical path (text paints in the metric-matched fallback first)
  preload: false,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Interior Designers Hyderabad & Telangana | Design My Nivas",
    template: "%s | Design My Nivas",
  },
  description:
    "Turnkey home interiors, modular kitchens and bedrooms in Hyderabad, Warangal and Karimnagar by Design My Nivas. Itemized pricing, on-time handover.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Interior Designers Hyderabad & Telangana | Design My Nivas",
    description:
      "Turnkey home interiors, modular kitchens and bedrooms in Hyderabad, Warangal and Karimnagar by Design My Nivas. Itemized pricing, on-time handover.",
    url: siteConfig.url,
    siteName: "Design My Nivas",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/brand/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Design My Nivas — Residential Interior Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Designers Hyderabad & Telangana | Design My Nivas",
    description:
      "Turnkey home interiors, modular kitchens and bedrooms in Hyderabad, Warangal and Karimnagar by Design My Nivas. Itemized pricing, on-time handover.",
    images: [`${siteConfig.url}/brand/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://iaadakqgwoqvrhkinguy.supabase.co" />
        <JsonLd data={[orgSchema, websiteSchema]} />
      </head>
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <Analytics />
      </body>
    </html>
  );
}
