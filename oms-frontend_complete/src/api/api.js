// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
