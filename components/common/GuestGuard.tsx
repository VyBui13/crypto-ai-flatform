"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAuthStore();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      router.push("/");
    } else {
      setIsChecked(true);
    }
  }, [isAuthenticated, accessToken, router]);

  if (!isChecked) {
    return null;
  }

  return <>{children}</>;
}
