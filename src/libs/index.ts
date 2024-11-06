import axios from "axios";

const API_ENDPOINT = "http://localhost:5000/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  // maxRate: 10,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
