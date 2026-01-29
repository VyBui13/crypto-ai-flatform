import apiClient from "@/lib/api-client";
import { SubscriptionPlan } from "../types/subcription.type";
import {
  BuySubcriptionRequestDto,
  GetSubscriptionPlansResponseDto,
} from "./subcription.dto";

interface BackendPlanResponse {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  is_popular: boolean;
  button_text: string;
  granted_tier: string;
}

export const getSubscriptionPlans =
  async (): Promise<GetSubscriptionPlansResponseDto> => {
    const { data } = await apiClient.get<BackendPlanResponse[]>("/plans");

    return {
      plans: data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        currency: item.currency,
        description: item.description,
        isPopular: item.is_popular,
        buttonText: item.button_text,
        tier: item.granted_tier,
        period: "month", // Mặc định hiển thị theo tháng
      })),
    };
  };

export const buySubscription = async (
  params: BuySubcriptionRequestDto
): Promise<void> => {
  await apiClient.post("/subscribe", {
    plan_id: params.planId,
  });
};
