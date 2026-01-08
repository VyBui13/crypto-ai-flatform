import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "./auth.api";

// Hook Login
export const useLoginMutation = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginUser, // Gọi hàm API
    onSuccess: (data) => {
      setAuth(data.accessToken);
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
  return useMutation({
    mutationFn: registerUser,
    // onSuccess: () => {
    // },
  });
};
