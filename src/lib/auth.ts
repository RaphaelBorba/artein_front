// src/lib/auth.ts
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/authStore";

interface DecodedToken {
  exp: number;       // expiration time in seconds
  userId: string;
  name: string;
  username: string;
}

/**
 * Decodes the token, verifies its expiration, and updates the Zustand store with user details.
 *
 * @param token - The JWT token as a string.
 * @returns {boolean} - True if the token is valid and user data was updated; false otherwise.
 */
export function validateAndUpdateAuthToken(token: string): boolean {
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    
    // Check if token has expired (decoded.exp is in seconds)
    if (decoded.exp * 1000 < Date.now()) {
      return false;
    }
    // Update the global auth store with user data
    useAuthStore.getState().setUser({
      userId: decoded.userId,
      name: decoded.name,
      username: decoded.username,
    });
    
    return true;
  } catch (error) {
    console.error("Failed to decode or validate token:", error);
    return false;
  }
}
