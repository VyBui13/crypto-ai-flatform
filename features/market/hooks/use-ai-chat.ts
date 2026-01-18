// features/market/hooks/use-ai-chat.ts
import { useState, useCallback } from "react";
import { useChatMarketMutation } from "../services/market.mutation";
import { toast } from "sonner"; // Hoặc thư viện toast bạn dùng

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export const useAIChat = (symbol: string) => {
  // Tin nhắn mặc định
  const defaultMessage: Message = {
    id: "welcome",
    role: "ai",
    content: `Hello! I am your AI Market Assistant. Ask me anything about ${symbol} trend.`,
  };

  const [messages, setMessages] = useState<Message[]>([defaultMessage]);
  const chatMutation = useChatMarketMutation();

  // Hàm gửi tin nhắn
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      // 1. Thêm tin nhắn của User vào list ngay lập tức
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMsg]);

      // 2. Gọi API thông qua Mutation
      chatMutation.mutate(
        { prompt: content, symbol },
        {
          onSuccess: (data) => {
            // 3. Thêm tin nhắn phản hồi của AI
            const aiMsg: Message = {
              id: (Date.now() + 1).toString(),
              role: "ai",
              content: data,
            };
            setMessages((prev) => [...prev, aiMsg]);
          },
          onError: () => {
            // Xử lý lỗi (có thể thêm tin nhắn lỗi vào chat hoặc toast)
            const errorMsg: Message = {
              id: (Date.now() + 1).toString(),
              role: "ai",
              content: "Sorry, I encountered an error. Please try again.",
            };
            setMessages((prev) => [...prev, errorMsg]);
            toast.error("Failed to get AI response");
          },
        }
      );
    },
    [symbol, chatMutation]
  );

  // Hàm Reset đoạn chat
  const resetChat = useCallback(() => {
    setMessages([defaultMessage]); // Reset về tin nhắn chào mừng
    chatMutation.reset(); // Reset trạng thái của mutation (loading/error)
  }, [defaultMessage, chatMutation]);

  return {
    messages,
    sendMessage,
    resetChat,
    isThinking: chatMutation.isPending, // Trạng thái đang trả lời
    error: chatMutation.error,
  };
};
