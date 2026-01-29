import { useGetSubscriptionPlansQuery } from "../services/subcription.query";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSubcribtionMutation } from "../services/subcription.mutation";

export const useSubscription = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetSubscriptionPlansQuery();

  const { mutateAsync: buySubscription, isPending: isBuyingSubscription } =
    useSubcribtionMutation();

  const onSubscribe = async (planId: string) => {
    if (!user) {
      router.push("/login");
      toast.error("Please log in to subscribe.");
      return;
    }

    try {
      await buySubscription({ planId });
      toast.success("Subscription successful!");
      router.push("/login");
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
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
