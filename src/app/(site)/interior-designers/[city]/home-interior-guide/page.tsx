import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalGuideByCity, localGuides } from "@/data/guides";
import GuideDetailView from "@/components/guides/guide-detail-view";
import { generatePageMetadata } from "@/lib/seo/metadata";

interface LocalGuidePageProps {
  params: Promise<{
    city: string;
  }>;
}

/**
 * 100% Static Pre-rendering at build time for the 3 local homeowner guides.
 * Zero database calls, zero runtime hydration delay, zero performance penalty.
 */
export async function generateStaticParams() {
  return localGuides.map((guide) => ({
    city: guide.city || guide.slug,
  }));
}

export async function generateMetadata({ params }: LocalGuidePageProps): Promise<Metadata> {
  const { city } = await params;
  const guide = getLocalGuideByCity(city);

  if (!guide) {
    return {
      title: "Local Guide Not Found | Design My Nivas",
    };
  }

  return generatePageMetadata({
    title: guide.metaTitle.replace(/\s*\|\s*Design My Nivas$/i, ""),
    description: guide.metaDescription,
    path: `/interior-designers/${city}/home-interior-guide`,
    image: "/Images/main-hero.webp",
    keywords: guide.keywords,
    type: "article",
  });
}

export default async function LocalGuidePage({ params }: LocalGuidePageProps) {
  const { city } = await params;
  const guide = getLocalGuideByCity(city);

  if (!guide) {
    notFound();
  }

  return <GuideDetailView guide={guide} />;
}
