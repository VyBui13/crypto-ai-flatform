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

    const socket = createSocketConnection(symbol);
    socketRef.current = socket;

    socket.subscribe((newCandle) => {
      onUpdate(newCandle);
    });

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [symbol, interval]); // Chạy lại effect này khi symbol đổi
};
