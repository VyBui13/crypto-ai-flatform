// features/analysis/services/analysis.api.ts
import apiClient from "@/lib/api-client";
import {
  SentimentAnalysis,
  PredictionData,
  CausalAnalysis,
  HistoryAnalysis,
} from "../types/analysis.type";

export const getSymbolSentiment = async (
  symbol: string,
): Promise<SentimentAnalysis> => {
  const res = await apiClient.get(`/analysis/sentiment/${symbol}`);
  return res.data;
};

export const getSymbolPrediction = async (
  symbol: string,
): Promise<PredictionData> => {
  const res = await apiClient.get(`/analysis/prediction/${symbol}`);
  return res.data;
};

// Lưu ý: Endpoint này bạn ghi là 'casual', nếu BE sửa thành 'causal' thì đổi lại nhé
export const getSymbolCausal = async (
  symbol: string,
): Promise<CausalAnalysis> => {
  const res = await apiClient.get(`/analysis/causal/${symbol}`);
  return res.data;
};

export const getSymbolHistory = async (
  symbol: string,
): Promise<HistoryAnalysis> => {
  const res = await apiClient.get(`/analysis/history/${symbol}`);
  return res.data;
};
