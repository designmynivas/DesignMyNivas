-- ============================================================================
-- Design My Nivas — restrict content changes to the signed-in admin
-- Run once in Supabase → SQL Editor. Safe to re-run.
--
-- Before: anyone holding the public website key could insert, edit or delete
-- projects, testimonials, blogs and uploaded images.
-- After: the public can still READ everything; only a logged-in admin can WRITE.
-- ============================================================================

drop policy if exists "Admin insert projects" on public.projects;
create policy "Admin insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

drop policy if exists "Admin update projects" on public.projects;
create policy "Admin update projects"
  on public.projects for update
  to authenticated
  using (true);

drop policy if exists "Admin delete projects" on public.projects;
create policy "Admin delete projects"
  on public.projects for delete
  to authenticated
  using (true);

drop policy if exists "Admin insert testimonials" on public.testimonials;
create policy "Admin insert testimonials"
  on public.testimonials for insert
  to authenticated
  with check (true);

drop policy if exists "Admin update testimonials" on public.testimonials;
create policy "Admin update testimonials"
  on public.testimonials for update
  to authenticated
  using (true);

drop policy if exists "Admin delete testimonials" on public.testimonials;
create policy "Admin delete testimonials"
  on public.testimonials for delete
  to authenticated
  using (true);

drop policy if exists "Admin upload project images" on storage.objects;
create policy "Admin upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

drop policy if exists "Admin update project images" on storage.objects;
create policy "Admin update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images');

drop policy if exists "Admin delete project images" on storage.objects;
create policy "Admin delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');

drop policy if exists "Admin insert blogs" on public.blogs;
create policy "Admin insert blogs"
  on public.blogs for insert
  to authenticated
  with check (true);

drop policy if exists "Admin update blogs" on public.blogs;
create policy "Admin update blogs"
  on public.blogs for update
  to authenticated
  using (true);

drop policy if exists "Admin delete blogs" on public.blogs;
create policy "Admin delete blogs"
  on public.blogs for delete
  to authenticated
  using (true);

drop policy if exists "Admin upload blog covers" on storage.objects;
create policy "Admin upload blog covers"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-covers');

drop policy if exists "Admin update blog covers" on storage.objects;
create policy "Admin update blog covers"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-covers');

drop policy if exists "Admin delete blog covers" on storage.objects;
create policy "Admin delete blog covers"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-covers');
