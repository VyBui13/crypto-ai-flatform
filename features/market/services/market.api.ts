import { generateMockCandles } from "../mocks/market.mock";
import { CandleData } from "../types/market.type";

// Giả lập API call delay 500ms
export const fetchHistoricalData = async (
  symbol: string
): Promise<CandleData[]> => {
  const result = generateMockCandles(200);
  console.log(`Fetching data for ${symbol}...`);
  console.log(result);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Fetching data for ${symbol}...`);
      resolve(result);
    }, 500);
  });
};
