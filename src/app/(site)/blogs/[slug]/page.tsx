import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./blog-detail-client";
import { getBlogs, getBlogBySlug } from "@/lib/supabase/queries";
import { getBlogPreview } from "@/types/blog";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";
import { getBlogBreadcrumbs } from "@/lib/seo/breadcrumbs";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  const blogs = await getBlogs(true);
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Design My Nivas",
    };
  }

  const excerpt =
    getBlogPreview(blog.content, 160) ||
    "Modern residential interior design and execution guide from Design My Nivas.";

  return generatePageMetadata({
    title: `${blog.title} | Design My Nivas`,
    description: excerpt,
    path: `/blogs/${blog.slug}`,
    image: blog.cover_image || "/Images/main-hero.webp",
    type: "article",
    keywords: [
      blog.title,
      "interior design guide",
      "residential interiors Hyderabad",
      "modular kitchen finishes",
      "Design My Nivas editorial",
    ],
  });
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const [blog, allBlogs] = await Promise.all([
    getBlogBySlug(slug),
    getBlogs(false),
  ]);

  if (!blog) {
    notFound();
  }

  const breadcrumbs = getBlogBreadcrumbs(blog.title, blog.slug);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const articleSchema = generateArticleSchema(blog);

  // Filter out current article to find up to 3 other real blogs
  const threeNewBlogs = allBlogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <BlogDetailClient blog={blog} relatedBlogs={threeNewBlogs} />
    </>
  );
}
