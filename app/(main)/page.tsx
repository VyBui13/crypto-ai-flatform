"use client";

import Link from "next/link";
import { TradingChart } from "@/features/market/components/TradingChart";
import { Crown, Lock } from "lucide-react";
import { useAppStore } from "@/stores/app.store";
import { useAuthStore } from "@/stores/auth.store";
import MockBlurItem from "@/components/common/MockBlurItem";
import AIAnalysisCard from "@/components/common/AIAnalysisCard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OrderForm } from "@/features/market/components/OrderForm";
import { OrderBook } from "@/features/market/components/OrderBook";

const INTERVALS = ["1m", "5m", "15m", "1h", "4h", "1d"];

export default function DashboardPage() {
  const { symbol } = useAppStore();
  const { user } = useAuthStore();
  const isVip = user?.tier === "vip";
  const [interval, setInterval] = useState("1m");

  return (
    <main className="h-full flex-1 flex flex-col min-w-0">
      <div className="flex-1 flex overflow-y-auto">
        <div className="flex-1 border-r border-[#2B2B43] relative flex flex-col">
          <div className="h-9 border-b border-[#2B2B43] flex items-center px-2 gap-1 bg-[#131722]">
            {INTERVALS.map((tf) => (
              <button
                key={tf}
                onClick={() => setInterval(tf)}
                className={cn(
                  "px-2 py-0.5 text-[11px] font-medium rounded transition-colors min-w-[32px]",
                  interval === tf
                    ? "bg-[#2962FF] text-white" // Style khi đang chọn (Active)
                    : "text-gray-400 hover:text-white hover:bg-[#2A2E39]" // Style mặc định
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex-1 relative bg-[#131722]">
            <TradingChart symbol={symbol} interval={interval} />
          </div>
        </div>

        {/* <div className="hidden lg:block h-full">
          <OrderForm />
        </div> */}

        <div className="hidden lg:block h-full border-r border-[#2B2B43]">
          <OrderBook />
        </div>

        {/* RIGHT PANEL (NEWS & AI) - XỬ LÝ LOGIC AUTH */}
        <div className="w-[340px] bg-[#131722] flex flex-col border-l border-[#2B2B43]">
          <div className="p-3 border-b border-[#2B2B43] font-bold text-xs uppercase tracking-wider text-gray-400 flex justify-between items-center bg-[#1E222D]">
            <span>AI Sentiment & News</span>
            {isVip && (
              <div className="flex items-center gap-1 text-amber-500">
                <Crown size={12} /> <span className="text-[9px]">PREMIUM</span>
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

            {user && !isVip && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 relative">
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
                    Unlock AI-driven signals, sentiment analysis, and real-time
                    news impact scoring.
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
  );
}
