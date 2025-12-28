import { User } from "@/features/auth/types/auth.type";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  // Actions chỉ để set state
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
