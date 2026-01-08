import { SubscriptionPlan } from "../types/subcription.type";

export type GetSubscriptionPlansResponseDto = {
  plans: SubscriptionPlan[];
};

export type BuySubcriptionRequestDto = {
  planId: string;
};
