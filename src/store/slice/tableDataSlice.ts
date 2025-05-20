import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TableDataState<T> {
  data: Record<string, T[]>;
  loading: boolean;
  error: string | null;
}
const initialState: TableDataState<unknown> = {
  data: {},
  loading: false,
  error: null,
};

export const fetchTableData = createAsyncThunk<
  { apiUrl: string; data: unknown[] },
  string,
  { rejectValue: string }
>("tableData/fetchTableData", async (apiUrl, { rejectWithValue }) => {
  try {
    const response = await axios.get<unknown[]>(apiUrl); // ✅ تأكيد أن البيانات مصفوفة من `unknown`
    return { apiUrl, data: response.data };
  } catch (error: unknown) {
    // ✅ معالجة الخطأ دون استخدام `any`
    if (axios.isAxiosError(error) && error.response?.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue("خطأ في جلب البيانات");
  }
});

// ✅ `Slice` عام مع `T`
const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    clearTableData: (state) => {
      state.data = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTableData.fulfilled,
        (state, action: PayloadAction<{ apiUrl: string; data: unknown[] }>) => {
          state.loading = false;
          state.data[action.payload.apiUrl] = action.payload.data;
        }
      )
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTableData } = tableDataSlice.actions;
export default tableDataSlice.reducer;
