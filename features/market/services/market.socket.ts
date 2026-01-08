import { CandleData } from "../types/market.type"; // Hoặc type bạn đang dùng
import { Time } from "lightweight-charts";

type Listener = (candle: CandleData) => void;

export class CryptoSocketService {
  private symbol: string;
  private listeners: Listener[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private lastCandle: CandleData | null = null;

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  // 1. Hàm kết nối (Sau này thay bằng socket.connect)
  public connect(initialLastCandle: CandleData) {
    this.lastCandle = { ...initialLastCandle };
    console.log(`[Socket] Connected to ${this.symbol}`);

    // Giả lập server đẩy data về mỗi 1 giây
    this.intervalId = setInterval(() => {
      this.generateMockTick();
    }, 1000);
  }

  // 2. Hàm ngắt kết nối
  public disconnect() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.listeners = [];
    console.log(`[Socket] Disconnected ${this.symbol}`);
  }

  // 3. Đăng ký lắng nghe
  public subscribe(callback: Listener) {
    this.listeners.push(callback);
  }

  public unsubscribe(callback: Listener) {
    this.listeners = this.listeners.filter((l) => l !== callback);
  }

  // --- LOGIC GIẢ LẬP (PRIVATE) ---
  // Hàm này mô phỏng việc giá nhảy lên xuống
  private generateMockTick() {
    if (!this.lastCandle) return;

    const prevClose = this.lastCandle.close;
    const volatility = prevClose * 0.0005; // Biến động 0.05%
    const change = (Math.random() - 0.5) * volatility;

    const newPrice = prevClose + change;

    // Cập nhật nến hiện tại (Realtime update)
    // Logic: High/Low phải bao trùm giá mới
    const updatedCandle: CandleData = {
      ...this.lastCandle,
      close: newPrice,
      high: Math.max(this.lastCandle.high, newPrice),
      low: Math.min(this.lastCandle.low, newPrice),
      // Volume tăng dần mỗi tick
      volume: (this.lastCandle.volume || 0) + Math.random() * 10,
    };

    this.lastCandle = updatedCandle;

    // Bắn sự kiện cho UI
    this.notify(updatedCandle);
  }

  private notify(data: CandleData) {
    this.listeners.forEach((callback) => callback(data));
  }
}

// Singleton Factory (để quản lý nhiều kết nối nếu cần)
export const createSocketConnection = (symbol: string) => {
  return new CryptoSocketService(symbol);
};
