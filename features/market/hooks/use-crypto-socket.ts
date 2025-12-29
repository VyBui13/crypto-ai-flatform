import { useEffect, useRef } from "react";
import { CandleData } from "../types/market.type"; // Import đúng type của bạn
import {
  createSocketConnection,
  CryptoSocketService,
} from "../services/market.socket";

interface UseCryptoSocketProps {
  symbol: string;
  lastCandle?: CandleData; // Cần nến cuối cùng để bắt đầu nhảy giá tiếp
  onUpdate: (candle: CandleData) => void; // Hàm callback cập nhật chart
  enabled?: boolean;
}

export const useCryptoSocket = ({
  symbol,
  lastCandle,
  onUpdate,
  enabled = true,
}: UseCryptoSocketProps) => {
  const socketRef = useRef<CryptoSocketService | null>(null);

  useEffect(() => {
    // Chỉ chạy khi có data lịch sử (để biết giá bắt đầu từ đâu)
    if (!enabled || !lastCandle) return;

    // 1. Khởi tạo kết nối
    const socket = createSocketConnection(symbol);
    socketRef.current = socket;

    // 2. Subscribe sự kiện
    socket.subscribe((newCandle) => {
      onUpdate(newCandle);
    });

    // 3. Connect (Gửi nến cuối để mock tiếp)
    socket.connect(lastCandle);

    // 4. Cleanup khi unmount hoặc đổi symbol
    return () => {
      socket.disconnect();
    };
  }, [symbol, enabled, lastCandle]); // Re-run nếu symbol thay đổi
};
