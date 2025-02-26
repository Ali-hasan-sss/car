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
      state.lastUpdated = Date.now(); // <-- تحديث وقت آخر تحديث
    },
    selectService(state, action: PayloadAction<Service>) {
      state.selectedService = action.payload;
    },
    addService(state, action: PayloadAction<Service>) {
      state.servicesList.push(action.payload);
      state.lastUpdated = Date.now(); // <-- تحديث وقت آخر تعديل
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
        state.lastUpdated = Date.now(); // <-- تحديث وقت آخر تعديل
      }
    },
    deleteService(state, action: PayloadAction<number>) {
      state.servicesList = state.servicesList.filter(
        (service) => service.id !== action.payload
      );
      state.lastUpdated = Date.now(); // <-- تحديث وقت آخر تعديل
    },
  },
});

export const {
  fetchServicesSuccess,
  selectService,
  addService,
  updateService,
  deleteService,
} = servicesSlice.actions;
export default servicesSlice.reducer;
