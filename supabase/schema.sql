-- ==============================================================================
-- DESIGN MY NIVAS - SUPABASE DATABASE SCHEMA & STORAGE SETUP
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROJECTS TABLE
-- Simplified: 1 portrait image OR 1 YouTube video URL per project
-- ------------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  location text not null,
  service text not null,
  media_type text not null check (media_type in ('image', 'youtube')),
  image_url text,
  youtube_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for slug lookups and sorting
create index if not exists idx_projects_slug on public.projects(slug);
create index if not exists idx_projects_created_at on public.projects(created_at desc);

-- ------------------------------------------------------------------------------
-- 2. TESTIMONIALS TABLE
-- Client name, location, short quote, and optional YouTube video URL
-- ------------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  location text not null,
  quote text not null,
  youtube_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for testimonials sorting
create index if not exists idx_testimonials_created_at on public.testimonials(created_at desc);

-- ------------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;

-- Public read access
drop policy if exists "Public read projects" on public.projects;
create policy "Public read projects"
  on public.projects for select
  using (true);

drop policy if exists "Public read testimonials" on public.testimonials;
create policy "Public read testimonials"
  on public.testimonials for select
  using (true);

-- Admin mutation access (Permissive for smooth admin portal operations)
drop policy if exists "Admin insert projects" on public.projects;
create policy "Admin insert projects"
  on public.projects for insert
  with check (true);

drop policy if exists "Admin update projects" on public.projects;
create policy "Admin update projects"
  on public.projects for update
  using (true);

drop policy if exists "Admin delete projects" on public.projects;
create policy "Admin delete projects"
  on public.projects for delete
  using (true);

drop policy if exists "Admin insert testimonials" on public.testimonials;
create policy "Admin insert testimonials"
  on public.testimonials for insert
  with check (true);

drop policy if exists "Admin update testimonials" on public.testimonials;
create policy "Admin update testimonials"
  on public.testimonials for update
  using (true);

drop policy if exists "Admin delete testimonials" on public.testimonials;
create policy "Admin delete testimonials"
  on public.testimonials for delete
  using (true);

-- ------------------------------------------------------------------------------
-- 4. SUPABASE STORAGE BUCKET: project-images
-- ------------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

-- Storage RLS Policies
drop policy if exists "Public view project images" on storage.objects;
create policy "Public view project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

drop policy if exists "Admin upload project images" on storage.objects;
create policy "Admin upload project images"
  on storage.objects for insert
  with check (bucket_id = 'project-images');

drop policy if exists "Admin update project images" on storage.objects;
create policy "Admin update project images"
  on storage.objects for update
  using (bucket_id = 'project-images');

drop policy if exists "Admin delete project images" on storage.objects;
create policy "Admin delete project images"
  on storage.objects for delete
  using (bucket_id = 'project-images');

-- ------------------------------------------------------------------------------
-- 5. AUTO-UPDATE UPDATED_AT TRIGGER FUNCTION
-- ------------------------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_projects_updated_at on public.projects;
create trigger trigger_projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();

drop trigger if exists trigger_testimonials_updated_at on public.testimonials;
create trigger trigger_testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 6. BLOGS TABLE
-- Articles with structured JSON content, cover image, and published flag
-- ------------------------------------------------------------------------------
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  cover_image text not null,
  content jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes for blogs
create index if not exists idx_blogs_slug on public.blogs(slug);
create index if not exists idx_blogs_published on public.blogs(published);
create index if not exists idx_blogs_created_at on public.blogs(created_at desc);

-- RLS for blogs
alter table public.blogs enable row level security;

-- Public read access
drop policy if exists "Public read blogs" on public.blogs;
create policy "Public read blogs"
  on public.blogs for select
  using (true);

-- Admin mutation access (Permissive for smooth admin portal operations)
drop policy if exists "Admin insert blogs" on public.blogs;
create policy "Admin insert blogs"
  on public.blogs for insert
  with check (true);

drop policy if exists "Admin update blogs" on public.blogs;
create policy "Admin update blogs"
  on public.blogs for update
  using (true);

drop policy if exists "Admin delete blogs" on public.blogs;
create policy "Admin delete blogs"
  on public.blogs for delete
  using (true);

-- ------------------------------------------------------------------------------
-- 7. SUPABASE STORAGE BUCKET: blog-covers
-- ------------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do update set public = true;

-- Storage RLS Policies for blog-covers
drop policy if exists "Public view blog covers" on storage.objects;
create policy "Public view blog covers"
  on storage.objects for select
  using (bucket_id = 'blog-covers');

drop policy if exists "Admin upload blog covers" on storage.objects;
create policy "Admin upload blog covers"
  on storage.objects for insert
  with check (bucket_id = 'blog-covers');

drop policy if exists "Admin update blog covers" on storage.objects;
create policy "Admin update blog covers"
  on storage.objects for update
  using (bucket_id = 'blog-covers');

drop policy if exists "Admin delete blog covers" on storage.objects;
create policy "Admin delete blog covers"
  on storage.objects for delete
  using (bucket_id = 'blog-covers');

-- Trigger for blogs updated_at
drop trigger if exists trigger_blogs_updated_at on public.blogs;
create trigger trigger_blogs_updated_at
  before update on public.blogs
  for each row execute function public.handle_updated_at();

