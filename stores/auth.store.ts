import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthRole, User } from "@/features/auth/types/auth.type";
import { getUserProfile } from "@/features/auth/services/auth.api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Actions
  setAuth: (accessToken: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;

  setIsHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (accessToken) => set({ accessToken, isAuthenticated: true }),

      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),

      setIsHydrated: () => set({ isHydrated: true }),

      checkAuth: async () => {
        try {
          const user = await getUserProfile();
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error("Token invalid:", error);
          set({ user: null, accessToken: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        // 'state' ở đây chính là AuthState (bao gồm cả data và actions)
        // Chúng ta gọi action setIsHydrated() thay vì state.setState()
        state?.setIsHydrated();
      },
    }
  )
);
