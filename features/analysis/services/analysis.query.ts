// features/analysis/services/analysis.query.ts
import { useQuery } from "@tanstack/react-query";
import {
  getSymbolSentiment,
  getSymbolPrediction,
  getSymbolCausal,
  getSymbolHistory,
} from "./analysis.api";

export const useSymbolAnalysis = (symbol: string) => {
  const sentiment = useQuery({
    queryKey: ["analysis", "sentiment", symbol],
    queryFn: () => getSymbolSentiment(symbol),
    refetchInterval: 60000, // 1 phút
  });

  const prediction = useQuery({
    queryKey: ["analysis", "prediction", symbol],
    queryFn: () => getSymbolPrediction(symbol),
    refetchInterval: 300000, // 5 phút
  });

  const causal = useQuery({
    queryKey: ["analysis", "causal", symbol],
    queryFn: () => getSymbolCausal(symbol),
    staleTime: 300000,
  });

  const history = useQuery({
    queryKey: ["analysis", "history", symbol],
    queryFn: () => getSymbolHistory(symbol),
    staleTime: Infinity,
  });

  return { sentiment, prediction, causal, history };
};
