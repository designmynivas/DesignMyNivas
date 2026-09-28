export interface Testimonial {
  id: string;
  client_name: string;
  project_title?: string;
  location: string;
  quote: string;
  rating?: number;
  avatar_url?: string;
  is_featured?: boolean;
  is_approved?: boolean;
  youtube_url?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface VideoShowcase {
  id: string;
  title: string;
  youtube_url: string;
  youtube_id: string;
  thumbnail_url?: string;
  duration?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
}
