"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NewsCard } from "@/features/news/components/NewsCard";
import { ArrowLeft, Loader2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer"; // Import Observer
import { useInfiniteNewsQuery } from "@/features/news/services/news.query";
import { useListFilter } from "@/hooks/use-list-filter";

const FILTERS = ["All", "BTC", "ETH", "Positive", "Negative"];

export default function NewsPage() {
  const { params: filterParams, handlers } = useListFilter({
    pageSize: 10,
    filter: {
      search: "",
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteNewsQuery(filterParams);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-[#0E0E14] text-gray-300 font-sans">
      {/* Header (Giữ nguyên) */}
      <header className="sticky top-0 z-20 bg-[#0E0E14]/80 backdrop-blur-md border-b border-[#2B2B43]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-[#1E222D] rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              CryptoAI News Feed
            </h1>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Filter size={16} className="text-gray-500 mr-2" />
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => handlers.handleFilterChange({ search: filter })}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                  filterParams.filter?.search === filter
                    ? "bg-blue-600 text-white"
                    : "bg-[#1E222D] text-gray-400 hover:bg-[#2B2B43]"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Loading Lần đầu */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={32} />
            <p className="text-sm text-gray-500">Loading initial feed...</p>
          </div>
        )}

        {/* Danh sách tin tức */}
        <div className="grid grid-cols-1 gap-6">
          {/* React Query trả về mảng các pages, mỗi page chứa mảng items */}
          {data?.pages.map((group, i) => (
            <div key={i} className="contents">
              {group.items.map((item) => (
                <NewsCard key={item.id} data={item} />
              ))}
            </div>
          ))}
        </div>

        {!isLoading && data?.pages[0].items.length === 0 && (
          <div className="text-center py-20 text-gray-500">No news found.</div>
        )}

        {/* Load More Trigger (Cảm biến đáy) */}
        <div ref={ref} className="py-8 flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin text-blue-500" size={24} />
          ) : hasNextPage ? (
            <span className="text-xs text-gray-600">Scroll for more...</span>
          ) : (
            !isLoading && (
              <span className="text-xs text-gray-600">
                You have reached the end.
              </span>
            )
          )}
        </div>
      </main>
    </div>
  );
}
