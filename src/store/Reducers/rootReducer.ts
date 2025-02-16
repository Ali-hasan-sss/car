// rootReducer.ts
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import adminsReducer from "./adminsReducer";
import servicesReducer from "./servicesReducer";
import blogsReducer from "./blogsReducer";
import socialMediaReducer from "./socialMediaReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admins: adminsReducer,
  services: servicesReducer,
  blogs: blogsReducer,
  socialMedia: socialMediaReducer,
});

export default rootReducer;
