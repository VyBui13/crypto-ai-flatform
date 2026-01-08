"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User, Loader2, AlertCircle, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RegisterSchema,
  RegisterType,
} from "@/features/auth/schema/auth.schema";
import { useRegisterMutation } from "@/features/auth/services/auth.mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { mutateAsync, isPending, error, isError } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterType) => {
    // Zod đã đảm bảo password khớp nhau rồi, cứ thế gọi API thôi
    try {
      await mutateAsync({
        email: data.email,
        password: data.password,
      });
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (err) {
      // toast.error("Registration failed. Please try again.");
      console.log("Registration error:", err);
    }
  };

  return (
    <div className="bg-[#1E222D] border border-[#2B2B43] rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Create Account
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Join the AI-powered trading revolution
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* API Error */}
        {isError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error?.message}</span>
          </div>
        )}
        {/* email */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-gray-500 uppercase">
              email
            </label>
          </div>
          <div className="relative group">
            <User
              className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-500"
              size={16}
            />
            <input
              {...register("email")}
              type="text"
              className={cn(
                "w-full bg-[#131722] border rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-1 transition-colors placeholder-gray-700 text-white text-sm",
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#2B2B43] focus:border-blue-500"
              )}
              placeholder="user123"
            />
          </div>
          {errors.email && (
            <p className="text-[10px] text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase">
            Password
          </label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-500 transition-colors"
              size={16}
            />
            <input
              {...register("password")}
              type="password"
              className={cn(
                "w-full bg-[#131722] border rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-1 transition-colors placeholder-gray-700 text-white text-sm",
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#2B2B43] focus:border-blue-500"
              )}
              placeholder="••••••"
            />
          </div>
          {errors.password && (
            <p className="text-[10px] text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase">
            Confirm Password
          </label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-500 transition-colors"
              size={16}
            />
            <input
              {...register("confirmPassword")}
              type="password"
              className={cn(
                "w-full bg-[#131722] border rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-1 transition-colors placeholder-gray-700 text-white text-sm",
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#2B2B43] focus:border-blue-500"
              )}
              placeholder="••••••"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
