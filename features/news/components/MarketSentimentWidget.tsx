"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarketSentiment } from "../services/news.api";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const MarketSentimentWidget = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["market-sentiment"],
    queryFn: getMarketSentiment,
    refetchInterval: 1000 * 60 * 2,
  });

  if (isLoading) {
    return (
      <div className="bg-[#1E222D] border border-[#2B2B43] rounded-xl p-5 mb-6 flex justify-center items-center min-h-[160px]">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-[#1E222D] border border-[#2B2B43] rounded-xl p-5 mb-6 text-center">
        <p className="text-xs text-gray-500 mb-2">Failed to load sentiment</p>
        <button
          onClick={() => refetch()}
          className="text-blue-400 hover:text-white text-xs flex items-center justify-center gap-1 w-full"
        >
          <RefreshCcw size={12} /> Retry
        </button>
      </div>
    );
  }

  const { overall_sentiment, breakdown } = data;

  // Tính tổng để tính phần trăm hiển thị
  const total =
    breakdown.positive + breakdown.neutral + breakdown.negative || 1;
  const posPct = (breakdown.positive / total) * 100;
  const neuPct = (breakdown.neutral / total) * 100;
  const negPct = (breakdown.negative / total) * 100;

  return (
    <div className="bg-[#1E222D] border border-[#2B2B43] rounded-xl p-5 mb-6 shadow-xl shadow-black/20">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Market Sentiment
          </h3>
          <p className="text-[10px] text-gray-600 mt-0.5">
            Real-time AI Analysis
          </p>
        </div>
        {/* Sentiment Icon Wrapper */}
        <div
          className={cn(
            "p-2 rounded-lg border",
            overall_sentiment.score > 0
              ? "bg-green-500/10 border-green-500/20 text-green-500"
              : overall_sentiment.score < 0
                ? "bg-red-500/10 border-red-500/20 text-red-500"
                : "bg-gray-500/10 border-gray-500/20 text-gray-500",
          )}
        >
          {overall_sentiment.score > 0 ? (
            <TrendingUp size={20} />
          ) : overall_sentiment.score < 0 ? (
            <TrendingDown size={20} />
          ) : (
            <Minus size={20} />
          )}
        </div>
      </div>

      {/* Main Score Display */}
      <div className="mb-4">
        <div
          className={cn(
            "text-2xl font-bold mb-1",
            overall_sentiment.score > 0
              ? "text-green-400"
              : overall_sentiment.score < 0
                ? "text-red-400"
                : "text-gray-300",
          )}
        >
          {overall_sentiment.label}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Confidence Score:</span>
          <div className="h-1.5 w-16 bg-[#2B2B43] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${overall_sentiment.confidence * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Breakdown Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 w-full bg-[#131722] rounded-full flex overflow-hidden">
          {posPct > 0 && (
            <div
              style={{ width: `${posPct}%` }}
              className="bg-green-500 hover:bg-green-400 transition-colors"
              title={`Bullish: ${breakdown.positive}`}
            />
          )}
          {neuPct > 0 && (
            <div
              style={{ width: `${neuPct}%` }}
              className="bg-gray-600 hover:bg-gray-500 transition-colors"
              title={`Neutral: ${breakdown.neutral}`}
            />
          )}
          {negPct > 0 && (
            <div
              style={{ width: `${negPct}%` }}
              className="bg-red-500 hover:bg-red-400 transition-colors"
              title={`Bearish: ${breakdown.negative}`}
            />
          )}
        </div>

        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
          <span className="text-green-500 flex items-center gap-1">
            {posPct.toFixed(0)}% <span className="hidden xl:inline">Bull</span>
          </span>
          <span className="text-gray-500">
            {neuPct.toFixed(0)}% <span className="hidden xl:inline">Neu</span>
          </span>
          <span className="text-red-500 flex items-center gap-1">
            {negPct.toFixed(0)}% <span className="hidden xl:inline">Bear</span>
          </span>
        </div>
      </div>
    </div>
  );
};
