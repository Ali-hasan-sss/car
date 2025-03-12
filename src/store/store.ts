import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import adminsReducer from "./Reducers/adminsReducer";
import servicesReducer from "./Reducers/servicesReducer";
import blogsReducer from "./Reducers/blogsReducer";
import fileUploadReducer from "./Reducers/fileUploadReducer";
import tableDataReducer from "./Reducers/tableDataReducer";
import socialMediaReducer from "./Reducers/socialMediaReducer"; // ✅ تحديث الاستيراد
import countriesReducer from "./slice/countriesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admins: adminsReducer,
    socialMedia: socialMediaReducer, // ✅ تحديثه هنا ليعمل بشكل صحيح
    services: servicesReducer,
    blogs: blogsReducer,
    fileUpload: fileUploadReducer,
    tableData: tableDataReducer,
    countries: countriesReducer,
  },
});

export default store;

// ✅ تحديث الأنواع بناءً على التعديلات الجديدة
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
