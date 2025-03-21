// rootReducer.ts
import { combineReducers } from "redux";
import adminsReducer from "./adminsReducer";
import servicesReducer from "./servicesReducer";
import blogsReducer from "./blogsReducer";
import socialMediaReducer from "./socialMediaReducer";
import manufacturerReducer from "../slice/countriesSlice";

const rootReducer = combineReducers({
  admins: adminsReducer,
  services: servicesReducer,
  blogs: blogsReducer,
  socialMedia: socialMediaReducer,
  manufacturer: manufacturerReducer,
});

export default rootReducer;
