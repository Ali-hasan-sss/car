import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog, BlogsState } from "./../../Types/adminTypes";

const initialState: BlogsState = {
  blogsList: [],
  selectedBlog: null,
  lastUpdated: 0,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    fetchBlogsSuccess(state, action: PayloadAction<Blog[]>) {
      state.blogsList = action.payload;
      state.lastUpdated = Date.now(); // <-- تحديث وقت آخر تحديث
    },
    selectBlog(state, action: PayloadAction<Blog>) {
      state.selectedBlog = action.payload;
    },
    addBlog(state, action: PayloadAction<Blog>) {
      state.blogsList.push(action.payload);
      state.lastUpdated = Date.now(); // <-- تحديث وقت آخر تحديث
    },
    updateBlog(state, action: PayloadAction<Blog>) {
      const index = state.blogsList.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogsList[index] = {
          ...state.blogsList[index],
          ...action.payload,
        };
      }
      if (state.selectedBlog?.id === action.payload.id) {
        state.selectedBlog = {
          ...state.selectedBlog,
          ...action.payload,
        };
      }
    },
    deleteBlog(state, action: PayloadAction<number>) {
      state.blogsList = state.blogsList.filter(
        (blog) => blog.id !== action.payload
      );
      state.lastUpdated = Date.now(); // <-- تحديث وقت آخر تحديث
    },
  },
});

export const {
  fetchBlogsSuccess,
  selectBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} = blogsSlice.actions;

export default blogsSlice.reducer;
