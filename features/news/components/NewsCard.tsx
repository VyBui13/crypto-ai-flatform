import { NewsArticle } from "../types/news.type";
import { SentimentBadge } from "./SentimentBadge";
import { Clock, ExternalLink, Bot } from "lucide-react";

interface Props {
  data: NewsArticle;
}

export const NewsCard = ({ data }: Props) => {
  // Format thời gian tương đối (e.g., "2 hours ago")
  const timeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="group bg-[#1E222D] border border-[#2B2B43] rounded-xl p-5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10">
      {/* Header: Source & Time */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-wider">
            {data.source}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock size={10} /> {timeAgo(data.publishedAt)}
          </span>
        </div>

        {/* Sentiment Badge */}
        <SentimentBadge type={data.sentiment} score={data.sentimentScore} />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-gray-100 mb-2 leading-snug group-hover:text-blue-400 transition-colors">
        {data.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2 mb-4">{data.summary}</p>

      {/* AI Analysis Box */}
      <div className="bg-[#131722] rounded-lg p-3 border border-[#2B2B43] mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Bot size={14} className="text-amber-500" />
          <span className="text-xs font-bold text-amber-500 uppercase">
            AI Insight
          </span>
        </div>
        <p className="text-xs text-gray-300 italic">"{data.aiReasoning}"</p>
      </div>

      {/* Footer: Coins & Action */}
      <div className="flex justify-between items-center pt-3 border-t border-[#2B2B43]">
        <div className="flex gap-2">
          {data.relatedCoins.map((coin) => (
            <span
              key={coin}
              className="text-[10px] font-bold text-gray-400 bg-gray-700/30 px-1.5 py-0.5 rounded border border-gray-600/30"
            >
              ${coin}
            </span>
          ))}
        </div>
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
        >
          Read Original <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};
