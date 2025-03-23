import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { Order } from "@/Types/orderTypes";
import axios from "axios";

// الحالة الابتدائية
interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

// دالة استخراج رسالة الخطأ
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return "حدث خطأ غير متوقع";
}

// جلب الطلبات
export const fetchOrders = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>("orders/fetchOrders", async (API, thunkAPI) => {
  try {
    const response = await axiosInstance.get(API);
    return response.data.data as Order[];
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// إضافة طلب
export const addOrder = createAsyncThunk<
  Order,
  Partial<Order>,
  { rejectValue: string }
>("orders/addOrder", async (orderData, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/api/orders", orderData);
    return response.data.data as Order;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// تعديل طلب
export const updateOrder = createAsyncThunk<
  Order,
  { id: number; updatedData: Partial<Order> },
  { rejectValue: string }
>("orders/updateOrder", async ({ id, updatedData }, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`/api/orders/${id}`, updatedData);
    return response.data.data as Order;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// حذف طلب
export const deleteOrder = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("orders/deleteOrder", async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`/api/orders/${id}`);
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
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(
        fetchOrders.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "فشل في جلب الطلبات";
        }
      )

      // Add
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.unshift(action.payload);
      })

      // Update
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      // Delete
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.orders = state.orders.filter((o) => o.id !== action.payload);
        }
      );
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
