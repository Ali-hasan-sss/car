import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Port, PortState } from "../../Types/adminTypes";

const initialState: PortState = {
  portsList: [],
  selectedPort: null,
  lastUpdated: 0, // وقت آخر تحديث
};

const portsSlice = createSlice({
  name: "ports",
  initialState,
  reducers: {
    fetchPortsSuccess(state, action: PayloadAction<Port[]>) {
      state.portsList = action.payload;
      state.lastUpdated = Date.now();
    },
    selectPort(state, action: PayloadAction<Port>) {
      state.selectedPort = action.payload;
    },
    addPort(state, action: PayloadAction<Port>) {
      state.portsList.push(action.payload);
      state.lastUpdated = Date.now();
    },
    updatePort(state, action: PayloadAction<Port>) {
      const index = state.portsList.findIndex(
        (country) => country.id === action.payload.id
      );
      if (index !== -1) {
        state.portsList[index] = {
          ...state.portsList[index],
          ...action.payload,
        };
        state.lastUpdated = Date.now();
      }
    },
    deletePort(state, action: PayloadAction<number>) {
      state.portsList = state.portsList.filter(
        (country) => country.id !== action.payload
      );
      state.lastUpdated = Date.now();
    },
  },
});

export const {
  fetchPortsSuccess,
  selectPort,
  addPort,
  updatePort,
  deletePort,
} = portsSlice.actions;

export default portsSlice.reducer;
