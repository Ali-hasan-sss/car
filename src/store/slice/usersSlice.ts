// src/store/usersSlice.ts

import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// تعريف نوع المستخدم
export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  // أضف الحقول الأخرى حسب الحاجة
}

// حالة البداية
interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// جلب المستخدمين من السيرفر
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("admin/users");
      return res.data.data; // تأكد من شكل البيانات
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء الجلب"
      );
    }
  }
);

// إنشاء الـ Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // حذف مستخدم من الـ state
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    // تحديث مستخدم
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// تصدير الأكشنات
export const { deleteUser, updateUser } = usersSlice.actions;

// تصدير الريوسر
export default usersSlice.reducer;
