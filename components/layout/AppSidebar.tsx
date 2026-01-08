"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TrendingUp,
  MousePointer2,
  LineChart,
  Pencil,
  Newspaper,
  User,
  LogOut,
  LayoutDashboard,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app.store";
import { useAuthStore } from "@/stores/auth.store";

export const AppSidebar = () => {
  const pathname = usePathname();
  const { activeTool, setActiveTool } = useAppStore();
  const { user, logout } = useAuthStore();

  const isDashboard = pathname === "/";

  return (
    <aside className="w-14 border-r border-[#2B2B43] flex flex-col items-center py-4 gap-4 bg-[#131722] z-50 shrink-0 h-screen fixed left-0 top-0">
      {/* --- LOGO --- */}
      <Link
        href="/"
        className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2 cursor-pointer shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform"
      >
        <TrendingUp size={20} className="text-white" />
      </Link>

      {/* --- MAIN NAVIGATION --- */}
      <div className="flex flex-col gap-2 w-full px-2 pb-4 border-b border-[#2B2B43]">
        <NavItem
          href="/"
          icon={<LayoutDashboard size={18} />}
          isActive={pathname === "/"}
          title="Trading Terminal"
        />
        <NavItem
          href="/news"
          icon={<Newspaper size={18} />}
          isActive={pathname === "/news"}
          title="News Feed"
        />
        <NavItem
          href="/subscription"
          icon={<CreditCard size={18} />}
          isActive={pathname === "/subscription"}
          title="Pricing & Plans"
        />
      </div>

      {/* --- DASHBOARD TOOLS (Chỉ hiện khi ở Dashboard) --- */}
      {isDashboard && (
        <div className="flex flex-col gap-3 w-full px-2 pt-2 animate-in fade-in slide-in-from-left-2 duration-300">
          <div className="text-[9px] text-gray-600 font-bold text-center uppercase tracking-wider">
            Tools
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
        </div>
      )}

      {/* --- USER / FOOTER --- */}
      <div className="mt-auto flex flex-col gap-3 items-center w-full">
        {user ? (
          <button
            onClick={logout}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-[#2A2E39] transition-all"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        ) : (
          <Link
            href="/login"
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
          >
            <User size={16} />
          </Link>
        )}

        {user && (
          <img
            src={
              user.avatar || `https://ui-avatars.com/api/?name=${user.username}`
            }
            alt="ava"
            className="w-8 h-8 rounded-full border border-gray-600"
          />
        )}
      </div>
    </aside>
  );
};

// Sub-components
const NavItem = ({ href, icon, isActive, title }: any) => (
  <Link
    href={href}
    title={title}
    className={cn(
      "w-10 h-10 flex items-center justify-center rounded-xl transition-all",
      isActive
        ? "bg-blue-600/10 text-blue-500"
        : "text-gray-400 hover:text-gray-200 hover:bg-[#2A2E39]"
    )}
  >
    {icon}
  </Link>
);

const ToolButton = ({ icon, isActive, onClick, title }: any) => (
  <button
    onClick={onClick}
    title={title}
    className={cn(
      "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
      isActive
        ? "bg-[#2A2E39] text-blue-400 border border-blue-500/30"
        : "text-gray-500 hover:text-gray-300 hover:bg-[#2A2E39]"
    )}
  >
    {icon}
  </button>
);
