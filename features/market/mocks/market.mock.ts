import { CandleData, CryptoSymbol } from "../types/market.type";
// src/features/market/mock/market.mock.ts
import { Time } from "lightweight-charts";

export const generateMockCandles = (numberOfCandles: number = 200) => {
  let date = new Date();
  date.setDate(date.getDate() - numberOfCandles);

  const data = [];
  let price = 50000; // Giá khởi điểm BTC

  for (let i = 0; i < numberOfCandles; i++) {
    const volatility = Math.random() * 500 + 50;

    const open = price;
    const close = price + (Math.random() - 0.5) * volatility;

    const high = Math.max(open, close) + Math.random() * 200;
    const low = Math.min(open, close) - Math.random() * 200;

    const volume = Math.random() * 1000 + 100;

    const timeString = date.toISOString().split("T")[0];

    data.push({
      time: timeString as Time,
      open,
      high,
      low,
      close,
      volume,
    });

    price = close;
    date.setDate(date.getDate() + 1);
  }
  return data;
};

export const MOCK_SYMBOLS: CryptoSymbol[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", price: 64230.5, change: 2.5 },
  { symbol: "ETHUSDT", name: "Ethereum", price: 3450.2, change: -1.2 },
  { symbol: "SOLUSDT", name: "Solana", price: 145.8, change: 5.4 },
  { symbol: "BNBUSDT", name: "Binance Coin", price: 590.1, change: 0.5 },
  { symbol: "DOGEUSDT", name: "Dogecoin", price: 0.12, change: -3.1 },
];
