import { createClient } from "@/shared/lib/supabase/client";

export type LoginPayload = {
  email: string;
  password: string;
};

export async function loginRequest({ email, password }: LoginPayload) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Invalid username or password");
  }

  if (!data.user) {
    throw new Error("Unable to sign in");
  }

  return data.user;
}
