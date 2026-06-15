import { configureStore, createSlice } from '@reduxjs/toolkit';
import caseStudiesReducer from './slices/caseStudiesSlice';
import blogReducer from './slices/blogSlice';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: {
    caseStudies: caseStudiesReducer,
    blog: blogReducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
