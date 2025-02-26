import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SocialMedia, SocialMediaState } from "../../Types/adminTypes";

const initialState: SocialMediaState = {
  socialMediaList: [],
  selectedSocialMedia: null,
  lastUpdated: 0, // وقت آخر تحديث
};

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    fetchSocialMediaSuccess(state, action: PayloadAction<SocialMedia[]>) {
      state.socialMediaList = action.payload;
      state.lastUpdated = Date.now(); // ✅ تحديث وقت آخر تحديث
    },
    selectSocialMedia(state, action: PayloadAction<SocialMedia>) {
      state.selectedSocialMedia = action.payload;
    },
    addSocialMedia(state, action: PayloadAction<SocialMedia>) {
      state.socialMediaList.push(action.payload);
      state.lastUpdated = Date.now(); // ✅ تحديث وقت آخر تحديث
    },
    updateSocialMedia(state, action: PayloadAction<SocialMedia>) {
      const index = state.socialMediaList.findIndex(
        (social) => social.id === action.payload.id
      );
      if (index !== -1) {
        state.socialMediaList[index] = {
          ...state.socialMediaList[index],
          ...action.payload,
        };
        state.lastUpdated = Date.now(); // ✅ تحديث وقت آخر تحديث
      }
    },
    deleteSocialMedia(state, action: PayloadAction<number>) {
      state.socialMediaList = state.socialMediaList.filter(
        (social) => social.id !== action.payload
      );
      state.lastUpdated = Date.now(); // ✅ تحديث وقت آخر تحديث
    },
  },
});

// ✅ تصدير الـ actions لاستخدامها في dispatch
export const {
  fetchSocialMediaSuccess,
  selectSocialMedia,
  addSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} = socialMediaSlice.actions;

// ✅ تصدير الـ reducer
export default socialMediaSlice.reducer;
