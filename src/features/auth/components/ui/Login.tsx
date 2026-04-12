"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
  username: z
    .string("Username is required")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
  password: z.string("Password is required").min(6, "Minimum 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginForm> = (data) => {
    console.log("data", data);
    router.push("/dashboard");
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Username */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-neutral-700"
            >
              Username
            </label>

            <input
              type="text"
              id="username"
              placeholder="Insert your username"
              autoComplete="username"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "usernameError" : undefined}
              {...register("username")}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none text-black transition-all duration-200
          ${
            errors.username
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-neutral-200 focus:border-black focus:ring-2 focus:ring-black/10"
          }`}
            />

            {errors.username && (
              <p
                id="usernameError"
                className="text-xs text-red-500"
                aria-live="polite"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-700"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              placeholder="Insert your password"
              autoComplete="off"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "passwordError" : undefined}
              {...register("password")}
              className={`w-full rounded-lg border text-black px-4 py-2.5 text-sm outline-none transition-all duration-200
          ${
            errors.password
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-neutral-200 focus:border-black focus:ring-2 focus:ring-black/10"
          }`}
            />

            {errors.password && (
              <p
                id="passwordError"
                className="text-xs text-red-500"
                aria-live="polite"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-neutral-400"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
