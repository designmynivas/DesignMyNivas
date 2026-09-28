import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/data/services";
import ServiceDetailClient from "./service-detail-client";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo/schema";
import { getServiceBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { SERVICE_KEYWORD_CLUSTERS } from "@/lib/seo/keywords";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Design My Nivas",
    };
  }

  const cluster = SERVICE_KEYWORD_CLUSTERS[slug];
  const title = `${service.name} in Hyderabad`;
  const description = `${service.shortDescription} Design My Nivas offers bespoke ${service.name.toLowerCase()} with 100% itemized BOQ, IS:710 BWP marine woodwork, and turnkey site execution in Telangana.`;

  return generatePageMetadata({
    title,
    description,
    path: `/services/${service.slug}`,
    image: service.image,
    keywords: cluster ? [cluster.primaryKeyword, ...cluster.secondaryKeywords] : [
      `${service.name} Hyderabad`,
      `${service.name} Warangal`,
      `${service.name} Karimnagar`,
      "residential interior design",
      "turnkey interior execution",
    ],
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = getServiceBreadcrumbs(service.name, service.slug);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const serviceSchema = generateServiceSchema(service);
  const faqSchema = generateFAQSchema(service.faqs);

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema, faqSchema]} />
      <ServiceDetailClient service={service} allServices={servicesData} />
    </>
  );
}
