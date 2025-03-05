import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle logout and store session expiration message
const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    useAuthStore.getState().setToken(null); // ✅ Clear Zustand token
    localStorage.removeItem("jwt_token"); // ✅ Remove stored token
    window.location.href = "/login"; // ✅ Redirect to login
  }
};

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    if (!config.skipAuth) {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized: Redirecting to login...");
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default api;
