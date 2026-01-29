export interface PlanFeature {
  id: string;
  text: string;
  included: boolean;
}

export interface SubscriptionPlan {
  // Các trường map từ Backend
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  isPopular: boolean;
  buttonText: string;
  tier: string;

  // Trường này UI cần để hiển thị "/month", ta sẽ tự gán mặc định
  period: "month" | "year";
}
