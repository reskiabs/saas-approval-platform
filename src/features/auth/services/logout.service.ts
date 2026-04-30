import { createClient } from "@/shared/lib/supabase/client";

export async function logoutRequest() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Failed to logout");
  }
}
