"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // Hàm tiện ích class merge (nếu có)
import { LoginSchema, LoginType } from "@/features/auth/schema/auth.schema";
import { useLoginMutation } from "@/features/auth/services/auth.mutation";
import { toast } from "sonner";

export default function LoginPage() {
  const { mutateAsync, isPending, error, isError } = useLoginMutation();

  // 1. Setup Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Submit Handler (Chỉ chạy khi validation pass)
  const onSubmit = async (data: LoginType) => {
    try {
      await mutateAsync(data);
      toast.success("Login successful!");
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
    <div className="bg-[#1E222D] border border-[#2B2B43] rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Sign in to access your trading terminal
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* API Error */}
        {isError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error?.message || "Something went wrong"}</span>
          </div>
        )}

        {/* username Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              username
            </label>
            {errors.username && (
              <span className="text-xs text-red-400">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="relative group">
            <User
              className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              {...register("username")}
              type="text"
              className={cn(
                "w-full bg-[#131722] border text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-1 transition-all placeholder-gray-700",
                errors.username
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-[#2B2B43] focus:border-blue-500 focus:ring-blue-500"
              )}
              placeholder="vip_user"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Password
            </label>
            {errors.password && (
              <span className="text-xs text-red-400">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              {...register("password")}
              type="password"
              className={cn(
                "w-full bg-[#131722] border text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-1 transition-all placeholder-gray-700",
                errors.password
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-[#2B2B43] focus:border-blue-500 focus:ring-blue-500"
              )}
              placeholder="••••••"
            />
          </div>
          <div className="text-right">
            <Link
              href="#"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Sign In <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
        >
          Create account
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-[#2B2B43] text-xs text-center text-gray-600 bg-[#1A1E29] -mx-8 -mb-8 p-4 rounded-b-2xl">
        <p className="font-mono">
          Demo: <span className="text-gray-400">vip_user</span> /{" "}
          <span className="text-gray-400">123456</span>
        </p>
      </div>
    </div>
  );
}
