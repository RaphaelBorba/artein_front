// src/lib/api.ts
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach the token if skipAuth is not true.
api.interceptors.request.use(
  (config) => {
    // Check if skipAuth flag is not set
    if (!config.skipAuth) {
      // Retrieve the token from localStorage (or any other storage)
      const token = useAuthStore.getState().token;
      if (token) {
        // Attach the token to the Authorization header
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
