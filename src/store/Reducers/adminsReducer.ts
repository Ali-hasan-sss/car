import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, AdminsState } from "../../Types/adminTypes";

const initialState: AdminsState = {
  adminsList: [],
  selectedAdmin: null,
};

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    // جلب قائمة المديرين
    fetchAdminsSuccess(state, action: PayloadAction<Admin[]>) {
      state.adminsList = action.payload;
    },

    // تحديد مدير معين
    selectAdmin(state, action: PayloadAction<Admin | null>) {
      state.selectedAdmin = action.payload;
    },

    // إضافة مدير جديد
    addAdmin(state, action: PayloadAction<Admin>) {
      state.adminsList.push(action.payload);
    },

    // تعديل بيانات مدير
    updateAdmin(state, action: PayloadAction<Admin>) {
      const index = state.adminsList.findIndex(
        (admin) => admin.id === action.payload.id
      );
      if (index !== -1) {
        state.adminsList[index] = action.payload;
      }
    },

    // حذف مدير
    deleteAdmin(state, action: PayloadAction<number>) {
      state.adminsList = state.adminsList.filter(
        (admin) => admin.id !== action.payload
      );
    },
  },
});

export const {
  fetchAdminsSuccess,
  selectAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = adminsSlice.actions;
export default adminsSlice.reducer;
