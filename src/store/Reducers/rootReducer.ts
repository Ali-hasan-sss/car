// rootReducer.ts
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import adminsReducer from "./adminsReducer";
import servicesReducer from "./servicesReducer";
import blogsReducer from "./blogsReducer";
import socialMediaReducer from "./socialMediaReducer";
import countriesReducer from "../slice/countriesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  admins: adminsReducer,
  services: servicesReducer,
  blogs: blogsReducer,
  socialMedia: socialMediaReducer,
  countries: countriesReducer,
});

export default rootReducer;
