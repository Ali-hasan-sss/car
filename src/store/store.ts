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
import auctionSlice from "./slice/AuctionsSlice";
import carSalesReducer from "./slice/carSalesSlice";
import userReducer from "./slice/userSlice";
import servicesuserReducer from "./slice/servicesCustomer";
import carShippingReducer from "./slice/ShippingSlice";
import BlogUserReducer from "./slice/blogUser";
import notificationsReducer from "./slice/notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admins: adminsReducer,
    socialMedia: socialMediaReducer,
    services: servicesReducer,
    servicesUser: servicesuserReducer,
    blogs: blogsReducer,
    blogsUser: BlogUserReducer,
    fileUpload: fileUploadReducer,
    tableData: tableDataReducer,
    countries: countriesReducer,
    manufacturer: manufacturerReducer,
    adminManufacturer: adminManufacturerSlice,
    auctions: auctionSlice,
    carSales: carSalesReducer,
    carShippings: carShippingReducer,
    notifications: notificationsReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
