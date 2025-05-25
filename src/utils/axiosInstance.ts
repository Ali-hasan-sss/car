import axios from "axios";
import { base_url } from "./domain";

const axiosInstance = axios.create({
  baseURL: `https://${base_url}/api/v1`,
  timeout: 100000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { default: store } = await import("../store/store");
    const state = store.getState();
    const token = state.auth.authToken;
    const userRole = state.auth.user?.userRole;
    const storedLanguage = state.auth.lang;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (typeof window !== "undefined") {
      const isDashboard = window.location.pathname.includes("/dashboard");

      if (userRole === "ADMIN") {
        if (isDashboard) {
          config.headers["Accept-Language"] = "not";
          config.headers["lang"] = "not";
        } else {
          config.headers["Accept-Language"] = storedLanguage;
          config.headers["lang"] = storedLanguage;
        }
      } else {
        config.headers["Accept-Language"] = storedLanguage;
        config.headers["lang"] = storedLanguage;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
