export const TIER_RANKS: Record<string, number> = {
  FREE: 0,
  VIP: 1,
  // Sau này có thể thêm:
  // PREMIUM: 2,
  // ENTERPRISE: 3
};

// Hàm helper để lấy rank an toàn
export const getTierRank = (tier?: string) => {
  return TIER_RANKS[tier || "FREE"] ?? 0;
};
