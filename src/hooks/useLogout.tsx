"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    useAuthStore.getState().clearAuth();

    localStorage.removeItem("jwt_token");

    router.push("/login");
  };

  return logout;
}
