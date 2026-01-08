// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SymbolSelector } from "@/features/market/components/SymbolSelector";
import { Crown, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { MarketTicker } from "@/features/market/components/MarketTicker";

export const Header = () => {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const isDashboard = pathname === "/";
  const isVip = user?.role === "vip";

  return (
    <header className="h-14 border-b border-[#2B2B43] flex items-center px-4 justify-between bg-[#131722] z-10 shrink-0">
      {/* LEFT: Chỉ hiện Market Selector ở trang Dashboard hoặc hiện Logo/Title ở trang khác */}
      <div className="flex items-center gap-4">
        {isDashboard ? (
          <>
            <SymbolSelector />
            <MarketTicker />
            {/* <div className="hidden md:flex gap-4 text-xs border-l border-[#2B2B43] pl-4">
              <div className="flex flex-col">
                <span className="text-gray-500">24h Change</span>
                <span className="text-green-400 font-mono">+2.45%</span>
              </div>
            </div> */}
          </>
        ) : (
          <h1 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
            {pathname.replace("/", "") || "Crypto AI"}
          </h1>
        )}
      </div>

      {/* RIGHT: AUTH AREA (Dùng chung cho mọi trang) */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            {isVip ? (
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/50 text-amber-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                <Crown size={12} /> VIP
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-gray-700/50 text-gray-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                Basic
              </div>
            )}

            <div className="flex items-center gap-3 pl-3 border-l border-[#2B2B43]">
              <div className="flex flex-col text-left hidden sm:block leading-tight">
                <div className="text-xs text-white font-medium">
                  {user.name}
                </div>
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
                className="ml-1 p-1.5 hover:bg-[#2A2E39] rounded-md text-gray-400 hover:text-red-400"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded font-bold transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-[#2A2E39] hover:bg-[#363a45] text-white text-xs px-4 py-2 rounded font-bold border border-[#2B2B43]"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
