import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { toast } from "sonner";
import { RootState } from "../store";
import { CarShipping, ShippingFormInputs } from "@/Types/AuctionTypes";

interface CarShippingState {
  carShippings: CarShipping[];
  loading: boolean;
  error: string | null;
  carShipping: CarShipping | null;
  totalPages: number;
  currentPage: number;
}

const initialState: CarShippingState = {
  carShippings: [],
  loading: false,
  error: null,
  carShipping: null,
  totalPages: 0,
  currentPage: 1,
};

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return "حدث خطأ غير متوقع";
}

// ✅ جلب شحن السيارات
export const fetchCarShippings = createAsyncThunk<
  { carShippings: CarShipping[]; totalPages: number; currentPage: number },
  { API: string },
  { rejectValue: string }
>("carShippings/fetchCarShippings", async ({ API }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(API);
    const { data } = response.data;
    return {
      carShippings: data.carShippings as CarShipping[],
      totalPages: data.total_pages,
      currentPage: data.currentPage ?? 1,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ جلب شحن سيارة حسب المعرف
export const fetchCarShippingById = createAsyncThunk<
  CarShipping,
  { apiUrl: string; id: number },
  { rejectValue: string }
>("carShippings/fetchCarShippingById", async ({ apiUrl, id }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/${id}`);
    return response.data.data as CarShipping;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ إضافة شحن سيارة
export const addCarShipping = createAsyncThunk<
  CarShipping,
  { apiUrl: string; carShippingData: Partial<ShippingFormInputs> },
  { rejectValue: string }
>(
  "carShippings/addCarShipping",
  async ({ apiUrl, carShippingData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiUrl, carShippingData);
      toast.success("تمت إضافة طلب الشحن بنجاح");
      return response.data.data as CarShipping;
    } catch (error) {
      toast.error("حدث خطأ أثناء الإضافة");
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ✅ تعديل شحن سيارة
export const updateCarShipping = createAsyncThunk<
  CarShipping,
  { apiUrl: string; id: number; updatedData: Partial<ShippingFormInputs> },
  { rejectValue: string }
>(
  "carShippings/updateCarShipping",
  async ({ apiUrl, id, updatedData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${apiUrl}/${id}`, updatedData);
      toast.success("تم تعديل طلب الشحن بنجاح");
      return response.data.data as CarShipping;
    } catch (error) {
      toast.error("حدث خطأ أثناء التعديل");
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ✅ حذف شحن سيارة
export const deleteCarShipping = createAsyncThunk<
  number,
  { apiUrl: string; id: number },
  { rejectValue: string }
>("carShippings/deleteCarShipping", async ({ apiUrl, id }, thunkAPI) => {
  try {
    await axiosInstance.delete(apiUrl);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const carShippingsSlice = createSlice({
  name: "carShippings",
  initialState,
  reducers: {
    clearCarShippings: (state) => {
      state.carShippings = [];
      state.error = null;
      state.loading = false;
      state.totalPages = 0;
      state.currentPage = 1;
    },
    deleteCarShippingLocal: (state, action: PayloadAction<number>) => {
      state.carShippings = state.carShippings.filter(
        (c) => c.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarShippings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarShippings.fulfilled, (state, action) => {
        state.loading = false;
        state.carShippings = action.payload.carShippings;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCarShippings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في جلب شحنات السيارات";
      })
      .addCase(fetchCarShippingById.fulfilled, (state, action) => {
        state.loading = false;
        state.carShipping = action.payload;
      })
      .addCase(addCarShipping.fulfilled, (state, action) => {
        state.loading = false;
        state.carShippings.unshift(action.payload);
      })
      .addCase(updateCarShipping.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.carShippings.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.carShippings[index] = action.payload;
        }
      })
      .addCase(deleteCarShipping.fulfilled, (state, action) => {
        state.loading = false;
        state.carShippings = state.carShippings.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export const selectCarShippingsLoading = (state: RootState) =>
  state.carShippings.loading;
export const { clearCarShippings, deleteCarShippingLocal } =
  carShippingsSlice.actions;
export default carShippingsSlice.reducer;
