import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ تعديل الدالة لقبول الـ role
export const fetchManufacturers = createAsyncThunk(
  "manufacturers/fetchManufacturers",
  async (role: "ADMIN" | "USER") => {
    const endpoint =
      role === "ADMIN" ? "admin/manufacturers" : "customer/manufacturers";

    const response = await axiosInstance.get(endpoint);
    return response.data.data;
  }
);

interface ManufacturerState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manufacturers: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ManufacturerState = {
  manufacturers: [],
  status: "idle",
  error: null,
};

const manufacturerSlice = createSlice({
  name: "manufacturers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManufacturers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.manufacturers = action.payload;
      })
      .addCase(fetchManufacturers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "حدث خطأ أثناء جلب البيانات";
      });
  },
});

export default manufacturerSlice.reducer;
