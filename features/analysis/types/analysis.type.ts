// features/analysis/types/analysis.type.ts

export interface SentimentAnalysis {
  symbol: string;
  period: string;
  sentiment: {
    score: number; // -1 to 1
    label: "bullish" | "bearish" | "neutral";
    confidence: number;
  };
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  analyzed_at: string;
}

export interface PredictionData {
  symbol: string;
  timeframe: string;
  current_price: number;
  prediction: {
    direction: "UP" | "DOWN" | "SIDEWAYS";
    confidence: number;
    target_price: {
      low: number;
      mid: number;
      high: number;
    };
    support_levels: number[];
    resistance_levels: number[];
  };
  generated_at: string;
}

export interface CausalFactor {
  factor: string;
  category: string;
  impact_score: number;
  confidence: number;
  explanation: string;
}

export interface CausalAnalysis {
  symbol: string;
  summary: string;
  causal_factors: CausalFactor[];
  explainability: {
    prediction: string;
    prediction_confidence: number;
  };
  generated_at: string;
}

export interface HistoryPrediction {
  id: number;
  predicted_direction: string;
  predicted_at: string;
  actual_direction: string;
  is_correct: boolean;
}

export interface HistoryAnalysis {
  symbol: string;
  accuracy: {
    total_predictions: number;
    accuracy_rate: number; // 0 to 1
    correct_predictions: number;
  };
  recent_predictions: HistoryPrediction[];
}
