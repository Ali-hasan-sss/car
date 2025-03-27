import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { Order } from "@/Types/orderTypes";
import axios from "axios";
import { toast } from "sonner";
import { RootState } from "../store"; // تأكد من صحة المسار

// الحالة الابتدائية
interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  order: Order | null;
  totalPages: number; // عدد الصفحات
  currentPage: number; // الصفحة الحالية
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  order: null,
  totalPages: 0, // عدد الصفحات يبدأ من 0
  currentPage: 1, // الصفحة الحالية تبدأ من 1
};

// دالة استخراج رسالة الخطأ
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return "حدث خطأ غير متوقع";
}

// ✅ جلب الطلبات
export const fetchOrders = createAsyncThunk<
  { orders: Order[]; totalPages: number; currentPage: number }, // مخرجات الـ action
  { API: string },
  { rejectValue: string }
>("orders/fetchOrders", async ({ API }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(API); // استخدام الرابط المرسل بشكل مباشر
    const { data } = response.data;
    return {
      orders: data.carAuctions as Order[],
      totalPages: data.total_pages,
      currentPage: data.currentPage,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ جلب طلب واحد حسب المعرف
export const fetchOrderById = createAsyncThunk<
  Order,
  { apiUrl: string; id: number },
  { rejectValue: string }
>("orders/fetchOrderById", async ({ apiUrl, id }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/${id}`);
    return response.data.data as Order;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
// ✅ إضافة طلب
export const addOrder = createAsyncThunk<
  Order,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { apiUrl: string; orderData: Partial<any> },
  { rejectValue: string }
>("orders/addOrder", async ({ apiUrl, orderData }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(apiUrl, orderData);
    toast.success("تم إرسال الطلب بنجاح");
    return response.data.data as Order;
  } catch (error) {
    toast.error("حدث خطأ أثناء الإرسال");
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ تعديل طلب
export const updateOrder = createAsyncThunk<
  Order,
  {
    apiUrl: string;
    id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedData: Partial<Order> | Record<string, any>;
  },
  { rejectValue: string }
>("orders/updateOrder", async ({ apiUrl, id, updatedData }, thunkAPI) => {
  try {
    const fullUrl = `${apiUrl}/${id}`;
    const response = await axiosInstance.put(fullUrl, updatedData);
    toast.success("تم تعديل الطلب بنجاح");
    return response.data.data as Order;
  } catch (error) {
    toast.error("حدث خطأ أثناء الإرسال");
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ حذف طلب
export const deleteOrder = createAsyncThunk<
  number,
  { apiUrl: string; id: number },
  { rejectValue: string }
>("orders/deleteOrder", async ({ apiUrl, id }, thunkAPI) => {
  try {
    await axiosInstance.delete(apiUrl);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
      state.loading = false;
      state.totalPages = 0; // إعادة تعيين عدد الصفحات
      state.currentPage = 1; // إعادة تعيين الصفحة الحالية
    },
    deleteOrderLocal: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ جلب جميع الطلبات
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: Order[];
            totalPages: number;
            currentPage: number;
          }>
        ) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.totalPages = action.payload.totalPages; // تعيين عدد الصفحات
          state.currentPage = action.payload.currentPage; // تعيين الصفحة الحالية
        }
      )
      .addCase(
        fetchOrders.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "فشل في جلب الطلبات";
        }
      )

      // ✅ جلب طلب واحد
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.order = action.payload;
          // التأكد من عدم تكرار الطلب في القائمة وإضافته فقط عند الحاجة
          const index = state.orders.findIndex(
            (o) => o.id === action.payload.id
          );
          if (index === -1) {
            state.orders.push(action.payload);
          }
        }
      )
      .addCase(
        fetchOrderById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "فشل في جلب الطلب";
        }
      )

      // ✅ إضافة طلب
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(addOrder.rejected, (state) => {
        state.loading = false;
      })

      // ✅ تعديل طلب
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state) => {
        state.loading = false;
      })

      // ✅ حذف طلب
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.orders = state.orders.filter((o) => o.id !== action.payload);
        }
      )
      .addCase(deleteOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

// ✅ إضافة `selector` لحالة جلب الطلبات
export const selectOrdersLoading = (state: RootState) => state.orders.loading;

// ✅ تصدير الإجراءات والمخفض
export const { clearOrders, deleteOrderLocal } = orderSlice.actions;
export default orderSlice.reducer;
