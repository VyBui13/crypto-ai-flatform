import { cn } from "@/lib/utils";

export default function AIAnalysisCard({ type, title, reason, time }: any) {
  return (
    <div className="bg-[#1E222D] p-3 rounded-lg border border-[#2B2B43] hover:border-gray-500 transition-all cursor-pointer shadow-sm group">
      <div className="flex justify-between items-start mb-2">
        <span
          className={cn(
            "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
            type === "bullish"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : type === "bearish"
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
          )}
        >
          {type}
        </span>
        <span className="text-[9px] text-gray-600 group-hover:text-gray-400 transition-colors">
          {time}
        </span>
      </div>
      <h4 className="text-sm font-bold text-gray-200 mb-1 leading-tight group-hover:text-white">
        {title}
      </h4>
      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
        {reason}
      </p>
    </div>
  );
}
