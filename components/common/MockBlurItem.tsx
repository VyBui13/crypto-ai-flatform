export default function MockBlurItem() {
  return (
    <div className="mb-3 p-3 bg-[#1E222D] rounded border border-[#2B2B43] opacity-60 filter blur-[2px]">
      <div className="flex justify-between mb-2">
        <div className="w-12 h-3 bg-gray-700 rounded-sm"></div>
        <div className="w-8 h-3 bg-gray-800 rounded-sm"></div>
      </div>
      <div className="w-3/4 h-4 bg-gray-600 rounded mb-2"></div>
      <div className="w-full h-2 bg-gray-700 rounded"></div>
    </div>
  );
}
