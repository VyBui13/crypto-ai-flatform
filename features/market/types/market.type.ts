import { Time } from "lightweight-charts";

export interface CandleData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface CryptoSymbol {
  symbol: string;
  name: string;
  price: number;
  change: number;
}
