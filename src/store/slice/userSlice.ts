import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { UserData } from "@/Types/userTypes";

// واجهة حالة المستخدم
interface UserState {
  users: UserData[];
  user: UserData | null;
  loading: boolean;
  actionLoadingIds: number[];
  error: string | null;
  totalPages: number;
  currentPage: number;
}

// الحالة الابتدائية
const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  actionLoadingIds: [],
  error: null,
  totalPages: 0,
  currentPage: 1,
};

// ✅ جلب جميع المستخدمين
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (apiUrl: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrl);
      const { users, total_pages } = response.data.data;

      return {
        users,
        totalPages: total_pages,
      };
    } catch (error) {
      return rejectWithValue(error || "حدث خطأ أثناء جلب المستخدمين");
    }
  }
);

// ✅ جلب مستخدم بواسطة المعرف
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${id}`);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء جلب بيانات المستخدم"
      );
    }
  }
);

// ✅ تعديل بيانات المستخدم
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    { id, userData }: { id: number; userData: Partial<UserData> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${id}`, userData);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء تحديث بيانات المستخدم"
      );
    }
  }
);

// ✅ حذف مستخدم
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      return id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "حدث خطأ أثناء حذف المستخدم"
      );
    }
  }
);

// ✅ إنشاء `Slice`
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🎯 جلب جميع المستخدمين
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (
          state,
          action: PayloadAction<{ users: UserData[]; totalPages: number }>
        ) => {
          state.loading = false;
          state.users = action.payload.users;
          state.totalPages = action.payload.totalPages;
        }
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🎯 جلب مستخدم بواسطة المعرف
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchUserById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🎯 تعديل بيانات المستخدم
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.user = action.payload;
          state.users = state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          );
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🎯 حذف مستخدم
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
