import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceUser } from "../../Types/adminTypes";

// الحالة الأولية
interface ServicesUserState {
  servicesList: ServiceUser[];
  selectedService: ServiceUser | null;
  lastUpdated: number;
}

const initialState: ServicesUserState = {
  servicesList: [],
  selectedService: null,
  lastUpdated: 0,
};

// إنشاء slice للخدمات
const servicesUserSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesUserSuccess(state, action: PayloadAction<ServiceUser[]>) {
      state.servicesList = action.payload;
      state.lastUpdated = Date.now();
    },
    selectUserService(state, action: PayloadAction<ServiceUser>) {
      state.selectedService = action.payload;
      state.lastUpdated = Date.now();
    },
  },
});

// تصدير الأكشنات
export const { fetchServicesUserSuccess, selectUserService } =
  servicesUserSlice.actions;

// تصدير الريدوكر
export default servicesUserSlice.reducer;
