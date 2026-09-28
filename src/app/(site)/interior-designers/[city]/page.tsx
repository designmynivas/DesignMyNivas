import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, getAllLocationSlugs } from "@/data/locations";
import LocationClient from "./location-client";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo/schema";
import { getLocationBreadcrumbs } from "@/lib/seo/breadcrumbs";

interface LocationPageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({
    city,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return {
      title: "Location Not Found | Design My Nivas",
    };
  }

  return generatePageMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/interior-designers/${location.slug}`,
    image: location.heroImage,
    keywords: [
      `interior designers ${location.city}`,
      `residential interior designers in ${location.city}`,
      `turnkey home interiors ${location.city}`,
      `modular kitchen designers ${location.city}`,
      `home interior design ${location.city}`,
    ],
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  const localBusinessSchema = generateLocalBusinessSchema(location.slug);
  const breadcrumbs = getLocationBreadcrumbs(location.city, location.slug);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(location.localFaqs);

  return (
    <>
      <JsonLd data={[localBusinessSchema, breadcrumbSchema, faqSchema]} />
      <LocationClient location={location} />
    </>
  );
}
