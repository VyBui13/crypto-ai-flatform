export interface PlanFeature {
  id: string;
  text: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string; // 'USD' | 'VND'
  period: "month" | "year";
  description: string;

  // Thay vì chia mảng features/missingFeatures ngay,
  // BE thường trả về full list hoặc cấu trúc linh hoạt hơn.
  // Tuy nhiên để map nhanh với UI hiện tại, ta sẽ giữ cấu trúc này:
  features: string[];
  missingFeatures: string[];

  isPopular: boolean; // Đổi tên popular -> isPopular cho chuẩn convention boolean
  tier: number; // 1 = Basic, 2 = VIP (Dùng để so sánh quyền lợi)
}
