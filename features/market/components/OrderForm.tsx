"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/stores/app.store";
import { useMarketPrice } from "../services/market.query"; // Hook vừa tạo
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const OrderForm = () => {
  const { symbol } = useAppStore();
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  // Gọi API lấy giá hiện tại để tính toán ước tính
  const { data: priceInfo, isLoading } = useMarketPrice(symbol);

  // Tính toán tổng tiền (Price * Amount)
  const total = priceInfo && amount ? priceInfo.price * parseFloat(amount) : 0;

  return (
    <div className="w-[300px] border-l border-[#2B2B43] bg-[#131722] flex flex-col h-full">
      {/* 1. Tabs Mua/Bán */}
      <div className="flex border-b border-[#2B2B43]">
        <button
          onClick={() => setSide("buy")}
          className={cn(
            "flex-1 py-3 text-sm font-bold transition-colors",
            side === "buy"
              ? "text-green-500 border-b-2 border-green-500 bg-green-500/5"
              : "text-gray-400 hover:text-white"
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={cn(
            "flex-1 py-3 text-sm font-bold transition-colors",
            side === "sell"
              ? "text-red-500 border-b-2 border-red-500 bg-red-500/5"
              : "text-gray-400 hover:text-white"
          )}
        >
          Sell
        </button>
      </div>

      {/* 2. Form nhập liệu */}
      <div className="p-4 space-y-4">
        {/* Giá (Chỉ hiển thị, chưa cho sửa limit order) */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Price (USDT)</label>
          <div className="bg-[#2A2E39] rounded px-3 py-2 flex justify-between items-center border border-transparent focus-within:border-blue-500">
            {isLoading ? (
              <Loader2 size={14} className="animate-spin text-gray-500" />
            ) : (
              <span className="text-sm font-mono text-white">
                {priceInfo?.price || "---"}
              </span>
            )}
            <span className="text-xs text-gray-500">Market</span>
          </div>
        </div>

        {/* Số lượng */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500">
            Amount ({symbol.replace("USDT", "")})
          </label>
          <div className="bg-[#2A2E39] rounded px-3 py-2 flex justify-between items-center border border-transparent focus-within:border-blue-500">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-sm text-white w-full focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Thanh trượt % (Mock UI) */}
        <div className="flex gap-1">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              className="flex-1 bg-[#2A2E39] text-[10px] text-gray-400 py-1 rounded hover:bg-[#363a45]"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Tổng tiền ước tính */}
        <div className="pt-2 border-t border-[#2B2B43] flex justify-between items-center">
          <span className="text-xs text-gray-500">Total (USDT)</span>
          <span className="text-sm font-mono text-white">
            {total.toLocaleString()}
          </span>
        </div>

        {/* Nút Submit */}
        <button
          className={cn(
            "w-full py-3 rounded font-bold text-sm transition-transform active:scale-95",
            side === "buy"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          )}
        >
          {side === "buy"
            ? `Buy ${symbol.replace("USDT", "")}`
            : `Sell ${symbol.replace("USDT", "")}`}
        </button>
      </div>

      {/* Info user assets (Mock) */}
      <div className="mt-auto p-4 border-t border-[#2B2B43]">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Avail. Balance</span>
          <span className="text-white">10,000.00 USDT</span>
        </div>
      </div>
    </div>
  );
};
