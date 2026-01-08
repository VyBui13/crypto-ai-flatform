import apiClient from "@/lib/api-client";
import { MOCK_USERS } from "../mocks/auth.mock";
import {
  AuthRole,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth.type";
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
} from "./auth.dto";

// Giả lập "Database"
let DB_USERS = { ...MOCK_USERS };

// 1. API Đăng nhập
export const loginUser = async (
  data: LoginRequestDto
): Promise<LoginResponseDto> => {
  // console.log(`[API] Attempting login for ${creds.username}...`);

  const formData = new URLSearchParams();
  formData.append("username", data.email); // BE FastAPI yêu cầu field này tên là 'username'
  formData.append("password", data.password);

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // Logic check password mock
  //     const user = Object.values(DB_USERS).find(
  //       (u) => u.username === creds.username && "123456" === creds.password
  //     );

  //     if (user) {
  //       console.log("[API] Login success:", user);
  //       resolve(user);
  //     } else {
  //       console.error("[API] Login failed: Invalid credentials");
  //       reject(new Error("Tài khoản hoặc mật khẩu không đúng"));
  //     }
  //   }, 1000); // Delay 1s
  // });
  try {
    const response = await apiClient.post("/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // Giả sử API trả về user data
    return {
      accessToken: response.data.access_token,
    };
  } catch (error) {
    throw new Error("Tài khoản hoặc mật khẩu không đúng");
  }
};

export const registerUser = async (data: RegisterRequestDto): Promise<void> => {
  try {
    await apiClient.post("/register", {
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
  }
};

export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await apiClient.get("/users/me");
    return response.data;
  } catch (error) {
    throw new Error("Không thể lấy thông tin người dùng.");
  }
};
