import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://test.smarty.design/api/v1",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("Token");
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
