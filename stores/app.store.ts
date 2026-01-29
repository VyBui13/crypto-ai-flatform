import { create } from "zustand";

interface AppState {
  symbol: string;
  setSymbol: (symbol: string) => void;

  isVip: boolean;
  toggleVip: () => void;

  activeTool: "cursor" | "trendline" | "fibonacci" | "brush";
  setActiveTool: (tool: "cursor" | "trendline" | "fibonacci" | "brush") => void;
}

export const useAppStore = create<AppState>((set) => ({
  symbol: "BTCUSDT",
  setSymbol: (symbol) => set({ symbol }),

  isVip: false,
  toggleVip: () => set((state) => ({ isVip: !state.isVip })),

  activeTool: "cursor",
  setActiveTool: (tool) => set({ activeTool: tool }),
}));
