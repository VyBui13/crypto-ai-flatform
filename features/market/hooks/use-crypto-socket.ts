import { useEffect, useRef } from "react";
import { CandleData } from "../types/market.type";
import {
  createSocketConnection,
  CryptoSocketService,
} from "../services/market.socket"; // Link tới file ở Bước 2

interface UseCryptoSocketProps {
  symbol: string;
  interval?: string;
  onUpdate: (candle: CandleData) => void;
}

export const useCryptoSocket = ({
  symbol,
  interval = "1m",
  onUpdate,
}: UseCryptoSocketProps) => {
  // Dùng useRef để giữ instance của socket không bị tạo lại mỗi lần render
  const socketRef = useRef<CryptoSocketService | null>(null);

  useEffect(() => {
    if (!symbol) return;

    // 1. Khởi tạo socket service
    const socket = createSocketConnection(symbol);
    socketRef.current = socket;

    // 2. Đăng ký hàm nhận dữ liệu để update UI
    socket.subscribe((newCandle) => {
      onUpdate(newCandle);
    });

    // 3. Bắt đầu kết nối
    socket.connect();

    // 4. Cleanup function: Chạy khi component bị hủy (Unmount)
    // hoặc khi symbol thay đổi
    return () => {
      socket.disconnect();
    };
  }, [symbol, interval]); // Chạy lại effect này khi symbol đổi
};
