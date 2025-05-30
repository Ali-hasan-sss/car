import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogUser } from "../../Types/adminTypes";

// الحالة الأولية
interface BlogUserState {
  blogList: BlogUser[];
  selectedBlog: BlogUser | null;
  lastUpdated: number;
}

const initialState: BlogUserState = {
  blogList: [],
  selectedBlog: null,
  lastUpdated: 0,
};

// إنشاء slice للخدمات
const blogUserSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchBlogUserSuccess(state, action: PayloadAction<BlogUser[]>) {
      state.blogList = action.payload;
      state.lastUpdated = Date.now();
    },
    selectUserBlog(state, action: PayloadAction<BlogUser>) {
      state.selectedBlog = action.payload;
      state.lastUpdated = Date.now();
    },
  },
});

// تصدير الأكشنات
export const { fetchBlogUserSuccess, selectUserBlog } = blogUserSlice.actions;

// تصدير الريدوكر
export default blogUserSlice.reducer;
