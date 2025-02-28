import axios from "axios";
import Store from "../store/store";
import { base_url } from "./domain";

const axiosInstance = axios.create({
  baseURL: `https://${base_url}/api/v1`,
  timeout: 100000, // زيادة المهلة إلى 10 ثوانٍ
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", // تعيين Content-Type
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = Store.getState();
    const token = state.auth.authToken;
    const userRole = state.auth.user?.userRole;
    const storedLanguage = state.auth.lang;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (userRole === "ADMIN") {
      config.headers["Accept-Language"] = "not";
      config.headers["lang"] = "not";
    } else {
      config.headers["Accept-Language"] = storedLanguage;
      config.headers["lang"] = storedLanguage;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
