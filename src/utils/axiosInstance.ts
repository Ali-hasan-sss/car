// axiosInstance.ts
import axios from "axios";
import Store from "../store/store"; // استيراد Store
import { base_url } from "./domain";

const axiosInstance = axios.create({
  baseURL: `https://${base_url}/api/v1`,
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Store.getState().auth.authToken; // قراءة token من Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
