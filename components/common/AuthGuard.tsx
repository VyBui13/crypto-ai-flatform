"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAuthStore();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      router.push("/login");
    } else {
      setIsChecked(true);
    }
  }, [isAuthenticated, accessToken, router]);

  if (!isChecked) {
    return null;
  }

  return <>{children}</>;
}
