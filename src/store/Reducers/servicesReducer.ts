import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service, ServicesState } from "./../../Types/adminTypes";

const initialState: ServicesState = {
  servicesList: [],
  selectedService: null,
  lastUpdated: 0,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesSuccess(state, action: PayloadAction<Service[]>) {
      state.servicesList = action.payload;
      state.lastUpdated = Date.now();
    },
    singleServiceSuccess(state, action: PayloadAction<Service>) {
      state.selectedService = action.payload;
    },
    selectService(state, action: PayloadAction<Service>) {
      state.selectedService = action.payload;
    },
    addService(state, action: PayloadAction<Service>) {
      state.servicesList.push(action.payload);
      state.lastUpdated = Date.now();
    },
    updateService(state, action: PayloadAction<Service>) {
      const index = state.servicesList.findIndex(
        (service) => service.id === action.payload.id
      );
      if (index !== -1) {
        state.servicesList[index] = {
          ...state.servicesList[index],
          ...action.payload,
        };
      }

      // ✅ تحديث selectedService إذا كانت نفس الخدمة
      if (state.selectedService?.id === action.payload.id) {
        state.selectedService = {
          ...state.selectedService,
          ...action.payload,
        };
      }

      state.lastUpdated = Date.now();
    },
    deleteService(state, action: PayloadAction<number>) {
      state.servicesList = state.servicesList.filter(
        (service) => service.id !== action.payload
      );
      state.lastUpdated = Date.now();
    },
  },
});

export const {
  fetchServicesSuccess,
  singleServiceSuccess,
  selectService,
  addService,
  updateService,
  deleteService,
} = servicesSlice.actions;
export default servicesSlice.reducer;
