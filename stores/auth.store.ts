import { AuthRole, User } from "@/features/auth/types/auth.type";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // (Tuỳ chọn) Thêm persist để F5 không mất login

interface AuthState {
  user: User | null;
  accessToken: string | null; // <--- Thêm dòng này
  isAuthenticated: boolean;

  setAuth: (accessToken: string) => void; // <--- Cập nhật hàm này
  setUser: (user: User) => void;
  logout: () => void;
  upgradeToVip: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null, // <--- Khởi tạo null
      isAuthenticated: false,

      setAuth: (accessToken) => set({ accessToken, isAuthenticated: true }),
      setUser: (user) => set({ user }),
      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),

      upgradeToVip: () =>
        set((state) => ({
          user: state.user ? { ...state.user, role: AuthRole.VIP } : null,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
