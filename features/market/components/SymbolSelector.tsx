"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app.store";
import { useMarketSymbols } from "../services/market.query"; // 1. Import Hook lấy data thật

export const SymbolSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { symbol, setSymbol } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Lấy danh sách Coin từ API
  const { data: symbols, isLoading } = useMarketSymbols();

  // 3. Logic lọc coin (Sử dụng useMemo để tối ưu hiệu năng)
  const filteredSymbols = useMemo(() => {
    if (!symbols) return [];

    // Nếu không search, trả về top 20 coin đầu tiên cho nhẹ (hoặc trả về hết nếu muốn)
    if (!searchTerm) return symbols.slice(0, 50);

    return symbols.filter((item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [symbols, searchTerm]);

  const handleSelect = (newSymbol: string) => {
    setSymbol(newSymbol);
    setIsOpen(false);
    setSearchTerm(""); // Reset search sau khi chọn
  };

  return (
    <div className="relative z-50">
      {/* Nút kích hoạt Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#2A2E39] hover:bg-[#363a45] text-white px-3 py-1.5 rounded transition-colors border border-transparent hover:border-[#2B2B43]"
      >
        <div className="flex flex-col items-start">
          <span className="font-bold text-sm leading-none">{symbol}</span>
          <span className="text-[10px] text-gray-400 leading-none">PERP</span>
        </div>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay trong suốt để click ra ngoài thì đóng */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full left-0 mt-2 w-72 bg-[#1E222D] border border-[#2B2B43] rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {/* Search Input */}
            <div className="p-3 border-b border-[#2B2B43] flex items-center gap-2 bg-[#1E222D]">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search (e.g. BTC, ETH)..."
                className="bg-transparent text-sm text-white focus:outline-none w-full placeholder-gray-600 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>

            {/* List Symbols */}
            <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2B2B43] scrollbar-track-transparent">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500 gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span className="text-xs">Loading assets...</span>
                </div>
              ) : filteredSymbols.length === 0 ? (
                <div className="p-8 text-xs text-center text-gray-500">
                  No results found for "{searchTerm}"
                </div>
              ) : (
                filteredSymbols.map((item) => (
                  <div
                    key={item.symbol}
                    onClick={() => handleSelect(item.symbol)}
                    className={cn(
                      "px-4 py-2.5 text-sm cursor-pointer flex justify-between items-center hover:bg-[#2A2E39] transition-colors border-b border-[#2B2B43]/30 last:border-0",
                      symbol === item.symbol
                        ? "bg-[#2A2E39] border-l-2 border-l-blue-500" // Highlight mục đang chọn
                        : "border-l-2 border-l-transparent"
                    )}
                  >
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "font-bold",
                          symbol === item.symbol
                            ? "text-blue-400"
                            : "text-gray-200"
                        )}
                      >
                        {item.symbol}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {item.baseAsset} / {item.quoteAsset}
                      </span>
                    </div>

                    {/* Placeholder cho Price (Sau này có API sẽ hiển thị) */}
                    {/* <div className="flex flex-col items-end">
                        <span className="text-gray-300">---</span>
                    </div> */}
                  </div>
                ))
              )}
            </div>

            {/* Footer nhỏ */}
            <div className="px-3 py-2 bg-[#131722] border-t border-[#2B2B43] text-[10px] text-gray-500 text-center">
              Select a trading pair
            </div>
          </div>
        </>
      )}
    </div>
  );
};
