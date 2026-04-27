import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email")
    .refine(
      (val) =>
        val.endsWith(".com") || val.endsWith(".co.id") || val.endsWith(".demo"),
      {
        message: "Domain must be .com, .co.id, or .demo",
      },
    ),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
