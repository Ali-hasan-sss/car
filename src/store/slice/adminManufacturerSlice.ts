import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

interface CModel {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  cmodels: CModel[];
}

interface ManufacturerData {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  categories: Category[];
}

interface ManufacturerState {
  manufacturer: ManufacturerData | null;
  manufacturers: ManufacturerData[];
  loading: boolean;
  error: string | null;
}

const initialState: ManufacturerState = {
  manufacturer: null,
  manufacturers: [],
  loading: false,
  error: null,
};

// ========== Async Thunks ==========
export const fetchManufacturer = createAsyncThunk(
  "manufacturer/fetch",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`admin/manufacturers/${id}`);
      return res.data.data as ManufacturerData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "حدث خطأ");
    }
  }
);
export const fetchManufacturers = createAsyncThunk(
  "manufacturer/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`admin/manufacturers`);
      return res.data.data as ManufacturerData[];
    } catch (error) {
      return rejectWithValue(error || "حدث خطأ أثناء جلب الشركات");
    }
  }
);
// ========== Slice ==========
const adminManufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    // --- Category Actions ---
    addCategory(state, action: PayloadAction<Category>) {
      state.manufacturer?.categories.push(action.payload);
    },
    editCategory(state, action: PayloadAction<Category>) {
      const index = state.manufacturer?.categories.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== undefined && index >= 0 && state.manufacturer) {
        state.manufacturer.categories[index] = action.payload;
      }
    },
    deleteCategory(state, action: PayloadAction<number>) {
      if (state.manufacturer) {
        state.manufacturer.categories = state.manufacturer.categories.filter(
          (cat) => cat.id !== action.payload
        );
      }
    },

    // --- Car Model Actions ---
    addCarModel(
      state,
      action: PayloadAction<{ categoryId: number; model: CModel }>
    ) {
      const category = state.manufacturer?.categories.find(
        (cat) => cat.id === action.payload.categoryId
      );
      category?.cmodels.push(action.payload.model);
    },
    editCarModel(
      state,
      action: PayloadAction<{ categoryId: number; model: CModel }>
    ) {
      const category = state.manufacturer?.categories.find(
        (cat) => cat.id === action.payload.categoryId
      );
      if (category) {
        const modelIndex = category.cmodels.findIndex(
          (m) => m.id === action.payload.model.id
        );
        if (modelIndex >= 0) {
          category.cmodels[modelIndex] = action.payload.model;
        }
      }
    },
    deleteCarModel(
      state,
      action: PayloadAction<{ categoryId: number; modelId: number }>
    ) {
      const category = state.manufacturer?.categories.find(
        (cat) => cat.id === action.payload.categoryId
      );
      if (category) {
        category.cmodels = category.cmodels.filter(
          (m) => m.id !== action.payload.modelId
        );
      }
    },
    updateManufacturerInList(state, action: PayloadAction<ManufacturerData>) {
      const index = state.manufacturers.findIndex(
        (m) => m.id === action.payload.id
      );
      if (index >= 0) {
        state.manufacturers[index] = action.payload;
      }
    },
    addManufacturerToList(state, action: PayloadAction<ManufacturerData>) {
      state.manufacturers.push(action.payload);
    },
    deleteManufacturerFromList(state, action: PayloadAction<number>) {
      state.manufacturers = state.manufacturers.filter(
        (m) => m.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchManufacturer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        state.manufacturer = action.payload;
      })
      .addCase(fetchManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchManufacturers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.loading = false;
        state.manufacturers = action.payload;
      })
      .addCase(fetchManufacturers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addCategory,
  editCategory,
  deleteCategory,
  addCarModel,
  editCarModel,
  deleteCarModel,
  updateManufacturerInList,
  addManufacturerToList,
  deleteManufacturerFromList,
} = adminManufacturerSlice.actions;

export default adminManufacturerSlice.reducer;
