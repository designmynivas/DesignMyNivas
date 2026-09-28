import type { Metadata } from "next";
import { getCanonicalSiteUrl } from "@/lib/config/site";

export interface PageMetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string | string[];
  noindex?: boolean;
  type?: "website" | "article";
}

const DEFAULT_OG_IMAGE = "/brand/og-default.jpg";

export function generatePageMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  keywords,
  noindex = false,
  type = "website",
}: PageMetadataProps): Metadata {
  const siteUrl = getCanonicalSiteUrl();
  // Clean path to prevent trailing slash inconsistencies
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteUrl}${cleanPath === "/" ? "" : cleanPath}`;
  const ogImageUrl = image.startsWith("http") ? image : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`;

  const formattedKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords ||
      "residential interior design, turnkey interior execution, interior designers Hyderabad, modular kitchens, bedroom interiors, Design My Nivas, Warangal, Karimnagar";

  return {
    title,
    description,
    keywords: formattedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Design My Nivas",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
