import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { toast } from "sonner";
import { RootState } from "../store";
import { CarSale, SallesFormInputs } from "@/Types/AuctionTypes";

// الحالة الابتدائية
interface CarSalesState {
  carSales: CarSale[];
  loading: boolean;
  error: string | null;
  carSale: CarSale | null;
  totalPages: number;
  currentPage: number;
}

const initialState: CarSalesState = {
  carSales: [],
  loading: false,
  error: null,
  carSale: null,
  totalPages: 0,
  currentPage: 1,
};

// دالة استخراج رسالة الخطأ
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return "حدث خطأ غير متوقع";
}

// ✅ جلب طلبات البيع
export const fetchCarSales = createAsyncThunk<
  { carSales: CarSale[]; totalPages: number; currentPage: number },
  { API: string },
  { rejectValue: string }
>("carSales/fetchCarSales", async ({ API }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(API);
    const { data } = response.data;
    return {
      carSales: data.carSales as CarSale[],
      totalPages: data.total_pages,
      currentPage: data.currentPage,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ جلب طلب بيع حسب المعرف
export const fetchCarSaleById = createAsyncThunk<
  CarSale,
  { apiUrl: string; id: number },
  { rejectValue: string }
>("carSales/fetchCarSaleById", async ({ apiUrl, id }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/${id}`);
    return response.data.data as CarSale;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ إضافة طلب بيع
export const addCarSale = createAsyncThunk<
  CarSale,
  { apiUrl: string; carSaleData: Partial<SallesFormInputs> },
  { rejectValue: string }
>("carSales/addCarSale", async ({ apiUrl, carSaleData }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(apiUrl, carSaleData);
    toast.success("تمت إضافة طلب البيع بنجاح");
    return response.data.data as CarSale;
  } catch (error) {
    toast.error("حدث خطأ أثناء الإضافة");
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ تعديل طلب بيع
export const updateCarSale = createAsyncThunk<
  CarSale,
  { apiUrl: string; id: number; updatedData: Partial<SallesFormInputs> },
  { rejectValue: string }
>("carSales/updateCarSale", async ({ apiUrl, id, updatedData }, thunkAPI) => {
  try {
    const fullUrl = `${apiUrl}/${id}`;
    const response = await axiosInstance.put(fullUrl, updatedData);
    toast.success("تم تعديل طلب البيع بنجاح");
    return response.data.data as CarSale;
  } catch (error) {
    toast.error("حدث خطأ أثناء التعديل");
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ حذف طلب بيع
export const deleteCarSale = createAsyncThunk<
  number,
  { apiUrl: string; id: number },
  { rejectValue: string }
>("carSales/deleteCarSale", async ({ apiUrl, id }, thunkAPI) => {
  try {
    await axiosInstance.delete(apiUrl);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const carSalesSlice = createSlice({
  name: "carSales",
  initialState,
  reducers: {
    clearCarSales: (state) => {
      state.carSales = [];
      state.error = null;
      state.loading = false;
      state.totalPages = 0;
      state.currentPage = 1;
    },
    deleteCarSaleLocal: (state, action: PayloadAction<number>) => {
      state.carSales = state.carSales.filter((c) => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarSales.fulfilled, (state, action) => {
        state.loading = false;
        state.carSales = action.payload.carSales;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCarSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في جلب طلبات البيع";
      })
      .addCase(fetchCarSaleById.fulfilled, (state, action) => {
        state.loading = false;
        state.carSale = action.payload;
      })
      .addCase(addCarSale.fulfilled, (state, action) => {
        state.loading = false;
        state.carSales.unshift(action.payload);
      })
      .addCase(updateCarSale.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.carSales.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.carSales[index] = action.payload;
        }
      })
      .addCase(deleteCarSale.fulfilled, (state, action) => {
        state.loading = false;
        state.carSales = state.carSales.filter((c) => c.id !== action.payload);
      });
  },
});

export const selectCarSalesLoading = (state: RootState) =>
  state.carSales.loading;
export const { clearCarSales, deleteCarSaleLocal } = carSalesSlice.actions;
export default carSalesSlice.reducer;
