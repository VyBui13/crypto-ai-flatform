// features/market/services/market.mutation.ts
import { useMutation } from "@tanstack/react-query";
import { chatWithMarketAI } from "./market.api";

export const useChatMarketMutation = () => {
  return useMutation({
    mutationFn: ({ prompt, symbol }: { prompt: string; symbol: string }) =>
      chatWithMarketAI(prompt, symbol),
  });
};
