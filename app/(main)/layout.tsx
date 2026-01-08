import React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/common/Header";
import AuthGuard from "@/components/common/AuthGuard";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AuthGuard>
    <div className="flex h-screen bg-[#0E0E14] text-gray-300 font-sans overflow-hidden">
      <AppSidebar />

      <div className="w-14 flex-shrink-0 hidden md:block"></div>

      <div className="flex-1 flex flex-col min-w-0 ">
        <Header />

        {/* Sử dụng ScrollArea để bọc phần children */}
        <div className="flex-1 overflow-y-auto">
          <main className="h-full">{children}</main>
        </div>
      </div>
    </div>
    // </AuthGuard>
  );
}
