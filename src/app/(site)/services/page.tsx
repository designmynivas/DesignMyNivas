import type { Metadata } from "next";
import ServicesClient from "./services-client";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getStandardBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { servicesData } from "@/data/services";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://designmynivas.com";

export const metadata: Metadata = generatePageMetadata({
  title: "Interior Design Services in Telangana | Design My Nivas",
  description:
    "Complete home interiors, modular kitchens, living rooms, bedrooms, wardrobes, custom furniture and false ceilings across Hyderabad, Warangal and Karimnagar.",
  path: "/services",
  keywords: [
    "interior design services Hyderabad",
    "turnkey interior execution Telangana",
    "modular kitchens Hyderabad",
    "living room interiors Warangal",
    "bedroom interior designers Karimnagar",
    "custom wardrobes Telangana",
  ],
});

export default function ServicesPage() {
  const breadcrumbs = getStandardBreadcrumbs("Services", "/services");
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const servicesCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/services#services`,
    "url": `${SITE_URL}/services`,
    "name": "Design My Nivas Residential Interior Design Services",
    "description":
      "Comprehensive residential interior design services offered across Hyderabad, Warangal, and Karimnagar.",
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": servicesData.map((svc, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `${SITE_URL}/services/${svc.slug}`,
        "name": svc.name,
      })),
    },
  };

  return (
    <>
      <JsonLd data={[servicesCatalogSchema, breadcrumbSchema]} />
      <ServicesClient />
    </>
  );
}
