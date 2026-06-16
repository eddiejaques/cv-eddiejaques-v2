export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;         // Excerpt
  content: string;             // Markdown or HTML
  publishedDate?: string;      // ISO 8601 (omit for undated posts)
  readTime: number;            // Minutes
  tags: string[];              // Categories
  featured?: boolean;          // Show on homepage
}
