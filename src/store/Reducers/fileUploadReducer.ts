import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileUploadState {
  imageUrl: string | null;
  imageName: string | null;
}

const initialState: FileUploadState = {
  imageUrl: null,
  imageName: null,
};

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    uploadFileSuccess: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
      state.imageName = action.payload;
    },
  },
});

export const { uploadFileSuccess } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
