export interface SiteConfig {
  name: string;
  founder: string;
  tagline: string;
  description: string;
  url: string;
  primaryLocations: string[];
  phone: string;
  whatsapp: string;
  email: string;
}

export interface ConsultationEnquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  city: "Hyderabad" | "Warangal" | "Karimnagar" | "Other";
  property_type?: string;
  budget_range?: string;
  message?: string;
  status?: "new" | "contacted" | "consultation_scheduled" | "closed";
  created_at?: string;
}
