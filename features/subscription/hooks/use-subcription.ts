import { useGetSubscriptionPlansQuery } from "../services/subcription.query";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSubscription = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetSubscriptionPlansQuery();

  const onSubscribe = async (planId: string) => {
    if (!user) {
      router.push("/login");
      toast.error("Please log in to subscribe.");
      return;
    }
  };

  return {
    user,
    subscription,
    isSubscriptionLoading,
    handlers: {
      onSubscribe,
    },
  };
};
