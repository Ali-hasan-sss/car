import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableDataState<T> {
  [key: string]: T[]; // تخزين البيانات حسب `apiUrl`
}

// ✅ تعريف `initialState` ليكون من نوع `TableDataState<unknown>`
const initialState: TableDataState<unknown> = {};

const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    setTableData: <T>(
      state: TableDataState<T>,
      action: PayloadAction<{ key: string; data: T[] }>
    ) => {
      state[action.payload.key] = action.payload.data;
    },
  },
});

export const { setTableData } = tableDataSlice.actions;
export default tableDataSlice.reducer;
