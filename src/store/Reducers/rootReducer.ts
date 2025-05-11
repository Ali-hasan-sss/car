// rootReducer.ts
import { combineReducers } from "redux";
import adminsReducer from "./adminsReducer";
import servicesReducer from "./servicesReducer";
import blogsReducer from "./blogsReducer";
import socialMediaReducer from "./socialMediaReducer";
import manufacturerReducer from "../slice/countriesSlice";
import servicesCustomer from "../slice/servicesCustomer";
import blogUser from "../slice/blogUser";

const rootReducer = combineReducers({
  admins: adminsReducer,
  services: servicesReducer,
  servicesUser: servicesCustomer,
  blogUser: blogUser,
  blogs: blogsReducer,
  socialMedia: socialMediaReducer,
  manufacturer: manufacturerReducer,
});

export default rootReducer;
