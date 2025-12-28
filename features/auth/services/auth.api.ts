import { MOCK_USERS } from "../mocks/auth.mock";
import {
  AuthRole,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth.type";

// Giả lập "Database"
let DB_USERS = { ...MOCK_USERS };

// 1. API Đăng nhập
export const loginUser = async (creds: LoginCredentials): Promise<User> => {
  console.log(`[API] Attempting login for ${creds.username}...`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Logic check password mock
      const user = Object.values(DB_USERS).find(
        (u) => u.username === creds.username && "123456" === creds.password
      );

      if (user) {
        console.log("[API] Login success:", user);
        resolve(user);
      } else {
        console.error("[API] Login failed: Invalid credentials");
        reject(new Error("Tài khoản hoặc mật khẩu không đúng"));
      }
    }, 1000); // Delay 1s
  });
};

// 2. API Đăng ký
export const registerUser = async (
  creds: RegisterCredentials
): Promise<User> => {
  console.log(`[API] Attempting register for ${creds.username}...`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Logic check trùng username
      const exists = Object.values(DB_USERS).find(
        (u) => u.username === creds.username
      );

      if (exists) {
        reject(new Error("Tên đăng nhập đã tồn tại"));
        return;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: creds.username,
        name: creds.name || creds.username,
        role: AuthRole.NORMAL,
        avatar: `https://ui-avatars.com/api/?name=${creds.username}&background=random`,
      };

      // Lưu vào DB giả
      DB_USERS[newUser.username] = newUser;

      console.log("[API] Register success:", newUser);
      resolve(newUser);
    }, 1000);
  });
};
