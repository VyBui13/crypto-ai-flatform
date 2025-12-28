"use client";

import Link from "next/link";
import { TradingChart } from "@/features/market/components/TradingChart";
import { SymbolSelector } from "@/features/market/components/SymbolSelector";
import {
  LineChart,
  Pencil,
  MousePointer2,
  TrendingUp,
  LogOut,
  Crown,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app.store";
import { useAuthStore } from "@/stores/auth.store";

export default function DashboardPage() {
  // 1. Lấy State UI
  const { symbol, activeTool, setActiveTool } = useAppStore();

  // 2. Lấy State User từ Auth Store
  const { user, logout } = useAuthStore();

  // 3. Kiểm tra quyền hạn
  const isVip = user?.role === "vip";

  return (
    <div className="flex h-screen bg-[#0E0E14] text-gray-300 overflow-hidden font-sans">
      {/* --- SIDEBAR TOOLS --- */}
      <aside className="w-14 border-r border-[#2B2B43] flex flex-col items-center py-4 gap-4 bg-[#131722] z-20">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-4 cursor-pointer shadow-lg shadow-blue-900/20">
          <TrendingUp size={20} className="text-white" />
        </div>

        <ToolButton
          icon={<MousePointer2 size={18} />}
          isActive={activeTool === "cursor"}
          onClick={() => setActiveTool("cursor")}
          title="Cursor"
        />

        <ToolButton
          icon={<LineChart size={18} />}
          isActive={activeTool === "trendline"}
          onClick={() => setActiveTool("trendline")}
          title="Trend Line"
        />

        <ToolButton
          icon={<Pencil size={18} />}
          isActive={activeTool === "brush"}
          onClick={() => setActiveTool("brush")}
          title="Brush"
        />
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-14 border-b border-[#2B2B43] flex items-center px-4 justify-between bg-[#131722] z-10">
          <div className="flex items-center gap-4">
            {/* Component chọn Symbol */}
            <SymbolSelector />

            {/* Các thông số thị trường giả lập */}
            <div className="hidden md:flex gap-4 text-xs border-l border-[#2B2B43] pl-4">
              <div className="flex flex-col">
                <span className="text-gray-500">24h Change</span>
                <span className="text-green-400 font-mono">+2.45%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">24h Volume</span>
                <span className="text-white font-mono">1.2B</span>
              </div>
            </div>
          </div>

          {/* AUTH AREA - Xử lý hiển thị dựa trên User State */}
          <div className="flex items-center gap-3">
            {user ? (
              // CASE 1: Đã đăng nhập
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                {/* Badge VIP/Basic */}
                {isVip ? (
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/50 text-amber-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                    <Crown size={12} /> VIP
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-gray-700/50 text-gray-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                    Basic
                  </div>
                )}

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-3 border-l border-[#2B2B43]">
                  <div className="flex flex-col text-right hidden sm:block leading-tight">
                    <span className="text-xs text-white font-medium">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      @{user.username}
                    </span>
                  </div>
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${user.username}`
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-gray-600 shadow-sm"
                  />

                  <button
                    onClick={logout}
                    title="Logout"
                    className="ml-1 p-1.5 hover:bg-[#2A2E39] rounded-md text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            ) : (
              // CASE 2: Chưa đăng nhập (Hiện nút Login/Register)
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded font-bold transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#2A2E39] hover:bg-[#363a45] text-white text-xs px-4 py-2 rounded font-bold transition-all border border-[#2B2B43]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="flex-1 flex overflow-hidden">
          {/* CHART AREA */}
          <div className="flex-1 border-r border-[#2B2B43] relative flex flex-col">
            {/* Toolbar Timeframe */}
            <div className="h-9 border-b border-[#2B2B43] flex items-center px-2 gap-1 bg-[#131722]">
              {["15m", "1H", "4H", "1D", "1W"].map((tf) => (
                <button
                  key={tf}
                  className="px-2 py-0.5 text-[11px] font-medium text-gray-400 hover:text-white hover:bg-[#2A2E39] rounded transition-colors"
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Component */}
            <div className="flex-1 relative bg-[#131722]">
              <TradingChart symbol={symbol} />
            </div>
          </div>

          {/* RIGHT PANEL (NEWS & AI) - XỬ LÝ LOGIC AUTH */}
          <div className="w-[340px] bg-[#131722] flex flex-col border-l border-[#2B2B43]">
            <div className="p-3 border-b border-[#2B2B43] font-bold text-xs uppercase tracking-wider text-gray-400 flex justify-between items-center bg-[#1E222D]">
              <span>AI Sentiment & News</span>
              {isVip && (
                <div className="flex items-center gap-1 text-amber-500">
                  <Crown size={12} />{" "}
                  <span className="text-[9px]">PREMIUM</span>
                </div>
              )}
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-[#131722] relative scrollbar-thin scrollbar-thumb-gray-800">
              {/* TRẠNG THÁI 1: Chưa đăng nhập */}
              {!user && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-5 bg-[#131722]/95 z-10 backdrop-blur-[2px]">
                  <div className="w-16 h-16 bg-[#1E222D] rounded-2xl flex items-center justify-center shadow-2xl border border-[#2B2B43]">
                    <Lock size={32} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      Market Insights Locked
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Connect your account to access real-time AI analysis,
                      sentiment scoring, and breaking news correlation.
                    </p>
                  </div>
                  <Link
                    href="/login"
                    className="text-xs bg-white text-black font-bold px-6 py-2.5 rounded hover:bg-gray-200 transition-colors"
                  >
                    Login to Unlock
                  </Link>
                </div>
              )}

              {/* TRẠNG THÁI 2: Đã Login nhưng là Normal User */}
              {user && !isVip && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 relative">
                  {/* Hiệu ứng làm mờ dữ liệu phía sau */}
                  <div className="absolute inset-0 opacity-30 pointer-events-none select-none overflow-hidden p-4">
                    <MockBlurItem />
                    <MockBlurItem />
                    <MockBlurItem />
                    <MockBlurItem />
                  </div>

                  {/* Card Nâng cấp */}
                  <div className="z-10 bg-[#1E222D]/95 p-6 rounded-xl border border-amber-500/30 shadow-2xl shadow-amber-900/10 backdrop-blur-md max-w-[90%]">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown size={24} className="text-amber-500" />
                    </div>
                    <h3 className="text-white font-bold text-base">
                      Upgrade to VIP
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 mb-4 leading-relaxed">
                      Unlock AI-driven signals, sentiment analysis, and
                      real-time news impact scoring.
                    </p>
                    <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-2.5 rounded text-xs shadow-lg transform transition hover:-translate-y-0.5">
                      Upgrade Plan ($9/mo)
                    </button>
                  </div>
                </div>
              )}

              {/* TRẠNG THÁI 3: VIP User (Hiển thị dữ liệu thật) */}
              {isVip && (
                <div className="space-y-3 animate-in slide-in-from-right duration-500">
                  <AIAnalysisCard
                    type="bullish"
                    title="Bitcoin Breakout Detected"
                    reason="High volume combined with ETF inflow news from BlackRock."
                    time="10 mins ago"
                  />
                  <AIAnalysisCard
                    type="bearish"
                    title="ETH Resistance Rejection"
                    reason="Failed to break $3,500 resistance level amidst network congestion."
                    time="1 hour ago"
                  />
                  <AIAnalysisCard
                    type="neutral"
                    title="Solana Consolidation"
                    reason="Waiting for network upgrade announcement. Volume is decreasing."
                    time="3 hours ago"
                  />
                  <AIAnalysisCard
                    type="bullish"
                    title="DOGE Meme Spike"
                    reason="Elon Musk posted X regarding crypto payments."
                    time="5 hours ago"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB COMPONENTS ---

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
  <div className="bg-[#1E222D] p-3 rounded-lg border border-[#2B2B43] hover:border-gray-500 transition-all cursor-pointer shadow-sm group">
    <div className="flex justify-between items-start mb-2">
      <span
        className={cn(
          "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
          type === "bullish"
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : type === "bearish"
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
        )}
      >
        {type}
      </span>
      <span className="text-[9px] text-gray-600 group-hover:text-gray-400 transition-colors">
        {time}
      </span>
    </div>
    <h4 className="text-sm font-bold text-gray-200 mb-1 leading-tight group-hover:text-white">
      {title}
    </h4>
    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
      {reason}
    </p>
  </div>
);

// Component giả lập dòng tin mờ mờ cho user thường xem thèm
const MockBlurItem = () => (
  <div className="mb-3 p-3 bg-[#1E222D] rounded border border-[#2B2B43] opacity-60 filter blur-[2px]">
    <div className="flex justify-between mb-2">
      <div className="w-12 h-3 bg-gray-700 rounded-sm"></div>
      <div className="w-8 h-3 bg-gray-800 rounded-sm"></div>
    </div>
    <div className="w-3/4 h-4 bg-gray-600 rounded mb-2"></div>
    <div className="w-full h-2 bg-gray-700 rounded"></div>
  </div>
);
