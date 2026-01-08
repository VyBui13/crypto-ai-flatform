import apiClient from "@/lib/api-client";
import { generateMockCandles } from "../mocks/market.mock";
import { CandleData } from "../types/market.type";

// Giả lập API call delay 500ms
export const fetchHistoricalData = async (
  symbol: string,
  interval: string = "1m",
  limit: number = 500
): Promise<CandleData[]> => {
  // const result = generateMockCandles(200);
  // console.log(`Fetching data for ${symbol}...`);
  // console.log(result);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log(`Fetching data for ${symbol}...`);
  //     resolve(result);
  //   }, 500);
  // });
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
