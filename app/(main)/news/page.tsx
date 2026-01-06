"use client";

import { useEffect } from "react";
import Link from "next/link";
import { NewsCard } from "@/features/news/components/NewsCard";
import { ArrowLeft, Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useInfiniteNewsQuery } from "@/features/news/services/news.query";
import { useListFilter } from "@/hooks/use-list-filter";

const FILTERS = ["All", "BTC", "ETH", "Positive", "Negative"];

export default function NewsPage() {
  const {
    params: filterParams,
    searchTerm,
    handlers,
  } = useListFilter(
    {
      pageSize: 10,
      filter: {
        category: "All",
        search: "",
      },
    },
    { searchKey: "search", debounceTime: 500 }
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteNewsQuery(filterParams);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Kiểm tra xem có dữ liệu không để hiển thị text "Hết tin"
  const hasData = Boolean(data?.pages?.[0]?.items?.length);

  return (
    <div className="min-h-screen bg-[#0E0E14] text-gray-300 font-sans">
      <main className="w-full p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start h-full">
          <aside className="sticky top-0 col-span-1 space-y-6 h-full">
            <div className="bg-[#1E222D] border border-[#2B2B43] rounded-xl p-5 shadow-xl shadow-black/20">
              <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <SlidersHorizontal size={18} className="text-blue-500" />
                <h2>Filter & Search</h2>
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
                      placeholder="Search title, coin..."
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
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {FILTERS.map((filter) => {
                      const isActive = filterParams.filter?.category === filter;
                      return (
                        <button
                          key={filter}
                          onClick={() =>
                            handlers.handleFilterChange({ category: filter })
                          }
                          className={cn(
                            "px-3 py-1.5 rounded-md text-xs font-medium transition-all border",
                            isActive
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20"
                              : "bg-[#131722] border-[#2B2B43] text-gray-400 hover:border-gray-500 hover:text-gray-200"
                          )}
                        >
                          {filter}
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
                    Reset to default
                  </button>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-5 text-center hidden lg:block">
              <h3 className="text-blue-400 font-bold text-sm mb-1">
                Go Premium
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                Get real-time AI sentiment alerts.
              </p>
              <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold w-full transition-colors">
                Upgrade Now
              </button>
            </div>
          </aside>

          <div className="space-y-6 min-w-0 col-span-1 lg:col-span-2">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 bg-[#1E222D]/50 rounded-xl border border-dashed border-[#2B2B43]">
                <Loader2
                  className="animate-spin text-blue-500 mb-4"
                  size={32}
                />
                <p className="text-sm text-gray-500">Fetching latest news...</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5">
              {data?.pages.map((group, i) => (
                <div key={i} className="contents">
                  {group.items.map((item) => (
                    <NewsCard key={item.id} data={item} />
                  ))}
                </div>
              ))}
            </div>

            {!isLoading && !hasData && (
              <div className="text-center py-20 bg-[#1E222D] rounded-xl border border-[#2B2B43]">
                <div className="inline-flex p-4 rounded-full bg-[#2B2B43] mb-4">
                  <Search className="text-gray-500" size={24} />
                </div>
                <h3 className="text-white font-medium">No news found</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Try adjusting your filters
                </p>
                <button
                  onClick={() => handlers.resetFilters()}
                  className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* --- FIX 1: Hiển thị lại text 'Reached the end' --- */}
            <div ref={ref} className="py-4 flex justify-center h-10">
              {isFetchingNextPage ? (
                <Loader2 className="animate-spin text-blue-500" size={24} />
              ) : (
                !hasNextPage &&
                hasData &&
                !isLoading && (
                  <span className="text-xs text-gray-600 font-medium animate-in fade-in">
                    You have reached the end
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
