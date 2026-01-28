"use client";

import { useEffect, useState } from "react"; // Thêm useState
import { NewsCard } from "@/features/news/components/NewsCard";
import {
  Loader2,
  Search,
  SlidersHorizontal,
  X,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useInfiniteNewsQuery } from "@/features/news/services/news.query";
import { useListFilter } from "@/hooks/use-list-filter";
// 1. Import Query lấy Symbol
import { useMarketSymbols } from "@/features/market/services/market.query";
import { MarketSentimentWidget } from "@/features/news/components/MarketSentimentWidget";

export default function NewsPage() {
  // 2. Gọi hook lấy danh sách Symbol
  const { data: symbolsData, isLoading: isLoadingSymbols } = useMarketSymbols();

  // Tạo danh sách filter: Luôn có "All", sau đó là 10 symbol đầu tiên (hoặc tất cả tùy UI)
  const categoryFilters = [
    "All",
    ...(symbolsData?.slice(0, 15).map((s) => s.symbol) || []),
  ];

  const {
    params: filterParams,
    searchTerm,
    handlers,
  } = useListFilter(
    {
      pageSize: 10,
      filter: {
        category: "All", // category ở đây sẽ đóng vai trò là Symbol filter
        search: "",
      },
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

  const hasData = Boolean(data?.pages?.[0]?.items?.length);

  return (
    <div className="min-h-screen bg-[#0E0E14] text-gray-300 font-sans">
      <main className="w-full p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start h-full">
          {/* SIDEBAR FILTER */}
          <aside className="sticky top-4 col-span-1 space-y-6 h-full">
            <MarketSentimentWidget />

            <div className="bg-[#1E222D] border border-[#2B2B43] rounded-xl p-5 shadow-xl shadow-black/20">
              <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <SlidersHorizontal size={18} className="text-blue-500" />
                <h2>Filter by Asset</h2>
              </div>

              <div className="space-y-5">
                {/* Search Input giữ nguyên */}
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

                {/* Categories / Symbols Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Related Coins
                  </label>

                  {isLoadingSymbols ? (
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-16 bg-[#2B2B43] rounded animate-pulse"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                      {categoryFilters.map((symbol) => {
                        const isActive =
                          filterParams.filter?.category === symbol;
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
                  )}
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

          {/* NEWS FEED LIST */}
          <div className="space-y-6 min-w-0 col-span-1 lg:col-span-2">
            {/* ... Code hiển thị list news cũ giữ nguyên ... */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 bg-[#1E222D]/50 rounded-xl border border-dashed border-[#2B2B43]">
                <Loader2
                  className="animate-spin text-blue-500 mb-4"
                  size={32}
                />
                <p className="text-sm text-gray-500">Updating market feed...</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5">
              {data?.pages.map((group, i) => (
                <div key={i} className="contents">
                  {group.items.map((item) => (
                    // Cần bọc Link vào NewsCard hoặc sửa NewsCard để navigate
                    // Ở đây tôi giả định bạn sẽ click vào title để sang trang detail
                    <NewsCard key={item.id} data={item} />
                  ))}
                </div>
              ))}
            </div>

            {/* Loading More Indicator */}
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
