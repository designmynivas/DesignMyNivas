export type BlogBlockType = "subheading" | "paragraph" | "bullet_list";

export interface BlogSubheadingBlock {
  type: "subheading";
  text: string;
}

export interface BlogParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BlogBulletListBlock {
  type: "bullet_list";
  items: string[];
}

export type BlogBlock = BlogSubheadingBlock | BlogParagraphBlock | BlogBulletListBlock;

export interface BlogItem {
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
 * Extracts a concise text preview from the first paragraph in the blog content.
 */
export function getBlogPreview(content: BlogBlock[], maxLength = 160): string {
  if (!content || !Array.isArray(content)) return "";
  for (const block of content) {
    if (block.type === "paragraph" && block.text.trim()) {
      const clean = block.text.trim();
      if (clean.length <= maxLength) return clean;
      return `${clean.slice(0, maxLength).trim()}...`;
    }
  }
  return "";
}

/**
 * Estimates reading time in minutes based on words in the article.
 */
export function estimateReadingTime(content: BlogBlock[]): string {
  if (!content || !Array.isArray(content)) return "3 min read";
  let totalWords = 0;
  for (const block of content) {
    if (block.type === "paragraph" || block.type === "subheading") {
      totalWords += block.text.split(/\s+/).filter(Boolean).length;
    } else if (block.type === "bullet_list" && Array.isArray(block.items)) {
      for (const item of block.items) {
        totalWords += item.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  return `${minutes} min read`;
}
