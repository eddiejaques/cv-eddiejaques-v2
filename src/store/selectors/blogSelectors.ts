import type { RootState } from '../store';
import type { BlogPost } from '../../types/BlogPost';

export function selectFilteredPosts(state: RootState): BlogPost[] {
  const { posts, selectedTag, searchTerm } = state.blog;
  const term = searchTerm.trim().toLowerCase();

  return posts.filter((post) => {
    if (selectedTag && !post.tags.includes(selectedTag)) return false;
    if (term) {
      const haystack = `${post.title} ${post.description}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });
}

export type BlogSortBy = 'newest' | 'oldest';

export function selectSortedPosts(state: RootState, sortBy: BlogSortBy): BlogPost[] {
  const filtered = selectFilteredPosts(state);
  const sorted = [...filtered];

  sorted.sort((a, b) => {
    const diff = new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    return sortBy === 'newest' ? diff : -diff;
  });

  return sorted;
}

export function selectFeaturedPosts(state: RootState): BlogPost[] {
  return state.blog.posts.filter((post) => post.featured === true);
}
