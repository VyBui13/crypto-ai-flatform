export enum SentimentType {
  Positive = "positive",
  Neutral = "neutral",
  Negative = "negative",
}

export interface NewsAnalysis {
  sentiment: "positive" | "negative" | "neutral" | string;
  confidence: number;
  trend: string;
  reasoning: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  content: string; // API trả về 'content', UI sẽ dùng làm summary
  published_at: string; // Chú ý: snake_case

  analysis: NewsAnalysis;

  related_symbols?: string[];
}

export interface MarketSentiment {
  period: string;
  overall_sentiment: {
    score: number;
    label: string;
    confidence: number;
  };
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  analyzed_at: string;
}
