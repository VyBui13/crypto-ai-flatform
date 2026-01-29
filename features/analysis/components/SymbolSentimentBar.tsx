import { SentimentAnalysis } from "../types/analysis.type";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export const SymbolSentimentBar = ({ data }: { data?: SentimentAnalysis }) => {
  if (!data)
    return <div className="h-2 w-32 bg-gray-800 rounded-full animate-pulse" />;

  const { breakdown, sentiment } = data;
  const total =
    breakdown.positive + breakdown.neutral + breakdown.negative || 1;

  return (
    <div className="flex flex-col gap-1 min-w-[200px]">
      <div className="flex justify-between items-end">
        <span
          className={cn(
            "text-xs font-bold uppercase flex items-center gap-1",
            sentiment.label === "bullish"
              ? "text-green-500"
              : sentiment.label === "bearish"
                ? "text-red-500"
                : "text-gray-400",
          )}
        >
          {sentiment.label === "bullish" ? (
            <TrendingUp size={14} />
          ) : sentiment.label === "bearish" ? (
            <TrendingDown size={14} />
          ) : (
            <Minus size={14} />
          )}
          {sentiment.label} Sentiment
        </span>
        <span className="text-[10px] text-gray-500">
          {(sentiment.confidence * 100).toFixed(0)}% conf.
        </span>
      </div>
      <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-gray-800">
        <div
          style={{ width: `${(breakdown.positive / total) * 100}%` }}
          className="bg-green-500"
        />
        <div
          style={{ width: `${(breakdown.neutral / total) * 100}%` }}
          className="bg-gray-500"
        />
        <div
          style={{ width: `${(breakdown.negative / total) * 100}%` }}
          className="bg-red-500"
        />
      </div>
    </div>
  );
};
