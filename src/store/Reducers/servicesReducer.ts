// servicesReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service, ServicesState } from "./../../Types/servicesTypes";

const initialState: ServicesState = {
  servicesList: [],
  selectedService: null,
};
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
    addService(state, action: PayloadAction<Service>) {
      state.servicesList.push(action.payload);
    },
    updateService(state, action: PayloadAction<Service>) {
      const index = state.servicesList.findIndex(
        (service) => service.id === action.payload.id
      );
      if (index !== -1) {
        state.servicesList[index] = action.payload;
      }
    },
    deleteService(state, action: PayloadAction<number>) {
      state.servicesList = state.servicesList.filter(
        (service) => service.id !== action.payload
      );
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
