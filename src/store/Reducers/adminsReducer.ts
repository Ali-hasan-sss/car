// adminsReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, AdminsState } from "./../../Types/adminTypes";

const initialState: AdminsState = {
  adminsList: [],
  selectedAdmin: null,
};

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    fetchAdminsSuccess(state, action: PayloadAction<Admin[]>) {
      state.adminsList = action.payload;
    },
    selectAdmin(state, action: PayloadAction<Admin>) {
      state.selectedAdmin = action.payload;
    },
  },
});

export const { fetchAdminsSuccess, selectAdmin } = adminsSlice.actions;
export default adminsSlice.reducer;
