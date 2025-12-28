import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "./auth.api";

// Hook Login
export const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser, // Gọi hàm API
    onSuccess: (data) => {
      setUser(data);
      router.push("/");
    },
    onError: (error: Error) => {
      console.log("Login failed:", error.message);
      // Có thể hiển thị Toast error ở đây nếu muốn
    },
  });
};

// Hook Register
export const useRegisterMutation = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data);
      router.push("/");
    },
  });
};
