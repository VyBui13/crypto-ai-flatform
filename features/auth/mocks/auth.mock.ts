import { AuthRole, User } from "../types/auth.type";

// Mật khẩu mặc định cho cả 2 là: "123456" (Mock logic check sau)
export const MOCK_USERS: Record<string, User> = {
  vip_user: {
    id: "u1",
    username: "vip_user",
    name: "Elon Musk",
    role: AuthRole.VIP,
    avatar:
      "https://ui-avatars.com/api/?name=Elon+Musk&background=0D8ABC&color=fff",
  },
  normal_user: {
    id: "u2",
    username: "normal_user",
    name: "Nguyen Van A",
    role: AuthRole.NORMAL,
    avatar: "https://ui-avatars.com/api/?name=Van+A&background=random",
  },
};
