export type PropertyType =
  | "3BHK"
  | "4BHK"
  | "Villa"
  | "Penthouse"
  | "Duplex"
  | "Independent House"
  | "Other";

export type ProjectLocation = "Hyderabad" | "Warangal" | "Karimnagar" | string;

export interface Project {
  id: string;
  title: string;
  slug: string;
  location: ProjectLocation;
  property_type: PropertyType;
  carpet_area?: string;
  scope: string;
  description: string;
  cover_image_url: string;
  images: string[];
  features?: string[];
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at?: string;
}
