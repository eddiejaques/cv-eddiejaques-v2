export interface CaseStudy {
  id: string;                  // Unique identifier
  slug: string;                // URL-safe slug
  title: string;               // Display title
  category: 'AI' | 'Data Platforms' | 'Marketing Tech' | 'Growth';
  organization: string;        // Joyn, Optum, Vodafone, etc.
  experienceStage: 'Joyn' | 'Optum' | 'Vodafone' | 'Earlier Roles'; // Career chapter, used for stage filtering
  description: string;         // 2–3 sentence teaser
  keyMetrics: {
    label: string;
    value: string;             // E.g., "25%", "$1M+", "200%+"
  }[];
  publishedDate: string;       // ISO 8601
  readTime: number;            // Minutes
  staticHtmlPath: string;      // Path to full standalone HTML page in Supabase Storage
  heroImage?: string;          // Path to hero image
  tags?: string[];             // Search/filtering tags
}
