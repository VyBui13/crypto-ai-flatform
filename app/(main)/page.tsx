"use client";

import Link from "next/link";
import { TradingChart } from "@/features/market/components/TradingChart";
import { Crown, Lock } from "lucide-react";
import { useAppStore } from "@/stores/app.store";
import { useAuthStore } from "@/stores/auth.store";
import MockBlurItem from "@/components/common/MockBlurItem";
// import AIAnalysisCard from "@/components/common/AIAnalysisCard"; // <-- Không dùng cái này nữa cho VIP
import { AIChatPanel } from "@/features/market/components/AIChatPanel"; // <-- Import mới
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { OrderBook } from "@/features/market/components/OrderBook";
import { AuthRole } from "@/features/auth/types/auth.type";

const INTERVALS = ["1m", "5m", "15m", "1h", "4h", "1d"];

export default function DashboardPage() {
  const { symbol } = useAppStore();
  const { user } = useAuthStore();

  const isVip = useMemo(() => {
    return user?.tier === AuthRole.VIP; // Hoặc logic check rank của bạn
  }, [user]);

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
                    ? "bg-[#2962FF] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#2A2E39]"
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

        <div className="hidden lg:block h-full border-r border-[#2B2B43]">
          <OrderBook />
        </div>

        {/* RIGHT PANEL (NEWS & AI) */}
        <div className="w-[340px] bg-[#131722] flex flex-col border-l border-[#2B2B43]">
          <div className="p-3 border-b border-[#2B2B43] font-bold text-xs uppercase tracking-wider text-gray-400 flex justify-between items-center bg-[#1E222D]">
            <span>AI Assistant & Insights</span>
            {isVip && (
              <div className="flex items-center gap-1 text-amber-500">
                <Crown size={12} /> <span className="text-[9px]">VIP CHAT</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden relative bg-[#131722]">
            {/* TRẠNG THÁI 1: Chưa đăng nhập (Giữ nguyên) */}
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
                    Connect your account to access real-time AI analysis.
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

            {/* TRẠNG THÁI 2: Đã đăng nhập nhưng chưa VIP (Giữ nguyên) */}
            {user && !isVip && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 relative p-4">
                <div className="absolute inset-0 opacity-30 pointer-events-none select-none overflow-hidden p-4">
                  <MockBlurItem />
                  <MockBlurItem />
                  <MockBlurItem />
                </div>

                <div className="z-10 bg-[#1E222D]/95 p-6 rounded-xl border border-amber-500/30 shadow-2xl shadow-amber-900/10 backdrop-blur-md w-full">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Crown size={24} className="text-amber-500" />
                  </div>
                  <h3 className="text-white font-bold text-base">
                    Upgrade to VIP
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 mb-4 leading-relaxed">
                    Chat with our AI to get real-time price predictions and
                    market sentiment analysis for <b>{symbol}</b>.
                  </p>
                  <Link href="/subscription" className="block w-full">
                    <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-2.5 rounded text-xs shadow-lg transform transition hover:-translate-y-0.5">
                      Unlock AI Chat
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* TRẠNG THÁI 3: VIP User -> Hiển thị Chatbox */}
            {isVip && <AIChatPanel symbol={symbol} />}
          </div>
        </div>
      </div>
    </main>
  );
}
