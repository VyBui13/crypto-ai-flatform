import React from "react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import GuestGuard from "@/components/common/GuestGuard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <div className="min-h-screen w-full bg-[#0E0E14] flex items-center justify-center relative overflow-hidden font-sans">
        {/* --- BACKGROUND EFFECTS --- */}
        {/* Grid Pattern mờ ảo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Các đốm sáng (Gradient Orbs) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        {/* --- CONTENT CONTAINER --- */}
        <div className="w-full max-w-md z-10 p-4">
          {/* Logo Area */}
          <Link
            href="/"
            className="flex flex-col items-center mb-8 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">
              CryptoAI Terminal
            </h1>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              Professional Trading Intelligence
            </p>
          </Link>

          {/* Form Content (Login/Register sẽ nằm ở đây) */}
          {children}

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-600">
            <p>© 2025 CryptoAI Inc. Secure & Encrypted.</p>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
