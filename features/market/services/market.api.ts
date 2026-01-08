import apiClient from "@/lib/api-client";
import { generateMockCandles } from "../mocks/market.mock";
import { CandleData, SymbolInfo, TickerInfo } from "../types/market.type";

// Giả lập API call delay 500ms
export const fetchHistoricalData = async (
  symbol: string,
  interval: string = "1m",
  limit: number = 500
): Promise<CandleData[]> => {
  try {
    const response = await apiClient.get("/market/klines", {
      params: {
        symbol: symbol.toUpperCase(),
        interval,
        limit,
      },
    });

    return response.data.map((item: any) => ({
      // Backend trả về ISO string, ta convert sang Unix Timestamp (seconds)
      time: new Date(item.open_time).getTime() / 1000,
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close),
      volume: Number(item.volume),
    }));
  } catch (error) {
    throw new Error("Lấy dữ liệu thị trường thất bại. Vui lòng thử lại.");
  }
};

export const getSymbols = async (): Promise<SymbolInfo[]> => {
  try {
    const response = await apiClient.get("/market/symbols");
    return response.data.map((item: any) => ({
      symbol: item.symbol,
      baseAsset: item.base_asset,
      quoteAsset: item.quote_asset,
      status: item.status,
    }));
  } catch (error) {
    throw new Error("Lấy danh sách symbol thất bại. Vui lòng thử lại.");
  }
};

// 2. Lấy thông tin Ticker (Giá, % thay đổi) - Chuẩn bị cho bước sau
export const get24hTicker = async (symbol: string): Promise<TickerInfo> => {
  try {
    const response = await apiClient.get("/market/ticker", {
      params: { symbol: symbol.toUpperCase() },
    });
    return {
      symbol: response.data.symbol,
      priceChange: Number(response.data.price_change),
      priceChangePercent: Number(response.data.price_change_percent),
      lastPrice: Number(response.data.last_price),
      highPrice: Number(response.data.high_price),
      lowPrice: Number(response.data.low_price),
      volume: Number(response.data.volume),
    };
  } catch (error) {
    throw new Error("Lấy thông tin ticker thất bại. Vui lòng thử lại.");
  }
};
