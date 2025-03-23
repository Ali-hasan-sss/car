import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import adminsReducer from "./Reducers/adminsReducer";
import servicesReducer from "./Reducers/servicesReducer";
import blogsReducer from "./Reducers/blogsReducer";
import fileUploadReducer from "./Reducers/fileUploadReducer";
import tableDataReducer from "./Reducers/tableDataReducer";
import socialMediaReducer from "./Reducers/socialMediaReducer";
import countriesReducer from "./slice/countriesSlice";
import manufacturerReducer from "./slice/manufacturerSlice";
import adminManufacturerSlice from "./slice/adminManufacturerSlice";
import usersReducer from "./slice/usersSlice";
import ordersReducer from "./slice/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admins: adminsReducer,
    users: usersReducer,
    socialMedia: socialMediaReducer,
    services: servicesReducer,
    blogs: blogsReducer,
    fileUpload: fileUploadReducer,
    tableData: tableDataReducer,
    countries: countriesReducer,
    manufacturer: manufacturerReducer,
    adminManufacturer: adminManufacturerSlice,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
