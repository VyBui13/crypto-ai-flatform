import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubscriptionPlan } from "../types/subcription.type";

interface PricingCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  isDowngrade: boolean; // Prop mới để check xem có phải gói cấp thấp hơn không
  onSubscribe: (planId: string) => void;
  isLoading?: boolean;
}

export const PricingCard = ({
  plan,
  isCurrentPlan,
  isDowngrade,
  onSubscribe,
  isLoading,
}: PricingCardProps) => {
  const isVip = plan.tier === "VIP";

  // Disable nút nếu: đang loading HOẶC là plan hiện tại HOẶC là plan cấp thấp hơn
  const isDisabled = isLoading || isCurrentPlan || isDowngrade;

  // Logic hiển thị text trên nút
  const getButtonText = () => {
    if (isLoading) return <Loader2 className="animate-spin" size={24} />;
    if (isCurrentPlan) return "Current Plan";
    if (isDowngrade) return "Included"; // Hoặc "Downgrade" tùy ý
    return plan.buttonText || "Upgrade Now";
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-8 transition-all duration-300 flex flex-col h-full",
        isVip
          ? "bg-[#1E222D] border-2 border-blue-500 shadow-2xl shadow-blue-900/20 scale-105 z-10"
          : "bg-[#131722] border border-[#2B2B43] hover:border-gray-600",
        // Nếu là plan cấp thấp hơn thì làm mờ đi để user dễ nhận biết
        isDowngrade && "opacity-60 grayscale-[0.5]"
      )}
    >
      {/* Badge Popular */}
      {plan.isPopular && !isDowngrade && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <Sparkles size={12} className="text-yellow-300" />
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>
        <div className="flex items-end justify-center gap-1 mb-4">
          <span className="text-5xl font-bold text-white">${plan.price}</span>
          <span className="text-gray-500 text-lg mb-1">/{plan.period}</span>
        </div>
        <p className="text-gray-400 min-h-[3rem] px-4">{plan.description}</p>
      </div>

      {/* Action Button - Đẩy xuống đáy */}
      <div className="mt-auto">
        <button
          disabled={isDisabled}
          onClick={() => onSubscribe(plan.id)}
          className={cn(
            "w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-lg",
            // Style cho trạng thái Disabled (Current hoặc Downgrade)
            isCurrentPlan || isDowngrade
              ? "bg-[#2B2B43] text-gray-500 cursor-not-allowed border border-[#36364d]"
              : isVip
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 hover:scale-[1.02]"
              : "bg-white text-black hover:bg-gray-200"
          )}
        >
          {getButtonText()}
        </button>
      </div>

      {!isCurrentPlan && isVip && !isDowngrade && (
        <p className="text-[12px] text-center text-gray-500 mt-4">
          7-day money-back guarantee.
        </p>
      )}
    </div>
  );
};
