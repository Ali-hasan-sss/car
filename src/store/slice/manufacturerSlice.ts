import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🟢 جلب بيانات الشركات الصانعة بشكل غير متزامن
export const fetchManufacturers = createAsyncThunk(
  "manufacturers/fetchManufacturers",
  async () => {
    const response = await axiosInstance.get("customer/manufacturers");
    return response.data.data; // قائمة الشركات الصانعة
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
