export enum AuthRole {
  VIP = "vip",
  NORMAL = "normal",
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: AuthRole;
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}
