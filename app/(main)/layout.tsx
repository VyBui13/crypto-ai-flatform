import React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0E0E14] text-gray-300  font-sans">
      <AppSidebar />

      <div className="w-14"></div>

      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {children}
      </div>
    </div>
  );
}
