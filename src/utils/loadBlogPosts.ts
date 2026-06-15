import matter from 'gray-matter';
import type { BlogPost } from '../types/BlogPost';

const modules = import.meta.glob('../data/blogPosts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function loadBlogPosts(): BlogPost[] {
  return Object.values(modules).map((raw) => {
    const { data, content } = matter(raw);
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      description: data.description,
      content: content.trim(),
      publishedDate: data.publishedDate,
      readTime: Math.max(1, Math.round(content.trim().split(/\s+/).length / 200)),
      tags: data.tags ?? [],
      featured: data.featured ?? false,
    };
  });
}
