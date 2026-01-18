"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAIChat } from "@/features/market/hooks/use-ai-chat";

interface AIChatPanelProps {
  symbol: string; // VD: "BTC/USDT"
}

export const AIChatPanel = ({ symbol }: AIChatPanelProps) => {
  // 1. Sử dụng Custom Hook để quản lý logic
  const { messages, sendMessage, resetChat, isThinking } = useAIChat(symbol);

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Danh sách câu hỏi gợi ý nhanh
  const commonQuestions = [
    `Is ${symbol} bullish now?`,
    `Support levels for ${symbol}?`,
    `Breaking news for ${symbol}?`,
  ];

  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#131722] relative border-t border-[#2B2B43] lg:border-t-0">
      {/* HEADER: Nút Reset (đặt nổi ở góc) */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={resetChat}
          className="p-1.5 bg-[#2B2B43] hover:bg-[#363A45] rounded-lg text-gray-400 hover:text-white transition-all shadow-md group border border-[#2B2B43] hover:border-gray-600"
          title="Reset Chat History"
        >
          <RotateCcw
            size={14}
            className="group-hover:-rotate-180 transition-transform duration-500"
          />
        </button>
      </div>

      {/* BODY: Danh sách tin nhắn */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm break-words",
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-[#2B2B43] text-gray-200 rounded-tl-sm border border-gray-700"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isThinking && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-[#2B2B43] p-3 rounded-2xl rounded-tl-sm flex items-center gap-2 border border-gray-700">
              <Sparkles size={14} className="text-amber-500 animate-pulse" />
              <span className="text-xs text-gray-400 font-medium">
                AI is analyzing...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* SUGGESTIONS: Chỉ hiện khi chưa có nhiều hội thoại và không đang loading */}
      {!isThinking && messages.length < 3 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none mask-linear-fade">
          {commonQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(q)}
              className="whitespace-nowrap bg-[#1E222D] hover:bg-[#2A2E39] border border-[#2B2B43] hover:border-blue-500/50 text-xs text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* FOOTER: Input Form */}
      <div className="p-3 border-t border-[#2B2B43] bg-[#1E222D]">
        <div className="relative flex items-center group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${symbol}...`}
            disabled={isThinking}
            className="w-full bg-[#131722] border border-[#2B2B43] group-focus-within:border-blue-500/50 text-gray-200 text-sm rounded-xl pl-4 pr-11 py-3 focus:outline-none transition-colors placeholder:text-gray-600 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className={cn(
              "absolute right-2 p-1.5 rounded-lg transition-all duration-200",
              !input.trim() || isThinking
                ? "bg-transparent text-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 shadow-lg shadow-blue-900/20"
            )}
          >
            {isThinking ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
