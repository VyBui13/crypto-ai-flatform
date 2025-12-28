import { CandleData, CryptoSymbol } from "../types/market.type";

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

export const MOCK_SYMBOLS: CryptoSymbol[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", price: 64230.5, change: 2.5 },
  { symbol: "ETHUSDT", name: "Ethereum", price: 3450.2, change: -1.2 },
  { symbol: "SOLUSDT", name: "Solana", price: 145.8, change: 5.4 },
  { symbol: "BNBUSDT", name: "Binance Coin", price: 590.1, change: 0.5 },
  { symbol: "DOGEUSDT", name: "Dogecoin", price: 0.12, change: -3.1 },
];
