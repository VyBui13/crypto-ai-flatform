import { HistoryAnalysis } from "../types/analysis.type";
import { CheckCircle2, XCircle } from "lucide-react";

export const TrustScore = ({ data }: { data?: HistoryAnalysis }) => {
  if (!data) return null;

  return (
    <div className="mt-6 bg-[#131722] border border-[#2B2B43] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">AI Accuracy Record</h3>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-400">
            {(data.accuracy.accuracy_rate * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 text-right">
            Win Rate
            <br />({data.accuracy.correct_predictions}/
            {data.accuracy.total_predictions})
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {data.recent_predictions.slice(0, 10).map((pred) => (
          <div
            key={pred.id}
            className={`h-1.5 rounded-full ${pred.is_correct ? "bg-green-500" : "bg-red-500"}`}
            title={`Predicted: ${pred.predicted_direction} - Result: ${pred.is_correct ? "Correct" : "Wrong"}`}
          />
        ))}
      </div>
    </div>
  );
};
