export enum SentimentType {
  Positive = 'positive',
  Neutral = 'neutral',
  Negative = 'negative',
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;      // Ví dụ: CoinDesk, Bloomberg
  url: string;         // Link gốc
  imageUrl?: string;
  publishedAt: string; // ISO Date
  
  // --- AI ENRICHED DATA (Phần này Crawler/AI sẽ điền vào) ---
  relatedCoins: string[]; // ['BTC', 'ETH']
  sentiment: SentimentType;
  sentimentScore: number; // Từ -1 (cực xấu) đến 1 (cực tốt)
  aiReasoning: string;    // Lý do tại sao AI đánh giá như vậy
}