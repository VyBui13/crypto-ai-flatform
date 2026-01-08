import { Check, X, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: any;
  isCurrentPlan: boolean;
  onSubscribe: (planId: string) => void;
  isLoading?: boolean;
}

export const PricingCard = ({
  plan,
  isCurrentPlan,
  onSubscribe,
  isLoading,
}: PricingCardProps) => {
  const isVip = plan.id === "vip";

  return (
    <div
      className={cn(
        "relative rounded-2xl p-8 transition-all duration-300 flex flex-col h-full",
        isVip
          ? "bg-[#1E222D] border-2 border-blue-500 shadow-2xl shadow-blue-900/20 scale-105 z-10"
          : "bg-[#131722] border border-[#2B2B43] hover:border-gray-600"
      )}
    >
      {/* Badge Popular */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <Sparkles size={12} className="text-yellow-300" />
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
        <div className="flex items-end gap-1 mb-2">
          <span className="text-4xl font-bold text-white">${plan.price}</span>
          <span className="text-gray-500 text-sm mb-1">/month</span>
        </div>
        <p className="text-sm text-gray-400">{plan.description}</p>
      </div>

      {/* Features List */}
      <div className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <Check size={12} className="text-green-500" />
            </div>
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
        {plan.missingFeatures.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-3 text-sm opacity-50">
            <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
              <X size={12} className="text-gray-500" />
            </div>
            <span className="text-gray-500">{feature}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        disabled={isCurrentPlan || isLoading}
        onClick={() => onSubscribe(plan.id)}
        className={cn(
          "w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2",
          isCurrentPlan
            ? "bg-[#2B2B43] text-gray-400 cursor-default"
            : isVip
            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 hover:scale-[1.02]"
            : "bg-white text-black hover:bg-gray-200"
        )}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : isCurrentPlan ? (
          "Current Plan"
        ) : (
          "Upgrade Now"
        )}
      </button>

      {!isCurrentPlan && isVip && (
        <p className="text-[10px] text-center text-gray-500 mt-3">
          7-day money-back guarantee.
        </p>
      )}
    </div>
  );
};
