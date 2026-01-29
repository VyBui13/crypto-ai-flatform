import { PredictionData } from "../types/analysis.type";
import { Target, Shield, AlertCircle, Loader2 } from "lucide-react";

interface Props {
  data?: PredictionData;
  isLoading?: boolean;
}

export const PredictionCard = ({ data, isLoading }: Props) => {
  // 1. TRẠNG THÁI LOADING
  if (isLoading) {
    return (
      // FIX: Đổi h-[180px] thành h-[200px]
      <div className="rounded-xl p-4 border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm h-[200px] flex flex-col items-center justify-center animate-pulse">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
        <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
          AI is analyzing chart...
        </span>
      </div>
    );
  }

  // 2. TRẠNG THÁI KHÔNG CÓ DỮ LIỆU
  if (!data) return null;

  // 3. TRẠNG THÁI HIỂN THỊ DỮ LIỆU
  const isUp = data.prediction.direction === "UP";
  const colorClass = isUp
    ? "text-green-400"
    : data.prediction.direction === "DOWN"
      ? "text-red-400"
      : "text-gray-400";
  const bgClass = isUp
    ? "bg-green-500/10 border-green-500/20"
    : data.prediction.direction === "DOWN"
      ? "bg-red-500/10 border-red-500/20"
      : "bg-gray-500/10 border-gray-500/20";

  return (
    // FIX: Thêm h-[200px] để card thật cũng cao bằng card loading (tránh giật layout khi load xong)
    <div
      className={`rounded-xl p-4 border ${bgClass} backdrop-blur-sm transition-all duration-300 h-[200px] flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xs text-gray-400 uppercase font-bold mb-1">
            AI Prediction ({data.timeframe})
          </h4>
          <div
            className={`text-2xl font-bold ${colorClass} flex items-center gap-2`}
          >
            {data.prediction.direction}
            <span className="text-xs text-gray-500 font-normal bg-black/20 px-2 py-1 rounded">
              {(data.prediction.confidence * 100).toFixed(0)}% confidence
            </span>
          </div>
        </div>
        <Target className={colorClass} size={24} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Target Price */}
        <div className="bg-black/20 rounded-lg p-3">
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">
            Target Price
          </span>
          <div className="text-lg font-mono text-white">
            ${data.prediction.target_price.mid.toLocaleString()}
          </div>
          <div className="flex justify-between text-[10px] text-gray-600 mt-1">
            <span>L: {data.prediction.target_price.low}</span>
            <span>H: {data.prediction.target_price.high}</span>
          </div>
        </div>

        {/* Levels */}
        <div className="space-y-2 flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs">
            <span className="text-red-400 flex items-center gap-1">
              <AlertCircle size={10} /> Res:
            </span>
            <span className="font-mono text-gray-300">
              {data.prediction.resistance_levels[0]}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400 flex items-center gap-1">
              <Shield size={10} /> Sup:
            </span>
            <span className="font-mono text-gray-300">
              {data.prediction.support_levels[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
