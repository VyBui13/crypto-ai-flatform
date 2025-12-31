export const PRICING_PLANS = [
  {
    id: "basic",
    name: "Starter",
    price: 0,
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
    popular: false,
  },
  {
    id: "vip",
    name: "Pro Trader",
    price: 29,
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
    popular: true, // Để highlight
  },
];
