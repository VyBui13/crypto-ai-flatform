"use client";

import { PricingCard } from "@/features/subscription/components/PricingCard";
import { ShieldCheck } from "lucide-react";
import { PricingCardSkeleton } from "@/features/subscription/components/PricingCardSkeleton";
import { useSubscription } from "@/features/subscription/hooks/use-subcription";

export default function SubscriptionPage() {
  const { user, subscription, isSubscriptionLoading, handlers } =
    useSubscription();

  const currentPlanId = user?.role === "vip" ? "vip" : "basic";

  return (
    <div className="min-h-screen bg-[#0E0E14] text-gray-300 font-sans overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Supercharge your trading with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              AI Power
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Get exclusive access to real-time sentiment analysis, whale alerts,
            and premium market insights.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {isSubscriptionLoading ? (
            <>
              <PricingCardSkeleton />
              <PricingCardSkeleton />
            </>
          ) : (
            subscription?.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={{ ...plan, popular: plan.isPopular }}
                isCurrentPlan={currentPlanId === plan.id}
                onSubscribe={handlers.onSubscribe}
                isLoading={false}
              />
            ))
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-10 border-t border-[#2B2B43] flex flex-col md:flex-row justify-center items-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={18} />
            <span>Secure SSL Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={18} />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={18} />
            <span>24/7 Priority Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
