"use client";

import { TradingChart } from "@/features/market/components/TradingChart";
import { useState } from "react";

export default function DashboardPage() {
  const [symbol, setSymbol] = useState("BTCUSDT");

  return (
    <div className="flex h-screen bg-[#0E0E14] text-gray-300 overflow-hidden">
      {/* 1. Left Sidebar (Công cụ vẽ - Mock UI) */}
      <aside className="w-14 border-r border-[#2B2B43] flex flex-col items-center py-4 gap-6">
        <div
          className="w-8 h-8 bg-blue-600 rounded cursor-pointer"
          title="Home"
        />
        <div
          className="w-6 h-6 border-2 border-gray-500 rounded cursor-pointer"
          title="Trendline"
        />
        <div
          className="w-6 h-6 border-2 border-gray-500 rounded cursor-pointer"
          title="Fibonacci"
        />
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header Bar */}
        <header className="h-14 border-b border-[#2B2B43] flex items-center px-4 justify-between bg-[#131722]">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-white">CryptoAI Terminal</h1>
            <span className="bg-[#2A2E39] px-3 py-1 rounded text-sm text-white">
              {symbol}
            </span>
            <span className="text-xs text-green-400">● Realtime Connected</span>
          </div>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
              Login
            </button>
          </div>
        </header>

        {/* Chart Area & News Panel */}
        <div className="flex-1 flex">
          {/* Chart chiếm 70% */}
          <div className="flex-1 border-r border-[#2B2B43] relative">
            <TradingChart symbol={symbol} />
          </div>

          {/* Right Sidebar (News & AI) - Chiếm 30% */}
          <div className="w-[350px] bg-[#131722] flex flex-col">
            <div className="p-3 border-b border-[#2B2B43] font-semibold text-sm">
              AI Insights & News
            </div>
            <div className="p-4 text-center text-gray-500 text-sm mt-10">
              [Place for Crawler & AI Data]
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
