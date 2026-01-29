import { useState, useEffect } from "react";

/**
 * Hook giúp trì hoãn việc cập nhật giá trị
 * @param value Giá trị cần theo dõi (thường là state của input)
 * @param delay Thời gian trễ (ms) - Mặc định 500ms
 * @returns Giá trị đã được debounce
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Chạy lại effect nếu value hoặc delay thay đổi

  return debouncedValue;
}

export default useDebounce;
