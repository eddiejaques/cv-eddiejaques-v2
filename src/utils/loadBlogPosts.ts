import yaml from 'js-yaml';
import type { BlogPost } from '../types/BlogPost';

const modules = import.meta.glob('../data/blogPosts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Browser-safe frontmatter parsing. gray-matter relies on Node's Buffer
// global, which is undefined in the browser and crashes every page that
// loads a blog post — so we split the frontmatter ourselves and parse the
// YAML block with js-yaml (pure JS, no Buffer).
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = FRONTMATTER.exec(raw);
  if (!match) return { data: {}, content: raw };
  const data = (yaml.load(match[1]) as Record<string, unknown>) ?? {};
  return { data, content: match[2] };
}

export function loadBlogPosts(): BlogPost[] {
  return Object.values(modules).map((raw) => {
    const { data, content } = parseFrontmatter(raw);
    const trimmed = content.trim();
    return {
      id: data.id as string,
      slug: data.slug as string,
      title: data.title as string,
      description: data.description as string,
      content: trimmed,
      publishedDate: data.publishedDate as string | undefined,
      readTime: Math.max(1, Math.round(trimmed.split(/\s+/).length / 200)),
      tags: (data.tags as string[]) ?? [],
      featured: (data.featured as boolean) ?? false,
    };
  });
}
