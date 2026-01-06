import { MOCK_PLANS_DB } from "../mocks/subcription.mock";
import {
  BuySubcriptionRequestDto,
  GetSubscriptionPlansResponseDto,
} from "./subcription.dto";

export const getSubscriptionPlans =
  async (): Promise<GetSubscriptionPlansResponseDto> => {
    // Giả lập delay mạng (0.5s)
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      plans: MOCK_PLANS_DB,
    };
  };

export const buySubscription = async (
  params: BuySubcriptionRequestDto
): Promise<void> => {
  // Giả lập delay mạng (1.5s)
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return;
};
