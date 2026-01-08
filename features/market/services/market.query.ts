import { useQuery } from "@tanstack/react-query";
import {
  fetchHistoricalData,
  get24hTicker,
  getDepth,
  getPrice,
  getSymbols,
} from "./market.api";
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

export const useMarketSymbols = () => {
  return useQuery({
    queryKey: [MARKET_QUERY_KEY.MARKET, MARKET_QUERY_KEY.SYMBOL],
    queryFn: getSymbols,
    staleTime: Infinity, // Coin list không đổi liên tục, cache lâu
    refetchOnWindowFocus: false,
  });
};

export const useTicker24h = (symbol: string) => {
  return useQuery({
    queryKey: [MARKET_QUERY_KEY.MARKET, MARKET_QUERY_KEY.TICKER_24H, symbol],
    queryFn: () => get24hTicker(symbol),
    refetchInterval: 20000, // Tự động gọi lại mỗi 20s để cập nhật giá (nếu không dùng socket)
  });
};

export const useMarketPrice = (symbol: string) => {
  return useQuery({
    queryKey: [MARKET_QUERY_KEY.MARKET, MARKET_QUERY_KEY.PRICE, symbol],
    queryFn: () => getPrice(symbol),
    refetchInterval: 5000, // Cập nhật mỗi 3s để tính tiền cho chuẩn
  });
};

export const useOrderBook = (symbol: string) => {
  return useQuery({
    queryKey: [MARKET_QUERY_KEY.MARKET, MARKET_QUERY_KEY.DEPTH, symbol],
    queryFn: () => getDepth(symbol),
    refetchInterval: 2000, // Cập nhật mỗi 2s
  });
};
