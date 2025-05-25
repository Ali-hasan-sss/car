import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeroState {
  images: string[];
}

const initialState: HeroState = {
  images: [],
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload;
    },
  },
});

export const { setHeroImages } = heroSlice.actions;
export default heroSlice.reducer;
