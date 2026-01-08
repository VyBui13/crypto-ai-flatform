import { SubscriptionPlan } from "../types/subcription.type";

// Dữ liệu giả nằm ở đây (Sau này thay bằng gọi axios.get('/api/plans'))
export const MOCK_PLANS_DB: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Starter",
    price: 0,
    currency: "USD",
    period: "month",
    description: "Essential tools for casual traders.",
    features: [
      "Real-time Market Data",
      "Basic Chart Tools",
      "Public News Feed",
      "Standard Support",
    ],
    missingFeatures: [
      "AI Sentiment Analysis",
      "Whale Alerts",
      "Premium News Sources",
      "Trading Signals",
    ],
    isPopular: false,
    tier: 1,
  },
  {
    id: "vip",
    name: "Pro Trader",
    price: 29,
    currency: "USD",
    period: "month",
    description: "Unlock the full power of AI analytics.",
    features: [
      "Everything in Starter",
      "Real-time AI Sentiment",
      "Instant Whale Alerts",
      "Premium News Sources",
      "Buy/Sell Signals",
      "Priority Support",
    ],
    missingFeatures: [],
    isPopular: true,
    tier: 2,
  },
];
