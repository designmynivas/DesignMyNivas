export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getServiceBreadcrumbs(serviceName: string, serviceSlug: string): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: serviceName, url: `/services/${serviceSlug}` },
  ];
}

export function getProjectBreadcrumbs(projectTitle: string, projectSlug: string): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: projectTitle, url: `/projects/${projectSlug}` },
  ];
}

export function getBlogBreadcrumbs(blogTitle: string, blogSlug: string): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Journal", url: "/blogs" },
    { name: blogTitle, url: `/blogs/${blogSlug}` },
  ];
}

export function getLocationBreadcrumbs(cityName: string, citySlug: string): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/services" },
    { name: `Interior Designers in ${cityName}`, url: `/interior-designers/${citySlug}` },
  ];
}

export function getStandardBreadcrumbs(pageName: string, path: string): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: pageName, url: path },
  ];
}

export function getGuidesHubBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Homeowner Guides", url: "/guides" },
  ];
}

export function getGuideBreadcrumbs(guideTitle: string, guideSlug: string, categoryName: string): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: categoryName, url: "/guides" },
    { name: guideTitle, url: `/guides/${guideSlug}` },
  ];
}

export function getLocalGuideBreadcrumbs(cityName: string, citySlug: string): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: `Interior Designers in ${cityName}`, url: `/interior-designers/${citySlug}` },
    { name: "Homeowner Planning Guide", url: `/interior-designers/${citySlug}/home-interior-guide` },
  ];
}

