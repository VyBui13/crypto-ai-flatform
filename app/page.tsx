"use client";

import { TradingChart } from "@/features/market/components/TradingChart";
import { SymbolSelector } from "@/features/market/components/SymbolSelector";
import {
  LineChart,
  Pencil,
  MousePointer2,
  TrendingUp,
  User,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app.store";

export default function DashboardPage() {
  // 1. Lấy state từ Store
  const { symbol, activeTool, setActiveTool, isVip, toggleVip } = useAppStore();

  return (
    <div className="flex h-screen bg-[#0E0E14] text-gray-300 overflow-hidden font-sans">
      {/* --- SIDEBAR TOOLS --- */}
      <aside className="w-14 border-r border-[#2B2B43] flex flex-col items-center py-4 gap-4 bg-[#131722]">
        {/* Logo Home */}
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-4 cursor-pointer shadow-lg shadow-blue-900/20">
          <TrendingUp size={20} className="text-white" />
        </div>

        {/* Tool: Cursor */}
        <ToolButton
          icon={<MousePointer2 size={18} />}
          isActive={activeTool === "cursor"}
          onClick={() => setActiveTool("cursor")}
          title="Cursor"
        />

        {/* Tool: Trendline */}
        <ToolButton
          icon={<LineChart size={18} />}
          isActive={activeTool === "trendline"}
          onClick={() => setActiveTool("trendline")}
          title="Trend Line"
        />

        {/* Tool: Brush/Fibonacci Mock */}
        <ToolButton
          icon={<Pencil size={18} />}
          isActive={activeTool === "brush"}
          onClick={() => setActiveTool("brush")}
          title="Brush"
        />

        <div className="mt-auto mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600">
            <User size={16} />
          </div>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-14 border-b border-[#2B2B43] flex items-center px-4 justify-between bg-[#131722]">
          <div className="flex items-center gap-4">
            {/* Component chọn Symbol ở đây */}
            <SymbolSelector />

            {/* Các thông số thị trường giả lập */}
            <div className="hidden md:flex gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-gray-500">24h Change</span>
                <span className="text-green-400">+2.45%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">24h High</span>
                <span className="text-white">65,200.00</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Nút giả lập chuyển chế độ VIP */}
            <button
              onClick={toggleVip}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all border",
                isVip
                  ? "bg-amber-500/10 border-amber-500 text-amber-500 hover:bg-amber-500/20"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
              )}
            >
              <Crown size={14} />
              {isVip ? "VIP Active" : "Upgrade VIP"}
            </button>

            {!isVip && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded font-medium transition-colors">
                Connect Wallet
              </button>
            )}
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="flex-1 flex overflow-hidden">
          {/* CHART AREA */}
          <div className="flex-1 border-r border-[#2B2B43] relative flex flex-col">
            {/* Toolbar phụ trên chart (Timeframe) */}
            <div className="h-10 border-b border-[#2B2B43] flex items-center px-2 gap-1 bg-[#131722]">
              {["15m", "1H", "4H", "1D", "1W"].map((tf) => (
                <button
                  key={tf}
                  className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-[#2A2E39] rounded"
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Component - Truyền symbol từ Store vào */}
            <div className="flex-1 relative">
              <TradingChart symbol={symbol} />
            </div>
          </div>

          {/* RIGHT PANEL (NEWS & AI) */}
          <div className="w-[320px] bg-[#131722] flex flex-col border-l border-[#2B2B43]">
            <div className="p-3 border-b border-[#2B2B43] font-semibold text-sm text-white flex justify-between items-center">
              <span>AI Insights</span>
              {isVip && (
                <span className="text-[10px] bg-amber-500 text-black px-1.5 rounded font-bold">
                  VIP
                </span>
              )}
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {isVip ? (
                <div className="space-y-4">
                  {/* Mock AI Analysis Data */}
                  <AIAnalysisCard
                    type="bullish"
                    title="Bitcoin Breakout Detected"
                    reason="High volume combined with ETF inflow news."
                    time="10 mins ago"
                  />
                  <AIAnalysisCard
                    type="bearish"
                    title="ETH Resistance Rejection"
                    reason="Failed to break $3,500 resistance level."
                    time="1 hour ago"
                  />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                  <Crown size={40} className="text-amber-500 mb-2" />
                  <h3 className="text-white font-medium">
                    Unlock Premium Insights
                  </h3>
                  <p className="text-xs text-gray-400 px-4">
                    Get real-time AI analysis, news sentiment, and trade
                    signals.
                  </p>
                  <button
                    onClick={toggleVip}
                    className="mt-2 text-xs bg-amber-600 text-white px-3 py-2 rounded"
                  >
                    Try VIP Demo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB COMPONENTS NHỎ (Để code gọn hơn) ---

const ToolButton = ({ icon, isActive, onClick, title }: any) => (
  <button
    onClick={onClick}
    title={title}
    className={cn(
      "w-8 h-8 flex items-center justify-center rounded transition-colors",
      isActive
        ? "bg-[#2A2E39] text-blue-400"
        : "text-gray-400 hover:text-white hover:bg-[#2A2E39]"
    )}
  >
    {icon}
  </button>
);

const AIAnalysisCard = ({ type, title, reason, time }: any) => (
  <div className="bg-[#1E222D] p-3 rounded border border-[#2B2B43] hover:border-gray-600 transition-colors cursor-pointer">
    <div className="flex justify-between items-start mb-2">
      <span
        className={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase",
          type === "bullish"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        )}
      >
        {type}
      </span>
      <span className="text-[10px] text-gray-500">{time}</span>
    </div>
    <h4 className="text-sm font-medium text-gray-200 mb-1 leading-tight">
      {title}
    </h4>
    <p className="text-xs text-gray-400 line-clamp-2">{reason}</p>
  </div>
);
