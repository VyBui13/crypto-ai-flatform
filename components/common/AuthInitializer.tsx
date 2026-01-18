"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Lấy trạng thái hydrated và hàm checkAuth từ store
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const accessToken = useAuthStore((state) => state.accessToken);

  // 2. State local để hiển thị loading trong lúc đang gọi API verify token
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Nếu store chưa load xong từ localStorage -> Chưa làm gì cả
    console.log("AuthInitializer: isHydrated =", isHydrated);
    if (!isHydrated) return;

    const initAuth = async () => {
      console.log("AuthInitializer: Store hydrated. Checking auth...");

      // Gọi hàm logic trong store (nó sẽ tự check token, gọi API, set user/logout)
      await checkAuth();

      // Xong xuôi thì tắt loading
      setIsChecking(false);
    };

    initAuth();
  }, [accessToken, checkAuth, isHydrated]);

  // 3. Hiển thị Loading khi:
  // - Store chưa load xong (isHydrated = false)
  // - HOẶC đang gọi API kiểm tra (isChecking = true)
  if (!isHydrated || isChecking) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">
          {!isHydrated ? "Đang khởi tạo..." : "Đang kiểm tra thông tin..."}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
