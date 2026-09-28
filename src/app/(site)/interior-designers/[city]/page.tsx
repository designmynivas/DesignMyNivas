import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, getAllLocationSlugs } from "@/data/locations";
import LocationClient from "./location-client";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import {
  generateCityServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo/schema";
import { getLocationBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { getProjects } from "@/lib/supabase/queries";

export const revalidate = 60;

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

  // Only real projects recorded in this city; the section is hidden when there are none
  const cityProjects = (await getProjects()).filter((project) =>
    project.location.toLowerCase().includes(location.city.toLowerCase())
  );
  const cityServiceSchema = generateCityServiceSchema(location);
  const breadcrumbs = getLocationBreadcrumbs(location.city, location.slug);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(location.localFaqs);

  return (
    <>
      <JsonLd data={[cityServiceSchema, breadcrumbSchema, faqSchema]} />
      <LocationClient location={location} projects={cityProjects} />
    </>
  );
}
