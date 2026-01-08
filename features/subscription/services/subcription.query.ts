import { useQuery } from "@tanstack/react-query";
import { getSubscriptionPlans } from "./subcription.api";
import { SUBSCRIPTION_KEYS } from "../constants/subcription.key";

export const useGetSubscriptionPlansQuery = () => {
  return useQuery({
    queryKey: [SUBSCRIPTION_KEYS.SUBSCRIPTION_PLANS],
    queryFn: async () => {
      const res = await getSubscriptionPlans();
      return res.plans;
    },
    staleTime: 1000 * 60 * 5, // 5 phút
  });
};
