import { z } from "zod";

// 1. Login Schema
export const LoginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập tên đăng nhập"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username phải có ít nhất 3 ký tự")
      .regex(/^[a-zA-Z0-9_]+$/, "Username chỉ chứa chữ, số và dấu gạch dưới"),
    name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof RegisterSchema>;
