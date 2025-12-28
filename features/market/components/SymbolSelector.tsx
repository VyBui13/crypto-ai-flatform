"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Hàm tiện ích của tailwind/shadcn
import { useAppStore } from "@/stores/app.store";
import { MOCK_SYMBOLS } from "../mocks/market.mock";

export const SymbolSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { symbol, setSymbol } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc danh sách coin theo từ khóa tìm kiếm
  const filteredSymbols = MOCK_SYMBOLS.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (newSymbol: string) => {
    setSymbol(newSymbol);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      {/* Nút kích hoạt Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#2A2E39] hover:bg-[#363a45] text-white px-3 py-1.5 rounded transition-colors"
      >
        <span className="font-bold">{symbol}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay để click ra ngoài thì đóng */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full left-0 mt-2 w-64 bg-[#1E222D] border border-[#2B2B43] rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-[#2B2B43] flex items-center gap-2">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search symbol..."
                className="bg-transparent text-sm text-white focus:outline-none w-full placeholder-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>

            {/* List Symbols */}
            <div className="max-h-60 overflow-y-auto">
              {filteredSymbols.map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => handleSelect(item.symbol)}
                  className={cn(
                    "px-4 py-2 text-sm cursor-pointer flex justify-between hover:bg-[#2A2E39]",
                    symbol === item.symbol
                      ? "bg-[#2A2E39] text-blue-400"
                      : "text-gray-300"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-bold">{item.symbol}</span>
                    <span className="text-xs text-gray-500">{item.name}</span>
                  </div>
                  <span
                    className={
                      item.change >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {item.price}
                  </span>
                </div>
              ))}
              {filteredSymbols.length === 0 && (
                <div className="p-4 text-xs text-center text-gray-500">
                  No results found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
