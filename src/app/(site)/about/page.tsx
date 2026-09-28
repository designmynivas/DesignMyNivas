import type { Metadata } from "next";
import AboutClient from "./about-client";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getStandardBreadcrumbs } from "@/lib/seo/breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://designmynivas.com";

export const metadata: Metadata = generatePageMetadata({
  title: "About Design My Nivas | Benson Cheripelli & Studio Philosophy",
  description:
    "Learn about Design My Nivas, founded by Benson Cheripelli. 5+ years of practice, 70+ completed homes across Hyderabad, Warangal, and Karimnagar with 100% itemized pricing and turnkey execution.",
  path: "/about",
  keywords: [
    "Benson Cheripelli",
    "Design My Nivas founder",
    "interior design studio Hyderabad",
    "residential interior designers Telangana",
    "about Design My Nivas",
  ],
});

export default function AboutPage() {
  const breadcrumbs = getStandardBreadcrumbs("About", "/about");
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#webpage`,
    "url": `${SITE_URL}/about`,
    "name": "About Design My Nivas & Founder Benson Cheripelli",
    "description":
      "Learn about Design My Nivas, founded by Benson Cheripelli. 5+ years of practice, 70+ completed homes across Hyderabad, Warangal, and Karimnagar.",
    "mainEntity": {
      "@type": "Person",
      "@id": `${SITE_URL}/about#benson-cheripelli`,
      "name": "Benson Cheripelli",
      "jobTitle": "Founder & Principal Interior Designer",
      "worksFor": {
        "@type": "Organization",
        "name": "Design My Nivas",
      },
      "description":
        "Founder and creative head of Design My Nivas, leading turnkey residential interior design across Telangana with 5+ years of practice and 70+ completed homes.",
    },
  };

  return (
    <>
      <JsonLd data={[aboutSchema, breadcrumbSchema]} />
      <AboutClient />
    </>
  );
}
