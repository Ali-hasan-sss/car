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
    const token = Store.getState().auth.authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = "not"; // لجلب اللغتين للأدمن
    config.headers["lang"] = "not"; // لجلب اللغتين للأدمن

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
