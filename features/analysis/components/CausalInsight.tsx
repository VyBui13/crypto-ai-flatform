import { CausalAnalysis } from "../types/analysis.type";
import { BrainCircuit, Zap, Loader2 } from "lucide-react";

interface Props {
  data?: CausalAnalysis;
  isLoading?: boolean;
}

export const CausalInsight = ({ data, isLoading }: Props) => {
  // 1. TRẠNG THÁI LOADING
  if (isLoading) {
    return (
      // FIX: Dùng h-full thay vì min-h-[200px] để nó khớp hoàn toàn với chiều cao cha
      <div className="h-full flex flex-col items-center justify-center space-y-2 border border-blue-500/20 bg-blue-500/5 rounded-xl backdrop-blur-sm animate-pulse">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
          AI is determining causes...
        </span>
      </div>
    );
  }

  // 2. TRẠNG THÁI KHÔNG CÓ DỮ LIỆU
  if (!data)
    return (
      <div className="text-center p-10 text-gray-500">No data available</div>
    );

  // 3. HIỂN THỊ DỮ LIỆU
  return (
    <div className="space-y-4 h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="bg-blue-900/10 border border-blue-500/20 p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <BrainCircuit size={16} className="text-blue-400" />
          <h4 className="text-sm font-bold text-blue-100">AI Summary</h4>
        </div>
        <p className="text-xs text-blue-200 leading-relaxed">{data.summary}</p>
      </div>

      <h4 className="text-xs font-bold text-gray-500 uppercase mt-4">
        Key Drivers
      </h4>
      <div className="space-y-2">
        {data.causal_factors.map((factor, idx) => (
          <div
            key={idx}
            className="bg-[#1E222D] p-3 rounded-lg border border-[#2B2B43] flex gap-3"
          >
            <div
              className={`mt-1 p-1.5 rounded h-fit ${factor.impact_score > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
            >
              <Zap size={14} />
            </div>
            <div>
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-bold text-gray-200">
                  {factor.factor}
                </h5>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${factor.impact_score > 0 ? "text-green-400 bg-green-900/30" : "text-red-400 bg-red-900/30"}`}
                >
                  {factor.impact_score > 0 ? "+" : ""}
                  {factor.impact_score} Impact
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{factor.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
