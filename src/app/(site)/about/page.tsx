import type { Metadata } from "next";
import AboutClient from "./about-client";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getStandardBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { getTestimonials } from "@/lib/supabase/queries";
import { aboutFaqs } from "@/data/about";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://designmynivas.com";

export const revalidate = 60;

export const metadata: Metadata = generatePageMetadata({
  title: "About Us | Benson Cheripelli | Design My Nivas",
  description:
    "Meet founder Benson Cheripelli, watch client stories and contact Design My Nivas — 70+ homes in Hyderabad, Warangal and Karimnagar. Itemized pricing.",
  path: "/about",
  keywords: [
    "Benson Cheripelli",
    "Design My Nivas founder",
    "interior design studio Hyderabad",
    "residential interior designers Telangana",
    "about Design My Nivas",
  ],
});

export default async function AboutPage() {
  const testimonials = await getTestimonials();
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aboutFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={[aboutSchema, breadcrumbSchema, faqSchema]} />
      <AboutClient testimonials={testimonials} />
    </>
  );
}
