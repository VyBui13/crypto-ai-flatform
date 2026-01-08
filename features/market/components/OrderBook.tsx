"use client";

import { useAppStore } from "@/stores/app.store";
import { useOrderBook } from "../services/market.query";
import { Loader2, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const OrderBook = () => {
  const { symbol } = useAppStore();
  const { data: depth, isLoading } = useOrderBook(symbol);

  // --- LOGIC MỚI: Xử lý hướng mũi tên (Trend) ---
  const [trend, setTrend] = useState<"up" | "down" | "neutral">("neutral");
  const prevPriceRef = useRef<number>(0);

  useEffect(() => {
    if (depth && depth.bids.length > 0) {
      const currentPrice = parseFloat(depth.bids[0].price);

      // Nếu có giá cũ để so sánh
      if (prevPriceRef.current > 0) {
        if (currentPrice > prevPriceRef.current) {
          setTrend("up");
        } else if (currentPrice < prevPriceRef.current) {
          setTrend("down");
        }
        // Nếu bằng nhau thì giữ nguyên trend cũ hoặc neutral
      }

      // Lưu lại giá hiện tại để lần sau so sánh
      prevPriceRef.current = currentPrice;
    }
  }, [depth]); // Chạy mỗi khi data depth thay đổi
  // ----------------------------------------------

  if (isLoading || !depth) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 gap-2">
        <Loader2 size={16} className="animate-spin" />
        <span className="text-xs">Loading Book...</span>
      </div>
    );
  }

  // Helper render dòng (Giữ nguyên)
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

  // Xác định Icon và Màu sắc dựa trên trend
  const TrendIcon =
    trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div className="flex flex-col h-full bg-[#131722] border-r border-[#2B2B43] w-[280px]">
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

      <div className="flex-1 overflow-hidden flex flex-col-reverse px-2 pb-1 gap-[1px]">
        {depth.asks.slice(0, 15).map((item, index) => (
          <div key={`ask-${index}`}>{renderRow(item, "ask")}</div>
        ))}
      </div>

      {/* Current Price Middle Bar - ĐÃ SỬA LOGIC DYNAMIC */}
      <div className="py-1.5 border-y border-[#2B2B43] text-center bg-[#1E222D] my-1 transition-colors duration-300">
        <div
          className={`flex items-center justify-center gap-2 text-base font-bold font-mono ${trendColor}`}
        >
          {depth.bids.length > 0
            ? parseFloat(depth.bids[0].price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })
            : "---"}
          <TrendIcon size={14} />
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-2 pt-1 gap-[1px]">
        {depth.bids.slice(0, 15).map((item, index) => (
          <div key={`bid-${index}`}>{renderRow(item, "bid")}</div>
        ))}
      </div>
    </div>
  );
};
