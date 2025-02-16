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
  },
});

export const { fetchServicesSuccess, selectService } = servicesSlice.actions;
export default servicesSlice.reducer;
