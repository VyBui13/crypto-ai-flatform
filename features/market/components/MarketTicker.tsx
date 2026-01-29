"use client";

import { useState } from "react"; // Thêm useState
import { useAppStore } from "@/stores/app.store";
import { useTicker24h } from "../services/market.query";
import { Loader2, TrendingDown, TrendingUp, Sparkles } from "lucide-react"; // Thêm icon Sparkles
import { cn } from "@/lib/utils";
import { AnalysisModal } from "@/features/analysis/components/AnalysisModal"; // Import Modal vừa tạo

export const MarketTicker = () => {
  const { symbol } = useAppStore();
  const { data: ticker, isLoading } = useTicker24h(symbol);

  // State quản lý đóng mở Modal
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

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
    <>
      <div className="hidden md:flex items-center gap-6 px-4 border-l border-[#2B2B43] h-full">
        {/* --- NÚT BẤM MỞ MODAL --- */}
        <button
          onClick={() => setIsAnalysisOpen(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600 hover:to-purple-600 border border-blue-500/30 hover:border-transparent px-3 py-1.5 rounded-full transition-all duration-300"
        >
          <Sparkles
            size={14}
            className="text-blue-400 group-hover:text-white animate-pulse"
          />
          <span className="text-xs font-bold text-blue-400 group-hover:text-white">
            AI Analyze
          </span>
        </button>

        <div className="h-8 w-[1px] bg-[#2B2B43]"></div>

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
            className={cn(
              "flex items-center gap-1 text-xs font-mono",
              textColor,
            )}
          >
            <ColorIcon size={12} />
            <span>{ticker.priceChangePercent.toFixed(2)}%</span>
          </div>
        </div>

        {/* 3. Giá Cao/Thấp */}
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

      {/* --- RENDER MODAL TẠI ĐÂY --- */}
      {isAnalysisOpen && (
        <AnalysisModal
          symbol={symbol}
          isOpen={isAnalysisOpen}
          onClose={() => setIsAnalysisOpen(false)}
        />
      )}
    </>
  );
};
