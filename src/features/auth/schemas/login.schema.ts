import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;