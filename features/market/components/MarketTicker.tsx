"use client";

import { useAppStore } from "@/stores/app.store";
import { useTicker24h } from "../services/market.query";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const MarketTicker = () => {
  const { symbol } = useAppStore();
  const { data: ticker, isLoading } = useTicker24h(symbol);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 border-l border-[#2B2B43]">
        <Loader2 className="animate-spin text-gray-500" size={14} />
        <span className="text-xs text-gray-500">Loading price...</span>
      </div>
    );
  }

  if (!ticker) return null;

  const isPositive = ticker.priceChangePercent >= 0;
  const ColorIcon = isPositive ? TrendingUp : TrendingDown;
  const textColor = isPositive ? "text-green-400" : "text-red-400";

  return (
    <div className="hidden md:flex items-center gap-6 px-4 border-l border-[#2B2B43]">
      {/* 1. Giá hiện tại */}
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 font-medium uppercase">
          Last Price
        </span>
        <span className={cn("text-sm font-bold font-mono", textColor)}>
          {ticker.lastPrice.toLocaleString()}
        </span>
      </div>

      {/* 2. Thay đổi 24h */}
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 font-medium uppercase">
          24h Change
        </span>
        <div
          className={cn("flex items-center gap-1 text-xs font-mono", textColor)}
        >
          <ColorIcon size={12} />
          <span>{ticker.priceChangePercent.toFixed(2)}%</span>
        </div>
      </div>

      {/* 3. Giá Cao/Thấp (Optional) */}
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 font-medium uppercase">
          24h High
        </span>
        <span className="text-xs text-gray-300 font-mono">
          {ticker.highPrice.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 font-medium uppercase">
          24h Low
        </span>
        <span className="text-xs text-gray-300 font-mono">
          {ticker.lowPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
