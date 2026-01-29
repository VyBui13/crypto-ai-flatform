import { UTCTimestamp } from "lightweight-charts";
import { CandleData } from "../types/market.type";

type Listener = (candle: CandleData) => void;

export class CryptoSocketService {
  private symbol: string;
  private interval: string;
  private socket: WebSocket | null = null;
  private listeners: Listener[] = [];
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor(symbol: string, interval: string = "1m") {
    this.symbol = symbol.toUpperCase(); // Backend yêu cầu viết hoa (BTCUSDT)
    this.interval = interval;
  }

  public connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    // 1. Base URL từ .env (ws://localhost:8000/api/v1)
    const baseUrl =
      process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/api/v1";

    // 2. Tạo Query Params đúng chuẩn Backend FastAPI yêu cầu
    const params = new URLSearchParams({
      symbol: this.symbol,
      stream_type: "kline", // Backend bắt buộc phải có tham số này
      interval: this.interval,
    });

    // 3. Ghép URL: /market/ws/market + Query Params
    const url = `${baseUrl}/market/ws/market?${params.toString()}`;

    console.log(`[Socket] Connecting to ${url}...`);
    this.socket = new WebSocket(url);

    // --- Xử lý sự kiện ---
    this.socket.onopen = () => {
      console.log(`[Socket] Connected to ${this.symbol}`);
      if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.error) {
          console.error("[Socket] Server Error:", message.error);
          return;
        }

        // Map dữ liệu từ Binance Stream format về Frontend format
        // Backend trả về object có key 'k' (kline)
        if (message.k) {
          const candle: CandleData = {
            time: (message.k.t / 1000) as UTCTimestamp,
            open: parseFloat(message.k.o),
            high: parseFloat(message.k.h),
            low: parseFloat(message.k.l),
            close: parseFloat(message.k.c),
            volume: parseFloat(message.k.v),
          };
          this.notify(candle);
        }
      } catch (error) {
        console.error("[Socket] Error parsing message:", error);
      }
    };

    this.socket.onclose = () => {
      console.log(`[Socket] Closed ${this.symbol}. Reconnecting...`);
      this.reconnectTimeout = setTimeout(() => this.connect(), 3000);
    };

    this.socket.onerror = (error) => {
      console.error(`[Socket] Error ${this.symbol}:`, error);
      this.socket?.close();
    };
  }

  public disconnect() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    if (this.socket) {
      this.socket.onclose = null;
      this.socket.close();
      this.socket = null;
    }
    this.listeners = [];
  }

  public subscribe(callback: Listener) {
    this.listeners.push(callback);
  }

  public unsubscribe(callback: Listener) {
    this.listeners = this.listeners.filter((l) => l !== callback);
  }

  private notify(data: CandleData) {
    this.listeners.forEach((callback) => callback(data));
  }
}

export const createSocketConnection = (symbol: string) => {
  return new CryptoSocketService(symbol);
};
