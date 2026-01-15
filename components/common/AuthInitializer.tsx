"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { getUserProfile } from "@/features/auth/services/auth.api";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lấy các hàm từ store (đảm bảo store đã persist xong)
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      console.log("AuthInitializer: Initializing auth...");
      console.log("AccessToken:", accessToken);
      if (!accessToken) {
        setIsInitializing(false);
        return;
      }

      try {
        const user = await getUserProfile();
        console.log("User profile fetched:", user);
        setUser(user);
      } catch (error) {
        console.error("Token verification failed:", error);
        logout();
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [accessToken, setUser, logout]);

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-4">
        {/* Spinner đơn giản hoặc Logo của bạn */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return <>{children}</>;
}
