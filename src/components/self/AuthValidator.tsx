"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { validateAndUpdateAuthToken } from "@/lib/auth"; // Your JWT validation function (e.g., check expiration)
import AuthLoader from "./Loader"; // Your loader component
import { useLoader } from "@/hooks/useLoader";
import { useAuthStore } from "@/stores/authStore";

interface AuthValidatorProps {
  children: React.ReactNode;
}

export default function AuthValidator({ children }: AuthValidatorProps) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Detects route changes
  const { loading, toggleLoader } = useLoader(true);
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    let currentToken = token;

    // If the token is not in Zustand, try to retrieve it from localStorage.
    if (!currentToken) {
      const localToken = localStorage.getItem("jwt_token");
      if (localToken) {
        setToken(localToken);
        currentToken = localToken;
      }
    }

    // Validate the token. If it doesn't exist or is invalid, redirect to login.
    if (!currentToken || !validateAndUpdateAuthToken(currentToken)) {
      router.replace("/login"); // ✅ Use replace to avoid back button issues
    } else {
      // Token exists and is valid; hide the loader.
      toggleLoader(false);
    }
  }, [pathname, token, setToken, toggleLoader, router]); // ✅ Runs on every page change

  return (
    <div className="relative">
      {children}
      {loading && <AuthLoader />}
    </div>
  );
}
