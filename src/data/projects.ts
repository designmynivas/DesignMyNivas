export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  type: string;
  service?: string;
  scope: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  story?: string;
  designApproach?: string;
  youtubeUrl?: string;
  featured?: boolean;
  created_at?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "ed373ce9-3fe3-42e5-8637-6385828d01d1",
    slug: "nikhils-home",
    title: "nikhils home",
    client: "Private Residence",
    location: "Hyderabad",
    type: "Complete Home Interiors",
    service: "Complete Home Interiors",
    scope: "Complete Turnkey Execution",
    description: "Complete Home Interiors project located in Hyderabad. Executed with precision craftsmanship, calibrated BWP marine woodwork, and turnkey site supervision.",
    image: "https://img.youtube.com/vi/PVrYMT2cBHo/maxresdefault.jpg",
    gallery: [
      "https://img.youtube.com/vi/PVrYMT2cBHo/maxresdefault.jpg",
      "/Images/services/complete-home-interiors.webp",
      "/Images/services/modular-kitchens.webp",
    ],
    highlights: [
      "Turnkey home interior design with bespoke woodworking",
      "Factory-pressed BWP marine-grade plywood cabinetry",
      "Architectural false ceiling with warm ambient cove lighting",
      "Comprehensive site supervision with on-time delivery",
    ],
    youtubeUrl: "https://www.youtube.com/shorts/PVrYMT2cBHo",
    featured: true,
  },
  {
    id: "6e2dc0b7-bed3-4691-82f0-cae917663655",
    slug: "raju-sir-home",
    title: "Raju sir home",
    client: "Private Residence",
    location: "Warangal",
    type: "Living Room Interiors",
    service: "Living Room Interiors",
    scope: "Living Room & Lounge Interiors",
    description: "Living Room Interiors project located in Warangal. Executed with precision craftsmanship, custom fluted wall paneling, and curated architectural lighting.",
    image: "https://iaadakqgwoqvrhkinguy.supabase.co/storage/v1/object/public/project-images/projects/portrait_1790274848727_w0tgde.jpeg",
    gallery: [
      "https://iaadakqgwoqvrhkinguy.supabase.co/storage/v1/object/public/project-images/projects/portrait_1790274848727_w0tgde.jpeg",
      "/Images/services/living-room-interiors.webp",
      "/Images/services/customised-furniture.webp",
    ],
    highlights: [
      "Custom living room feature wall with fluted louvers",
      "Designer ambient lighting with recessed cove architecture",
      "High-density comfortable upholstered lounge seating",
      "Turnkey on-site execution in Warangal",
    ],
    featured: true,
  },
  {
    id: "6ee4906b-de59-4a2b-8a70-796743fea401",
    slug: "jubli-heaven-residencey",
    title: "Jubli Heaven residencey",
    client: "Private Residence",
    location: "Hyderabad",
    type: "Turnkey Interior Execution",
    service: "Turnkey Interior Execution",
    scope: "Turnkey Residential Interior Execution",
    description: "Turnkey Interior Execution project located in Hyderabad. Executed with precision craftsmanship, factory-grade finishes, and locked milestone pricing.",
    image: "https://iaadakqgwoqvrhkinguy.supabase.co/storage/v1/object/public/project-images/projects/portrait_1790274819748_20igtm.jpeg",
    gallery: [
      "https://iaadakqgwoqvrhkinguy.supabase.co/storage/v1/object/public/project-images/projects/portrait_1790274819748_20igtm.jpeg",
      "/Images/services/turnkey-interior-execution.webp",
      "/Images/services/false-ceiling-lighting.webp",
    ],
    highlights: [
      "Full turnkey execution with dedicated senior engineer",
      "100% itemized Bill of Quantities with zero cost escalation",
      "Multi-zone cove illumination and architectural finishes",
      "3-stage snagging audit and pristine handover",
    ],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projectsData.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((project) => project.slug);
}

export function getRelatedProjects(serviceSlug?: string): ProjectItem[] {
  if (!serviceSlug) return projectsData;
  return projectsData;
}
