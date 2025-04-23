import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { RootState } from "../store"; // تأكد من صحة المسار
import { Auction } from "@/Types/AuctionTypes";

// الحالة الابتدائية
interface AuctionsState {
  auctions: Auction[];
  loading: boolean;
  actionLoadingIds: number[];
  error: string | null;
  auction: Auction | null;
  totalPages: number;
  currentPage: number;
}

const initialState: AuctionsState = {
  auctions: [],
  loading: false,
  actionLoadingIds: [],
  error: null,
  auction: null,
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

// ✅ جلب المزادات
export const fetchAuctions = createAsyncThunk<
  { auctions: Auction[]; totalPages: number; currentPage: number },
  { API: string },
  { rejectValue: string }
>("auctions/fetchAuctions", async ({ API }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(API);
    const { data } = response.data;
    return {
      auctions: data.carAuctions as Auction[],
      totalPages: data.total_pages,
      currentPage: data.currentPage,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ جلب مزاد واحد حسب المعرف
export const fetchAuctionById = createAsyncThunk<
  Auction,
  { apiUrl: string; id: number },
  { rejectValue: string }
>("auctions/fetchAuctionById", async ({ apiUrl, id }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/${id}`);
    return response.data.data as Auction;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ إضافة مزاد
export const addAuction = createAsyncThunk<
  Auction,
  { apiUrl: string; auctionData: Partial<Auction> },
  { rejectValue: string }
>("auctions/addAuction", async ({ apiUrl, auctionData }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(apiUrl, auctionData);
    return response.data.data as Auction;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ تعديل مزاد
export const updateAuction = createAsyncThunk<
  Auction,
  { apiUrl: string; id: number; updatedData: Partial<Auction> },
  { rejectValue: string }
>("auctions/updateAuction", async ({ apiUrl, id, updatedData }, thunkAPI) => {
  try {
    const fullUrl = `${apiUrl}/${id}`;
    const response = await axiosInstance.put(fullUrl, updatedData);
    return response.data.data as Auction;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ✅ حذف مزاد
export const deleteAuction = createAsyncThunk<
  number,
  { apiUrl: string; id: number },
  { rejectValue: string }
>("auctions/deleteAuction", async ({ apiUrl, id }, thunkAPI) => {
  try {
    await axiosInstance.delete(apiUrl);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
const addLoadingId = (state: AuctionsState, id: number) => {
  if (!state.actionLoadingIds.includes(id)) {
    state.actionLoadingIds.push(id);
  }
};

const removeLoadingId = (state: AuctionsState, id: number) => {
  state.actionLoadingIds = state.actionLoadingIds.filter(
    (loadingId) => loadingId !== id
  );
};

const auctionSlice = createSlice({
  name: "auctions",
  initialState,
  reducers: {
    clearAuctions: (state) => {
      state.auctions = [];
      state.error = null;
      state.loading = false;
      state.totalPages = 0;
      state.currentPage = 1;
    },
    deleteAuctionLocal: (state, action: PayloadAction<number>) => {
      state.auctions = state.auctions.filter((a) => a.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAuctions
      .addCase(fetchAuctions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctions.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload.auctions;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchAuctions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في جلب المزادات";
      })

      // fetchAuctionById
      .addCase(fetchAuctionById.fulfilled, (state, action) => {
        state.loading = false;
        state.auction = action.payload;
        const index = state.auctions.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index === -1) {
          state.auctions.push(action.payload);
        }
      })

      // addAuction
      .addCase(updateAuction.pending, (state, action) => {
        addLoadingId(state, action.meta.arg.id);
      })
      .addCase(updateAuction.fulfilled, (state, action) => {
        removeLoadingId(state, action.meta.arg.id);
        const index = state.auctions.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index !== -1) {
          state.auctions[index] = action.payload;
        }
      })
      .addCase(updateAuction.rejected, (state, action) => {
        removeLoadingId(state, action.meta.arg.id);
        state.error = action.payload || "فشل في تعديل المزاد";
      })

      // deleteAuction
      .addCase(deleteAuction.pending, (state, action) => {
        addLoadingId(state, action.meta.arg.id); // ✅ أضف الـ id الجاري حذفه
      })
      .addCase(deleteAuction.fulfilled, (state, action) => {
        removeLoadingId(state, action.meta.arg.id); // ✅ أزله من التحميل
        state.auctions = state.auctions.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteAuction.rejected, (state, action) => {
        removeLoadingId(state, action.meta.arg.id); // ✅ أزله من التحميل حتى لو فشل
        state.error = action.payload || "فشل في حذف المزاد";
      });
  },
});

export const selectAuctionsLoading = (state: RootState) =>
  state.auctions.loading;
export const { clearAuctions, deleteAuctionLocal } = auctionSlice.actions;
export default auctionSlice.reducer;
