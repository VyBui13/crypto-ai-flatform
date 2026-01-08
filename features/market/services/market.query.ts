import { useQuery } from "@tanstack/react-query";
import { fetchHistoricalData } from "./market.api";
import { MARKET_QUERY_KEY } from "../constants/market.key";

export const useHistoricalData = (symbol: string, interval: string = "1m") => {
  return useQuery({
    queryKey: [
      MARKET_QUERY_KEY.MARKET,
      MARKET_QUERY_KEY.HISTORY,
      symbol,
      interval,
    ],
    queryFn: () => fetchHistoricalData(symbol, interval),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
  });
};
