export const PricingCardSkeleton = () => {
  return (
    <div className="relative rounded-2xl p-8 flex flex-col h-full bg-[#131722] border border-[#2B2B43]">
      <div className="mb-6 animate-pulse">
        <div className="h-7 w-32 bg-gray-800 rounded mb-4" />

        <div className="flex items-end gap-1 mb-4">
          <div className="h-10 w-24 bg-gray-800 rounded" />
          <div className="h-5 w-12 bg-gray-800 rounded mb-1" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-800 rounded" />
          <div className="h-4 w-2/3 bg-gray-800 rounded" />
        </div>
      </div>

      <div className="flex-1 space-y-4 mb-8 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Icon circle */}
            <div className="w-5 h-5 rounded-full bg-gray-800 shrink-0" />
            {/* Text line */}
            <div className="h-4 w-full bg-gray-800 rounded" />
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="h-12 w-full bg-gray-800 rounded-xl animate-pulse" />

      {/* Footer text hint */}
      <div className="h-3 w-40 bg-gray-800 rounded mx-auto mt-4 animate-pulse" />
    </div>
  );
};
