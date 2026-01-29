import { useMutation } from "@tanstack/react-query";
import { buySubscription } from "./subcription.api";
import { useAuthStore } from "@/stores/auth.store";

export const useSubcribtionMutation = () => {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: buySubscription,
    onSuccess: () => {
      logout();
    },
  });
};
