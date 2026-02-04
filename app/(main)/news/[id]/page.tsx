"use client";

import { useNewsDetail } from "@/features/news/services/news.query";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Loader2,
  Tag,
  Bot,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  MessageSquareQuote,
} from "lucide-react";
import { SentimentBadge } from "@/features/news/components/SentimentBadge";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // QUAN TRỌNG: Decode ID để tránh lỗi 404 từ Backend

  const { data: news, isLoading, isError } = useNewsDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-[#0E0E14]">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (isError || !news) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center bg-[#0E0E14] text-gray-400 gap-4">
        <AlertTriangle size={48} className="text-red-500" />
        <h2 className="text-xl font-bold">News not found</h2>
        <button
          onClick={() => router.back()}
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  // Xử lý dữ liệu fallback
  const analysis = news.analysis || {
    sentiment: "neutral",
    confidence: 0,
    trend: "N/A",
    reasoning: "No analysis available",
  };
  const formattedDate = new Date(news.published_at).toLocaleString();

  return (
    <div className="min-h-screen bg-[#0E0E14] text-gray-200 pb-20">
      {/* Đã xóa phần Header dính ở đây để tránh trùng lặp */}

      <main className="max-w-3xl mx-auto px-4 mt-8">
        {/* Header Title & Meta */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider border border-blue-500/20">
              {news.source}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} /> {formattedDate}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
            {news.title}
          </h1>

          {/* Sentiment Bar */}
          <div className="flex items-center gap-4 bg-[#1E222D] p-3 rounded-lg border border-[#2B2B43]">
            <SentimentBadge
              type={analysis.sentiment as any}
              score={analysis.confidence}
            />
            <div className="h-4 w-[1px] bg-[#2B2B43]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-bold">
                Confidence
              </span>
              <span className="text-sm font-mono font-bold text-gray-300">
                {(analysis.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-4 w-[1px] bg-[#2B2B43]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-bold">
                Trend
              </span>
              <span className="text-sm font-bold flex items-center gap-1 text-gray-300">
                {analysis.trend}{" "}
                <TrendingUp
                  size={12}
                  className={
                    analysis.sentiment === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                />
              </span>
            </div>
          </div>
        </div>

        {/* AI Analysis Block */}
        <div className="bg-gradient-to-br from-[#1E222D] to-[#131722] border border-amber-500/20 rounded-xl p-5 mb-8 shadow-lg shadow-amber-900/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Bot size={80} />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="bg-amber-500/10 p-1.5 rounded-md">
              <Bot size={18} className="text-amber-500" />
            </div>
            <h3 className="text-amber-500 font-bold text-sm uppercase tracking-wide">
              AI Key Insight
            </h3>
          </div>

          <div className="relative">
            <MessageSquareQuote
              className="absolute -top-2 -left-2 text-gray-600 opacity-30 transform -scale-x-100"
              size={24}
            />
            <p className="text-gray-300 text-sm leading-relaxed italic pl-6 border-l-2 border-gray-700">
              {analysis.reasoning}
            </p>
          </div>
        </div>

        {/* Main Content Body */}
        <article className="prose prose-invert prose-blue max-w-none text-gray-300 leading-7">
          {news.content.split("\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Related Symbols */}
        {news.related_symbols && news.related_symbols.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#2B2B43]">
            <h4 className="text-sm font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
              <Tag size={14} /> Affected Assets
            </h4>
            <div className="flex flex-wrap gap-2">
              {news.related_symbols.map((symbol) => (
                <button
                  key={symbol}
                  className="bg-[#1E222D] hover:bg-blue-600 hover:text-white hover:border-blue-500 border border-[#2B2B43] px-3 py-1.5 rounded-full text-sm font-medium text-gray-400 transition-all"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Read Original Button */}
        <div className="mt-8 flex justify-center">
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 hover:scale-105"
          >
            Read Original Article <ExternalLink size={18} />
          </a>
        </div>
      </main>
    </div>
  );
}
