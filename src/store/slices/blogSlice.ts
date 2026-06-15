import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BlogPost } from '../../types/BlogPost';

export interface BlogState {
  posts: BlogPost[];
  selectedTag: string | null;
  searchTerm: string;
  loading: boolean;
}

const initialState: BlogState = {
  posts: [],
  selectedTag: null,
  searchTerm: '',
  loading: false,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<BlogPost[]>) {
      state.posts = action.payload;
    },
    setTag(state, action: PayloadAction<string | null>) {
      state.selectedTag = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setPosts, setTag, setSearchTerm, setLoading } = blogSlice.actions;
export default blogSlice.reducer;
