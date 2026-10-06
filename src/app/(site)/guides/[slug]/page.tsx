import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllGeneralGuideSlugs, getGuideBySlug } from "@/data/guides";
import GuideDetailView from "@/components/guides/guide-detail-view";
import { getProjects } from "@/lib/supabase/queries";

// Related-project links follow the live project list
export const revalidate = 60;
import { generatePageMetadata } from "@/lib/seo/metadata";

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * 100% Static Pre-rendering at build time for all 47 general guides.
 * Zero database calls, zero runtime hydration delay, zero performance penalty.
 */
export async function generateStaticParams() {
  return getAllGeneralGuideSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Guide Not Found | Design My Nivas",
    };
  }

  return generatePageMetadata({
    title: guide.metaTitle.replace(/\s*\|\s*Design My Nivas$/i, ""),
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    image: "/Images/main-hero.webp",
    keywords: guide.keywords,
    type: "article",
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <GuideDetailView guide={guide} projects={await getProjects()} />;
}
