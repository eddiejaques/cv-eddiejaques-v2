import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CaseStudy } from '../../types/CaseStudy';

export interface CaseStudiesState {
  items: CaseStudy[];
  selectedCategory: string | null;
  selectedStage: string | null;
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

const initialState: CaseStudiesState = {
  items: [],
  selectedCategory: null,
  selectedStage: null,
  searchTerm: '',
  loading: false,
  error: null,
};

const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CaseStudy[]>) {
      state.items = action.payload;
    },
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setStage(state, action: PayloadAction<string | null>) {
      state.selectedStage = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setItems, setCategory, setStage, setSearchTerm, setLoading, setError } =
  caseStudiesSlice.actions;
export default caseStudiesSlice.reducer;
