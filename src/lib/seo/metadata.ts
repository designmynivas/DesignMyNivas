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

// Search engines truncate titles past ~60 chars and descriptions past ~160 chars
const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 160;
const BRAND_SUFFIX = /\s*\|\s*Design My Nivas$/i;

function fitTitle(title: string): string {
  // Add the brand when it fits; otherwise drop it (the brand is still carried by og:site_name)
  const base = title.replace(BRAND_SUFFIX, "");
  const branded = `${base} | Design My Nivas`;
  if (/design my nivas/i.test(base)) return base;
  return branded.length <= MAX_TITLE_LENGTH ? branded : base;
}

function fitDescription(description: string): string {
  if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
  const cut = description.slice(0, MAX_DESCRIPTION_LENGTH - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

export function generatePageMetadata({
  title: rawTitle,
  description: rawDescription,
  path = "",
  image = DEFAULT_OG_IMAGE,
  keywords,
  noindex = false,
  type = "website",
}: PageMetadataProps): Metadata {
  const title = fitTitle(rawTitle);
  const description = fitDescription(rawDescription);
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
    // Titles that already name the brand bypass the layout's "%s | Design My Nivas" template
    // Always absolute: the layout's "%s | Design My Nivas" template would re-add the brand or overflow the limit
    title: { absolute: title },
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
