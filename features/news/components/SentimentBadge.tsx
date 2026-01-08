import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SentimentType } from "../types/news.type";

interface Props {
  type: SentimentType;
  score: number;
}

export const SentimentBadge = ({ type, score }: Props) => {
  const config = {
    positive: {
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
      icon: TrendingUp,
    },
    negative: {
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
      icon: TrendingDown,
    },
    neutral: {
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      border: "border-gray-400/20",
      icon: Minus,
    },
  };

  const style = config[type];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium",
        style.bg,
        style.border,
        style.color
      )}
    >
      <Icon size={12} />
      <span className="uppercase">{type}</span>
      <span className="opacity-60 ml-1">
        ({Math.abs(score * 100).toFixed(0)}%)
      </span>
    </div>
  );
};
