"use client";

import { useAppStore } from "@/stores/app.store";
import { useOrderBook } from "../services/market.query";
import { Loader2, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const OrderBook = () => {
  const { symbol } = useAppStore();
  const { data: depth, isLoading } = useOrderBook(symbol);

  // --- LOGIC TREND (Giữ nguyên) ---
  const [trend, setTrend] = useState<"up" | "down" | "neutral">("neutral");
  const prevPriceRef = useRef<number>(0);

  useEffect(() => {
    if (depth && depth.bids.length > 0) {
      const currentPrice = parseFloat(depth.bids[0].price);
      if (prevPriceRef.current > 0) {
        if (currentPrice > prevPriceRef.current) setTrend("up");
        else if (currentPrice < prevPriceRef.current) setTrend("down");
      }
      prevPriceRef.current = currentPrice;
    }
  }, [depth]);

  // --- COMPONENT HELPERS ---

  // 1. Render dòng thật (Giữ nguyên)
  const renderRow = (
    item: { price: string; quantity: string },
    type: "bid" | "ask"
  ) => {
    const price = parseFloat(item.price);
    const amount = parseFloat(item.quantity);
    const total = (price * amount).toFixed(2);
    const widthPercent = Math.min(amount * 50, 100);

    return (
      <div className="flex justify-between items-center text-[11px] py-0.5 relative group cursor-pointer hover:bg-[#2A2E39]">
        <div
          className={`absolute top-0 bottom-0 right-0 opacity-10 ${
            type === "bid" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ width: `${widthPercent}%` }}
        />
        <span
          className={`z-10 font-mono ${
            type === "bid" ? "text-green-500" : "text-red-500"
          }`}
        >
          {price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="z-10 text-gray-400 font-mono text-right w-16">
          {amount.toFixed(4)}
        </span>
        <span className="z-10 text-gray-500 font-mono text-right w-16 hidden xl:block">
          {total}
        </span>
      </div>
    );
  };

  // 2. Render dòng Skeleton (MỚI: Để giữ chỗ khi loading)
  const renderSkeleton = () => {
    return Array.from({ length: 15 }).map((_, i) => (
      <div
        key={i}
        className="flex justify-between items-center py-0.5 animate-pulse"
      >
        {/* Giả lập Price */}
        <div className="h-3 w-16 bg-[#2B2B43] rounded opacity-50" />
        {/* Giả lập Amount */}
        <div className="h-3 w-12 bg-[#2B2B43] rounded opacity-50" />
        {/* Giả lập Total (chỉ hiện trên XL) */}
        <div className="h-3 w-12 bg-[#2B2B43] rounded opacity-50 hidden xl:block" />
      </div>
    ));
  };

  // Logic icon/màu trend
  const TrendIcon =
    trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
      ? "text-red-500"
      : "text-gray-500";

  // Lấy giá hiện tại an toàn
  const currentPriceDisplay =
    depth && depth.bids.length > 0
      ? parseFloat(depth.bids[0].price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })
      : "---";

  return (
    // Luôn render khung này dù có đang load hay không -> Layout không bị nhảy
    <div className="flex flex-col h-full bg-[#131722] border-r border-[#2B2B43] w-[280px]">
      {/* HEADER: Luôn cố định */}
      <div className="px-3 py-2 border-b border-[#2B2B43] flex justify-between items-center bg-[#1E222D]">
        <span className="text-xs font-bold text-gray-400 uppercase">
          Price (USDT)
        </span>
        <div className="flex gap-4">
          <span className="text-[10px] text-gray-500 uppercase">Amount</span>
          <span className="text-[10px] text-gray-500 uppercase hidden xl:block">
            Total
          </span>
        </div>
      </div>

      {/* ASKS SECTION */}
      <div className="flex-1 overflow-hidden flex flex-col-reverse px-2 pb-1 gap-[1px]">
        {isLoading || !depth
          ? renderSkeleton() // Nếu đang load thì hiện khung xương
          : depth.asks
              .slice(0, 15)
              .map((item, index) => (
                <div key={`ask-${index}`}>{renderRow(item, "ask")}</div>
              ))}
      </div>

      {/* MIDDLE BAR */}
      <div className="py-1.5 border-y border-[#2B2B43] text-center bg-[#1E222D] my-1 transition-colors duration-300">
        <div
          className={`flex items-center justify-center gap-2 text-base font-bold font-mono ${
            isLoading ? "text-gray-500" : trendColor
          }`}
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              {currentPriceDisplay}
              <TrendIcon size={14} />
            </>
          )}
        </div>
      </div>

      {/* BIDS SECTION */}
      <div className="flex-1 overflow-hidden px-2 pt-1 gap-[1px]">
        {isLoading || !depth
          ? renderSkeleton() // Nếu đang load thì hiện khung xương
          : depth.bids
              .slice(0, 15)
              .map((item, index) => (
                <div key={`bid-${index}`}>{renderRow(item, "bid")}</div>
              ))}
      </div>
    </div>
  );
};
