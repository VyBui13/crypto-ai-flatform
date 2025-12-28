import { CandleData } from "../types/market.type";

export const generateMockCandles = (
  numberOfCandles: number = 100
): CandleData[] => {
  let date = new Date();
  date.setDate(date.getDate() - numberOfCandles);

  const data: CandleData[] = [];
  let price = 50000; // Giá khởi điểm BTC

  for (let i = 0; i < numberOfCandles; i++) {
    const vol = Math.random() * 100 + 10;
    const open = price;
    const close = price + (Math.random() - 0.5) * vol * 20;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;

    // Format YYYY-MM-DD
    const timeString = date.toISOString().split("T")[0];

    data.push({
      time: timeString,
      open,
      high,
      low,
      close,
    });

    price = close;
    date.setDate(date.getDate() + 1);
  }
  return data;
};
