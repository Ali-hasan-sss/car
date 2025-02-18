// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import adminsReducer from "./Reducers/adminsReducer";
import servicesReducer from "./Reducers/servicesReducer";
import fileUploadReducer from "./Reducers/fileUploadReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admins: adminsReducer,
    services: servicesReducer,
    fileUpload: fileUploadReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
