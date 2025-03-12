import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country, CountriesState } from "../../Types/adminTypes";

const initialState: CountriesState = {
  countriesList: [],
  selectedCountry: null,
  lastUpdated: 0, // وقت آخر تحديث
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    fetchCountriesSuccess(state, action: PayloadAction<Country[]>) {
      state.countriesList = action.payload;
      state.lastUpdated = Date.now();
    },
    selectCountry(state, action: PayloadAction<Country>) {
      state.selectedCountry = action.payload;
    },
    addCountry(state, action: PayloadAction<Country>) {
      state.countriesList.push(action.payload);
      state.lastUpdated = Date.now();
    },
    updateCountry(state, action: PayloadAction<Country>) {
      const index = state.countriesList.findIndex(
        (country) => country.id === action.payload.id
      );
      if (index !== -1) {
        state.countriesList[index] = {
          ...state.countriesList[index],
          ...action.payload,
        };
        state.lastUpdated = Date.now();
      }
    },
    deleteCountry(state, action: PayloadAction<number>) {
      state.countriesList = state.countriesList.filter(
        (country) => country.id !== action.payload
      );
      state.lastUpdated = Date.now();
    },
  },
});

export const {
  fetchCountriesSuccess,
  selectCountry,
  addCountry,
  updateCountry,
  deleteCountry,
} = countriesSlice.actions;

export default countriesSlice.reducer;
