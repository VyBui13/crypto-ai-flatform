"use client";

import { useEffect } from "react";
import { NewsCard } from "@/features/news/components/NewsCard";
import {
  Loader2,
  Search,
  SlidersHorizontal,
  X,
  FileX, // Import thêm icon cho trạng thái rỗng
  RefreshCcw, // Icon nút reset
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useInfiniteNewsQuery } from "@/features/news/services/news.query";
import { useListFilter } from "@/hooks/use-list-filter";
import { MarketSentimentWidget } from "@/features/news/components/MarketSentimentWidget";

const TARGET_SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "SOLUSDT",
  "ADAUSDT",
  "DOGEUSDT",
  "DOTUSDT",
  "MATICUSDT",
  "LTCUSDT",
];

export default function NewsPage() {
  const categoryFilters = ["All", ...TARGET_SYMBOLS];

  const {
    params: filterParams,
    searchTerm,
    handlers,
  } = useListFilter(
    {
      pageSize: 10,
      filter: { category: "All", search: "" },
    },
    { searchKey: "search", debounceTime: 500 },
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteNewsQuery(filterParams);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Logic kiểm tra xem có dữ liệu hay không
  // (Lấy item của trang đầu tiên để check)
  const hasData = (data?.pages?.[0]?.items?.length ?? 0) > 0;

  // Xác định trạng thái Empty: Không loading + Không có data
  const isEmpty = !isLoading && !hasData;

  return (
    <div className="min-h-screen bg-[#0E0E14] text-gray-300 font-sans">
      <main className="w-full p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start h-full">
          {/* SIDEBAR FILTER (Giữ nguyên) */}
          <aside className="sticky top-4 col-span-1 space-y-6 h-full">
            <MarketSentimentWidget />

            <div className="bg-[#1E222D] border border-[#2B2B43] rounded-xl p-5 shadow-xl shadow-black/20">
              <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <SlidersHorizontal size={18} className="text-blue-500" />
                <h2>Filter by Asset</h2>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Keyword
                  </label>
                  <div className="relative group">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search news..."
                      className="w-full bg-[#131722] border border-[#2B2B43] focus:border-blue-500/50 rounded-lg pl-9 pr-8 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                      value={searchTerm}
                      onChange={handlers.handleSearch}
                    />
                    {searchTerm && (
                      <button
                        onClick={() => handlers.handleSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Related Coins
                  </label>
                  <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                    {categoryFilters.map((symbol) => {
                      const isActive = filterParams.filter?.category === symbol;
                      return (
                        <button
                          key={symbol}
                          onClick={() =>
                            handlers.handleFilterChange({ category: symbol })
                          }
                          className={cn(
                            "px-3 py-1.5 rounded-md text-xs font-medium transition-all border",
                            isActive
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20"
                              : "bg-[#131722] border-[#2B2B43] text-gray-400 hover:border-gray-500 hover:text-gray-200",
                          )}
                        >
                          {symbol}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {(searchTerm || filterParams.filter?.category !== "All") && (
                <div className="mt-6 pt-4 border-t border-[#2B2B43]">
                  <button
                    onClick={() => handlers.resetFilters()}
                    className="w-full py-2 text-xs text-gray-400 hover:text-white hover:bg-[#2B2B43] rounded transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* === NEWS FEED LIST === */}
          <div className="space-y-6 min-w-0 col-span-1 lg:col-span-2">
            {/* 1. Trạng thái Loading ban đầu */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 bg-[#1E222D]/50 rounded-xl border border-dashed border-[#2B2B43]">
                <Loader2
                  className="animate-spin text-blue-500 mb-4"
                  size={32}
                />
                <p className="text-sm text-gray-500">Updating market feed...</p>
              </div>
            )}

            {/* 2. Trạng thái KHÔNG CÓ DỮ LIỆU (Empty State) */}
            {isEmpty && (
              <div className="flex flex-col items-center justify-center py-20 bg-[#1E222D] rounded-xl border border-[#2B2B43] text-center px-4">
                <div className="bg-[#2B2B43]/50 p-4 rounded-full mb-4">
                  <FileX size={40} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No news found
                </h3>
                <p className="text-gray-500 text-sm max-w-sm mb-6">
                  We couldn't find any news matching "
                  {searchTerm || filterParams.filter?.category}". Try adjusting
                  your filters.
                </p>

                {/* Nút reset nhanh ở ngay empty state */}
                <button
                  onClick={() => handlers.resetFilters()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <RefreshCcw size={16} />
                  Clear Filters
                </button>
              </div>
            )}

            {/* 3. Hiển thị dữ liệu khi có data */}
            {hasData && (
              <div className="grid grid-cols-1 gap-5">
                {data?.pages.map((group, i) => (
                  <div key={i} className="contents">
                    {group.items.map((item) => (
                      <NewsCard key={item.id} data={item} />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* 4. Loading More Indicator */}
            <div ref={ref} className="py-4 flex justify-center h-10">
              {isFetchingNextPage && (
                <Loader2 className="animate-spin text-blue-500" size={24} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
