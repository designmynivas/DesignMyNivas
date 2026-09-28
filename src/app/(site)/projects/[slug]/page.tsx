import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/supabase/queries";
import ProjectDetailClient from "./project-detail-client";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import {
  generateProjectSchema,
  generateBreadcrumbSchema,
  generateVideoSchema,
} from "@/lib/seo/schema";
import { getProjectBreadcrumbs } from "@/lib/seo/breadcrumbs";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Design My Nivas",
    };
  }

  const title = `${project.title} | Interior Design in ${project.location} | Design My Nivas`;
  const description = `${project.type} project completed by Design My Nivas in ${project.location}. ${project.description}`;

  return generatePageMetadata({
    title,
    description,
    path: `/projects/${project.slug}`,
    image: project.image,
    keywords: [
      `${project.type} ${project.location}`,
      `interior design ${project.location}`,
      `residential interior design ${project.location}`,
      "turnkey interior execution",
      "Design My Nivas projects",
    ],
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const breadcrumbs = getProjectBreadcrumbs(project.title, project.slug);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const projectSchema = generateProjectSchema(project);

  const schemas: Record<string, unknown>[] = [projectSchema, breadcrumbSchema];

  if (project.youtubeUrl) {
    schemas.push(
      generateVideoSchema({
        title: `${project.title} — Video Tour`,
        description: project.description,
        youtubeUrl: project.youtubeUrl,
        thumbnailUrl: project.image,
        uploadDate: project.created_at,
      })
    );
  }

  const related = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={schemas} />
      <ProjectDetailClient project={project} relatedProjects={related} />
    </>
  );
}
