// src/stores/authStore.ts
import { create } from "zustand";

interface User {
    userId: string;
    name: string;
    username: string;
}

interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;
    clearAuth: () => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    setToken: (token: string | null) => set({ token }),
    clearAuth: () => set({ token: null, user: null }),
    user: null,
    setUser: (user) => set({ user }),
}));
