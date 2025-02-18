import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service } from "../../Types/servicesTypes";

// الحالة الأولية
interface ServicesState {
  servicesList: Service[];
  selectedService: Service | null;
}

const initialState: ServicesState = {
  servicesList: [],
  selectedService: null,
};

// إنشاء slice للخدمات
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesSuccess(state, action: PayloadAction<Service[]>) {
      state.servicesList = action.payload;
    },
    selectService(state, action: PayloadAction<Service>) {
      state.selectedService = action.payload;
    },
  },
});

// تصدير الأكشنات
export const { fetchServicesSuccess, selectService } = servicesSlice.actions;

// تصدير الريدوكر
export default servicesSlice.reducer;
