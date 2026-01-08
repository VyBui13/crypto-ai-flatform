import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalData } from "./market.api";
import { MARKET_QUERY_KEY } from "../constants/market.key";

export const useHistoricalData = (symbol: string) => {
  return useQuery({
    queryKey: [MARKET_QUERY_KEY.MARKET, MARKET_QUERY_KEY.HISTORY, symbol],
    queryFn: () => fetchHistoricalData(symbol),
    staleTime: 1000 * 60 * 5,
  });
};
