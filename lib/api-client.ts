import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

const apiClient = axios.create({
  // Sửa import.meta.env -> process.env
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// 1. Request Interceptor: Gắn Token
apiClient.interceptors.request.use(
  (config) => {
    // Lấy token từ store (lúc này đã có biến accessToken)
    const token = useAuthStore.getState().accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["ngrok-skip-browser-warning"] = "true";

    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Response Interceptor: Xử lý lỗi 401 (Kick user)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ -> Logout ngay lập tức
      useAuthStore.getState().logout();

      // Redirect về trang login (Dùng window.location vì đây là ngoài React Component)
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default apiClient;
