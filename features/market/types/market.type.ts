import { Time } from "lightweight-charts";

export interface CandleData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface SymbolInfo {
  symbol: string;
  baseAsset: string; // BTC
  quoteAsset: string; // USDT
  status?: string; // TRADING
}

export interface TickerInfo {
  symbol: string;
  priceChange: number; // Giá thay đổi
  priceChangePercent: number; // % thay đổi (Quan trọng)
  lastPrice: number; // Giá hiện tại
  highPrice: number; // Giá cao nhất 24h
  lowPrice: number; // Giá thấp nhất 24h
  volume: number; // Khối lượng giao dịch
}

export interface PriceInfo {
  symbol: string;
  price: number;
}

export interface OrderBookEntry {
  price: string;
  quantity: string;
}

export interface OrderBook {
  symbol: string;
  lastUpdateId: number;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}
