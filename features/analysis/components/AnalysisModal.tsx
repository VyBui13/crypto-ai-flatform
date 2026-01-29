"use client";

import { BrainCircuit, Activity, Zap } from "lucide-react";
import { useSymbolAnalysis } from "@/features/analysis/services/analysis.query";
import { SymbolSentimentBar } from "./SymbolSentimentBar";
import { PredictionCard } from "./PredictionCard";
import { TrustScore } from "./TrustScore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; //
import { CausalInsight } from "./CausalInsight";

interface Props {
  symbol: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AnalysisModal = ({ symbol, isOpen, onClose }: Props) => {
  // Lấy dữ liệu từ Hook
  const { sentiment, prediction, causal, history } = useSymbolAnalysis(symbol);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="min-w-6xl max-h-[90vh] bg-[#131722] border-[#2B2B43] text-gray-200 p-0 gap-0 overflow-hidden shadow-2xl">
        {/* 1. HEADER */}
        <DialogHeader className="p-4 border-b border-[#2B2B43] bg-[#1E222D] flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <BrainCircuit size={20} className="text-blue-500" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-white leading-none">
                  AI Deep Dive
                </DialogTitle>
                <span className="text-xs text-gray-500 font-mono mt-1 block">
                  Target: {symbol}
                </span>
              </div>
            </div>

            {/* Sentiment Bar (Chỉ hiện trên màn hình lớn) */}
            <div className="hidden md:block pl-4 border-l border-[#2B2B43]">
              <SymbolSentimentBar data={sentiment.data} />
            </div>
          </div>

          {/* Nút Close mặc định của DialogContent sẽ hiện ở đây, ta không cần thêm nút X thủ công */}
        </DialogHeader>

        {/* 2. BODY SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#0E0E14]">
          {/* Section A: Prediction & Insight (Chia 2 cột trên Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột Trái: Dự báo giá (Quan trọng nhất) */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                <Activity size={14} /> Price Prediction
              </h3>
              {/* Truyền thêm isLoading để hiển thị Spinner */}
              <PredictionCard
                data={prediction.data}
                isLoading={prediction.isLoading}
              />
            </div>

            {/* Cột Phải: Nguyên nhân (Why?) */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                <Zap size={14} /> Causal Reasoning
              </h3>
              {/* Giới hạn chiều cao và scroll cho phần text dài */}
              <div className="h-[200px]">
                {/* Truyền thêm isLoading để hiển thị Spinner */}
                <CausalInsight
                  data={causal.data}
                  isLoading={causal.isLoading}
                />
              </div>
            </div>
          </div>

          {/* Section B: Trust Score (Lịch sử & Độ tin cậy) */}
          <div className="pt-4 border-t border-[#2B2B43]">
            <TrustScore data={history.data} />
          </div>
        </div>

        {/* 3. FOOTER */}
        <div className="p-3 border-t border-[#2B2B43] bg-[#1E222D] text-center">
          <p className="text-[10px] text-gray-500">
            AI analysis is generated based on historical data & news sentiment.
            Trading involves risk.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
