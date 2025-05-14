// rootReducer.ts
import { combineReducers } from "redux";
import adminsReducer from "./adminsReducer";
import servicesReducer from "./servicesReducer";
import blogsReducer from "./blogsReducer";
import socialMediaReducer from "./socialMediaReducer";
import manufacturerReducer from "../slice/countriesSlice";
import servicesCustomer from "../slice/servicesCustomer";
import blogUser from "../slice/blogUser";
import notificationsReducer from "../slice/notificationsSlice";

const rootReducer = combineReducers({
  admins: adminsReducer,
  services: servicesReducer,
  servicesUser: servicesCustomer,
  blogUser: blogUser,
  blogs: blogsReducer,
  socialMedia: socialMediaReducer,
  manufacturer: manufacturerReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
