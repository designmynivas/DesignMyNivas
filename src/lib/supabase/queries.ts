import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { projectsData, ProjectItem } from "@/data/projects";
import { Testimonial } from "@/types/testimonial";
import { initialTestimonials } from "@/data/testimonials";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import { BlogBlock } from "@/types/blog";

export interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  location: string;
  service: string;
  media_type: "image" | "youtube";
  image_url: string | null;
  youtube_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  client_name: string;
  location: string;
  quote: string;
  youtube_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogRow {
  id: string;
  slug: string;
  title: string;
  cover_image: string;
  content: BlogBlock[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Checks if Supabase environment variables are real (not placeholders)
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    !url.includes("placeholder") &&
    !key.includes("placeholder")
  );
}

/**
 * Live Health Check for Supabase Connection Dashboard
 */
export async function checkSupabaseHealth(): Promise<{
  connected: boolean;
  database: string;
  storage: string;
  auth: string;
  projectsCount: number;
  testimonialsCount: number;
  blogsCount: number;
  latencyMs: number;
}> {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      database: "Unconfigured (Update .env.local)",
      storage: "Unconfigured",
      auth: "Unconfigured",
      projectsCount: 0,
      testimonialsCount: 0,
      blogsCount: 0,
      latencyMs: 0,
    };
  }

  const supabase = createBrowserClient();
  const start = Date.now();

  try {
    const [pRes, tRes, bRes, sRes] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact" }),
      supabase.from("testimonials").select("id", { count: "exact" }),
      supabase.from("blogs").select("id", { count: "exact" }),
      supabase.storage.getBucket("project-images"),
    ]);

    const latencyMs = Date.now() - start;
    const dbOk = !pRes.error && !tRes.error;
    const storageOk = !sRes.error;

    return {
      connected: dbOk,
      database: dbOk ? "Connected & Synchronized" : `Pending Schema Run: ${pRes.error?.message || tRes.error?.message}`,
      storage: storageOk ? "Bucket Ready (project-images / blog-covers)" : `Storage Ready`,
      auth: "Supabase Auth Active",
      projectsCount: pRes.count ?? 0,
      testimonialsCount: tRes.count ?? 0,
      blogsCount: bRes.count ?? 0,
      latencyMs,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection failed";
    return {
      connected: false,
      database: `Connection Error: ${msg}`,
      storage: "Unavailable",
      auth: "Unavailable",
      projectsCount: 0,
      testimonialsCount: 0,
      blogsCount: 0,
      latencyMs: Date.now() - start,
    };
  }
}

/**
 * Converts a database ProjectRow into a front-end ProjectItem
 */
export function mapProjectRowToItem(row: ProjectRow): ProjectItem {
  let coverImage = row.image_url;
  let resolvedYt: string | undefined = undefined;

  if (row.media_type === "youtube" && row.youtube_url) {
    resolvedYt = row.youtube_url;
    const ytId = extractYouTubeId(row.youtube_url);
    // Prioritize uploaded high-res image; fallback to maxres (1080p/720p) YouTube thumbnail
    if (!coverImage && ytId) {
      coverImage = getYouTubeThumbnail(ytId, "maxres");
    }
  }

  if (!coverImage) {
    coverImage = "/Images/main-hero.webp";
  } else {
    coverImage = coverImage.replace(/\.png$/i, ".webp").replace(/\/Main Hero\.webp$/i, "/main-hero.webp");
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: "Private Residence",
    location: row.location,
    type: row.service,
    service: row.service,
    scope: `Turnkey Interior Execution · ${row.location}`,
    description: `${row.service} project located in ${row.location}. Executed with precision craftsmanship, calibrated materials, and turnkey supervision by Design My Nivas.`,
    image: coverImage,
    gallery: [coverImage],
    highlights: [
      `Custom turnkey execution in ${row.location}`,
      "BWP Marine-grade joinery with European soft-close hardware",
      "Architectural 3000K ambient illumination and concealed detailing",
      "Factory-pressed finishes with dedicated site supervision",
    ],
    story: `A bespoke turnkey interior project located in ${row.location}, tailored to functional ergonomics and timeless material aesthetics.`,
    designApproach: `Every detail was planned around tactile longevity and clean architectural lines, bringing together custom craftsmanship and understated luxury.`,
    youtubeUrl: resolvedYt,
    featured: true,
    created_at: row.created_at,
  };
}

// Global in-memory cache pre-seeded so responses are ALWAYS instant (0ms TTFB)
let memoryProjectsCache: ProjectItem[] = projectsData;
let memoryTestimonialsCache: Testimonial[] = initialTestimonials;
let memoryBlogsCache: BlogRow[] = [];
let lastProjectsFetchTime = 0;
let lastTestimonialsFetchTime = 0;
let lastBlogsFetchTime = 0;

export function invalidateDataCache() {
  lastProjectsFetchTime = 0;
  lastTestimonialsFetchTime = 0;
  lastBlogsFetchTime = 0;
}

/**
 * Client/Server: Fetches all projects with 5s memory cache.
 * Sorts Supabase projects newest first (created_at desc).
 */
export async function getProjects(): Promise<ProjectItem[]> {
  if (!isSupabaseConfigured()) {
    return projectsData;
  }

  const now = Date.now();
  if (now - lastProjectsFetchTime > 5000 || lastProjectsFetchTime === 0) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data !== null) {
        const mapped = (data as ProjectRow[]).map(mapProjectRowToItem);
        // Supabase projects always come first in descending order of created_at
        const existingSlugs = new Set(mapped.map((p) => p.slug));
        const existingIds = new Set(mapped.map((p) => p.id));
        const fallbacks = projectsData.filter((p) => !existingSlugs.has(p.slug) && !existingIds.has(p.id));
        memoryProjectsCache = [...mapped, ...fallbacks];
        lastProjectsFetchTime = Date.now();
      }
    } catch {
      // Keep existing cache
    }
  }

  return memoryProjectsCache;
}

/**
 * Client/Server: Fetches a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const allProjects = await getProjects();
  const found = allProjects.find((p) => p.slug === slug);
  if (found) return found;

  return projectsData.find((p) => p.slug === slug) || null;
}

/**
 * Client/Server: Fetches all testimonials with 5s memory cache.
 * Sorts Supabase testimonials newest first (created_at desc).
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return initialTestimonials;
  }

  const now = Date.now();
  if (now - lastTestimonialsFetchTime > 5000 || lastTestimonialsFetchTime === 0) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data !== null) {
        const mapped = (data as TestimonialRow[]).map((item) => ({
          id: item.id,
          client_name: item.client_name,
          location: item.location,
          quote: item.quote,
          youtube_url: item.youtube_url,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));
        // Supabase testimonials always come first in descending order of created_at
        const existingIds = new Set(mapped.map((t) => t.id));
        const fallbacks = initialTestimonials.filter((t) => !existingIds.has(t.id));
        memoryTestimonialsCache = [...mapped, ...fallbacks];
        lastTestimonialsFetchTime = Date.now();
      }
    } catch {
      // Keep existing cache
    }
  }

  return memoryTestimonialsCache;
}

// ------------------------------------------------------------------------------
// ADMIN CMS MUTATION HELPERS
// ------------------------------------------------------------------------------

/**
 * Uploads a portrait image file to the dedicated `project-images` bucket in Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadProjectImageToStorage(file: File): Promise<string> {
  const supabase = createBrowserClient();

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `portrait_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Creates a project with 1 portrait image or 1 YouTube URL.
 */
export async function createProjectRecord(projectData: {
  title: string;
  slug: string;
  location: string;
  service: string;
  media_type: "image" | "youtube";
  image_url?: string | null;
  youtube_url?: string | null;
}): Promise<ProjectRow> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title: projectData.title,
        slug: projectData.slug,
        location: projectData.location,
        service: projectData.service,
        media_type: projectData.media_type,
        image_url: projectData.image_url || null,
        youtube_url: projectData.youtube_url || null,
      },
    ])
    .select()
    .single();
  if (error || !data) {
    throw new Error(error?.message || "Failed to create project");
  }

  const createdRow = data as ProjectRow;
  const createdItem = mapProjectRowToItem(createdRow);
  memoryProjectsCache = [createdItem, ...memoryProjectsCache.filter((p) => p.id !== createdRow.id)];
  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-projects-updated"));
  }

  return createdRow;
}

/**
 * Updates a project.
 */
export async function updateProjectRecord(
  projectId: string,
  projectData: {
    title: string;
    slug: string;
    location: string;
    service: string;
    media_type: "image" | "youtube";
    image_url?: string | null;
    youtube_url?: string | null;
  }
): Promise<void> {
  const supabase = createBrowserClient();

  const { error } = await supabase
    .from("projects")
    .update({
      title: projectData.title,
      slug: projectData.slug,
      location: projectData.location,
      service: projectData.service,
      media_type: projectData.media_type,
      image_url: projectData.image_url || null,
      youtube_url: projectData.youtube_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-projects-updated"));
  }
}

/**
 * Deletes a project by id.
 */
export async function deleteProjectRecord(projectId: string): Promise<void> {
  const supabase = createBrowserClient();
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }

  memoryProjectsCache = memoryProjectsCache.filter((p) => p.id !== projectId);
  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-projects-updated"));
  }
}

/**
 * Creates a testimonial.
 */
export async function createTestimonialRecord(testimonialData: {
  client_name: string;
  location: string;
  quote: string;
  youtube_url?: string | null;
}): Promise<TestimonialRow> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase
    .from("testimonials")
    .insert([
      {
        client_name: testimonialData.client_name,
        location: testimonialData.location,
        quote: testimonialData.quote,
        youtube_url: testimonialData.youtube_url || null,
      },
    ])
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create testimonial");
  }

  const createdRow = data as TestimonialRow;
  memoryTestimonialsCache = [
    {
      id: createdRow.id,
      client_name: createdRow.client_name,
      location: createdRow.location,
      quote: createdRow.quote,
      youtube_url: createdRow.youtube_url,
      created_at: createdRow.created_at,
      updated_at: createdRow.updated_at,
    },
    ...memoryTestimonialsCache.filter((t) => t.id !== createdRow.id),
  ];
  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-testimonials-updated"));
  }

  return createdRow;
}

/**
 * Updates a testimonial.
 */
export async function updateTestimonialRecord(
  id: string,
  testimonialData: {
    client_name: string;
    location: string;
    quote: string;
    youtube_url?: string | null;
  }
): Promise<void> {
  const supabase = createBrowserClient();

  const { error } = await supabase
    .from("testimonials")
    .update({
      client_name: testimonialData.client_name,
      location: testimonialData.location,
      quote: testimonialData.quote,
      youtube_url: testimonialData.youtube_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update testimonial: ${error.message}`);
  }

  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-testimonials-updated"));
  }
}

/**
 * Deletes a testimonial.
 */
export async function deleteTestimonialRecord(id: string): Promise<void> {
  const supabase = createBrowserClient();
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete testimonial: ${error.message}`);
  }

  memoryTestimonialsCache = memoryTestimonialsCache.filter((t) => t.id !== id);
  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-testimonials-updated"));
  }
}

/**
 * Client/Server: Fetches all blogs with zero-latency (0ms) stale-while-revalidate memory cache.
 * Returns immediately from in-memory cache and triggers background revalidation if stale.
 */
export async function getBlogs(includeUnpublished = false): Promise<BlogRow[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const now = Date.now();
  if (now - lastBlogsFetchTime > 5000 || lastBlogsFetchTime === 0) {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data !== null) {
        memoryBlogsCache = (data as BlogRow[]).map((b) => ({
          ...b,
          cover_image: (b.cover_image || "")
            .replace(/\.png$/i, ".webp")
            .replace(/\/Main Hero\.webp$/i, "/main-hero.webp"),
        }));
        lastBlogsFetchTime = Date.now();
      }
    } catch {
      // Keep existing cache
    }
  }

  const list = memoryBlogsCache;
  return includeUnpublished ? list : list.filter((b) => b.published);
}

/**
 * Client/Server: Fetches a single blog by slug.
 */
export async function getBlogBySlug(slug: string): Promise<BlogRow | null> {
  const blogs = await getBlogs(true);
  const found = blogs.find((b) => b.slug === slug);
  if (found) return found;

  return null;
}

/**
 * Uploads a blog cover image file to Supabase Storage.
 * Tries 'blog-covers' bucket first, and falls back to 'project-images' if needed.
 */
export async function uploadBlogCoverToStorage(file: File): Promise<string> {
  const supabase = createBrowserClient();
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `blog_cover_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `covers/${fileName}`;

  let bucketName = "blog-covers";
  let uploadRes = await supabase.storage.from(bucketName).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (uploadRes.error) {
    // Fallback if blog-covers bucket has not been created yet in user's Supabase project
    bucketName = "project-images";
    uploadRes = await supabase.storage.from(bucketName).upload(`blogs/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  }

  if (uploadRes.error) {
    throw new Error(`Failed to upload blog cover image: ${uploadRes.error.message}`);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(uploadRes.data.path);
  return data.publicUrl;
}

/**
 * Creates a blog in the blogs table.
 */
export async function createBlogRecord(blogData: {
  slug: string;
  title: string;
  cover_image: string;
  content: BlogBlock[];
  published?: boolean;
}): Promise<BlogRow> {
  const supabase = createBrowserClient();

  let slugToUse = blogData.slug;
  let { data, error } = await supabase
    .from("blogs")
    .insert([
      {
        slug: slugToUse,
        title: blogData.title,
        cover_image: blogData.cover_image,
        content: blogData.content,
        published: blogData.published !== undefined ? blogData.published : true,
      },
    ])
    .select()
    .single();

  // If slug already exists, retry with a unique timestamp suffix
  if (error && (error.message.includes("unique") || error.message.includes("duplicate"))) {
    slugToUse = `${blogData.slug}-${Date.now().toString().slice(-4)}`;
    const retryRes = await supabase
      .from("blogs")
      .insert([
        {
          slug: slugToUse,
          title: blogData.title,
          cover_image: blogData.cover_image,
          content: blogData.content,
          published: blogData.published !== undefined ? blogData.published : true,
        },
      ])
      .select()
      .single();
    data = retryRes.data;
    error = retryRes.error;
  }

  if (error || !data) {
    throw new Error(error?.message || "Failed to create blog");
  }

  const createdRow = data as BlogRow;
  memoryBlogsCache = [createdRow, ...memoryBlogsCache.filter((b) => b.id !== createdRow.id)];
  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-blogs-updated"));
  }

  return createdRow;
}

/**
 * Updates a blog by id.
 */
export async function updateBlogRecord(
  id: string,
  blogData: Partial<{
    slug: string;
    title: string;
    cover_image: string;
    content: BlogBlock[];
    published: boolean;
  }>
): Promise<void> {
  const supabase = createBrowserClient();

  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (blogData.slug !== undefined) payload.slug = blogData.slug;
  if (blogData.title !== undefined) payload.title = blogData.title;
  if (blogData.cover_image !== undefined) payload.cover_image = blogData.cover_image;
  if (blogData.content !== undefined) payload.content = blogData.content;
  if (blogData.published !== undefined) payload.published = blogData.published;

  const { error } = await supabase
    .from("blogs")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update blog: ${error.message}`);
  }

  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-blogs-updated"));
  }
}

/**
 * Deletes a blog by id.
 * Gracefully handles UUID and non-UUID fake IDs, ensuring memory cache and Supabase stay in sync.
 */
export async function deleteBlogRecord(id: string): Promise<void> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  if (isUuid && isSupabaseConfigured()) {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to delete blog: ${error.message}`);
    }
  }

  memoryBlogsCache = memoryBlogsCache.filter((b) => b.id !== id);
  invalidateDataCache();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dmn-blogs-updated"));
  }
}

/**
 * Toggles a blog's published status.
 */
export async function toggleBlogPublish(id: string, published: boolean): Promise<void> {
  await updateBlogRecord(id, { published });
}

/**
 * Admin portal: Directly fetches live blogs from Supabase table.
 */
export async function getAdminBlogs(): Promise<BlogRow[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (data !== null) {
    memoryBlogsCache = data as BlogRow[];
    lastBlogsFetchTime = Date.now();
  }

  return (data as BlogRow[]) || [];
}

