import { GuideItem } from "./types";
import { groupAServiceGuides } from "./group-a-service-guides";
import { groupBCostGuides } from "./group-b-cost-guides";
import { groupCRoomGuides } from "./group-c-room-guides";
import { groupDHomeTypeGuides } from "./group-d-home-type-guides";
import { groupEProcessGuides } from "./group-e-process-guides";
import { groupFMaterialGuides } from "./group-f-material-guides";
import { groupGLocalGuides } from "./group-g-local-guides";
import { groupHDecisionGuides } from "./group-h-decision-guides";

export * from "./types";

/**
 * 47 standard educational guides accessible under /guides/[slug]
 */
export const allGeneralGuides: GuideItem[] = [
  ...groupAServiceGuides,
  ...groupBCostGuides,
  ...groupCRoomGuides,
  ...groupDHomeTypeGuides,
  ...groupEProcessGuides,
  ...groupFMaterialGuides,
  ...groupHDecisionGuides,
];

/**
 * 3 local homeowner guides accessible under /interior-designers/[city]/home-interior-guide
 */
export const localGuides: GuideItem[] = groupGLocalGuides;

/**
 * All 50 structured guides in the Design My Nivas content architecture
 */
export const allGuides: GuideItem[] = [
  ...allGeneralGuides,
  ...localGuides,
];

export function getAllGeneralGuideSlugs(): string[] {
  return allGeneralGuides.map((g) => g.slug);
}

export function getGuideBySlug(slug: string): GuideItem | null {
  return allGeneralGuides.find((g) => g.slug === slug) || null;
}

export function getLocalGuideByCity(city: string): GuideItem | null {
  const normalized = city.toLowerCase().trim();
  return localGuides.find((g) => g.city === normalized || g.slug === normalized) || null;
}

export interface GuideCategoryInfo {
  name: string;
  slug: string;
  group: string;
  description: string;
  count: number;
}

export function getGuideCategories(): GuideCategoryInfo[] {
  return [
    {
      name: "Service Guides",
      slug: "service-guides",
      group: "A",
      description: "Comprehensive planning resources for modular kitchens, wardrobes, living rooms, and turnkey execution.",
      count: groupAServiceGuides.length,
    },
    {
      name: "Cost & Budget Guides",
      slug: "cost-guides",
      group: "B",
      description: "Transparent cost factor breakdowns, budgeting frameworks, and pricing protection strategies.",
      count: groupBCostGuides.length,
    },
    {
      name: "Room Planning Guides",
      slug: "room-guides",
      group: "C",
      description: "Ergonomics, circulation clearances, acoustics, and storage systems for every room.",
      count: groupCRoomGuides.length,
    },
    {
      name: "Home Type Guides",
      slug: "home-type-guides",
      group: "D",
      description: "Specialized design planning for 2BHKs, 3BHKs, gated community apartments, and independent villas.",
      count: groupDHomeTypeGuides.length,
    },
    {
      name: "Process & Execution",
      slug: "process-guides",
      group: "E",
      description: "Step-by-step milestones, pre-site preparation, site engineering, and handover checklists.",
      count: groupEProcessGuides.length,
    },
    {
      name: "Material & Design Decisions",
      slug: "material-guides",
      group: "F",
      description: "Plywood grades (BWP IS:710), acrylic vs PU finishes, lighting Kelvin scales, and Indian storage.",
      count: groupFMaterialGuides.length,
    },
    {
      name: "Local Homeowner Guides",
      slug: "local-guides",
      group: "G",
      description: "In-depth regional guides for homeowners in Hyderabad, Warangal, and Karimnagar.",
      count: groupGLocalGuides.length,
    },
    {
      name: "Decision & Selection Guides",
      slug: "decision-guides",
      group: "H",
      description: "Objective evaluation criteria and 15-point interview questions to vet interior designers.",
      count: groupHDecisionGuides.length,
    },
  ];
}

export function getGuidesByCategory(categorySlug: string): GuideItem[] {
  return allGuides.filter((g) => g.categorySlug === categorySlug);
}

export function getRelatedGuidesForSlug(slug: string, limit = 4): GuideItem[] {
  const current = allGuides.find((g) => g.slug === slug);
  if (!current) return allGeneralGuides.slice(0, limit);

  // First look for explicitly defined related guide slugs
  const explicit = current.relatedGuides
    .map((s) => allGuides.find((g) => g.slug === s))
    .filter((g): g is GuideItem => Boolean(g));

  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  // Fill up with other guides from the same category or adjacent
  const sameCategory = allGuides.filter(
    (g) => g.categorySlug === current.categorySlug && g.slug !== current.slug && !current.relatedGuides.includes(g.slug)
  );

  return [...explicit, ...sameCategory].slice(0, limit);
}
