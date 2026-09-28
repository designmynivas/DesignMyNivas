export type GuideGroup = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export interface GuideCallout {
  type: "tip" | "warning" | "insight";
  title: string;
  text: string;
}

export interface GuideTable {
  headers: string[];
  rows: string[][];
}

export interface GuideSection {
  id: string;
  title: string;
  paragraphs: string[];
  callout?: GuideCallout;
  table?: GuideTable;
  checklist?: string[];
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideItem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  group: GuideGroup;
  category: string;
  categorySlug: string;
  readingTime: string;
  lastUpdated: string;
  summary: string;
  keyTakeaways: string[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
  relatedServices: string[];
  relatedProjects: string[];
  relatedGuides: string[];
  city?: "hyderabad" | "warangal" | "karimnagar";
  isLocalGuide?: boolean;
}
