import type { Metadata } from "next";
import ContactClient from "./contact-client";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getStandardBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { siteConfig } from "@/lib/config/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://designmynivas.com";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us | Book a Consultation | Design My Nivas",
  description:
    "Call, WhatsApp or email Benson Cheripelli and the Design My Nivas team, or book an interior consultation in Hyderabad, Warangal and Karimnagar.",
  path: "/contact",
  keywords: [
    "contact interior designer Hyderabad",
    "interior design consultation Hyderabad",
    "book interior designer Warangal",
    "interior designers Karimnagar contact",
    "Design My Nivas phone number",
  ],
});

export default function ContactPage() {
  const breadcrumbs = getStandardBreadcrumbs("Contact", "/contact");
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#webpage`,
    "url": `${SITE_URL}/contact`,
    "name": "Contact Design My Nivas",
    "description":
      "Book a residential interior consultation with Design My Nivas across Hyderabad, Warangal, and Karimnagar.",
    "mainEntity": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Design My Nivas",
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "url": SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={[contactSchema, breadcrumbSchema]} />
      <ContactClient />
    </>
  );
}
