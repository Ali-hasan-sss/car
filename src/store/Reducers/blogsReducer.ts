import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog, BlogsState } from "./../../Types/blogsTypes";

const initialState: BlogsState = {
  blogsList: [],
  selectedBlog: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    fetchBlogsSuccess(state, action: PayloadAction<Blog[]>) {
      state.blogsList = action.payload;
    },
    selectBlog(state, action: PayloadAction<Blog>) {
      state.selectedBlog = action.payload;
    },
    addBlog(state, action: PayloadAction<Blog>) {
      state.blogsList.push(action.payload);
    },
    updateBlog(state, action: PayloadAction<Blog>) {
      const index = state.blogsList.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogsList[index] = action.payload;
      }
    },
    deleteBlog(state, action: PayloadAction<number>) {
      state.blogsList = state.blogsList.filter(
        (blog) => blog.id !== action.payload
      );
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
