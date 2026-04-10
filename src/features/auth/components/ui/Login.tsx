import { zodResolver } from "@hookform/resolvers/zod";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginForm> = (data) => {};
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
      </div>
    </main>
  );
}
