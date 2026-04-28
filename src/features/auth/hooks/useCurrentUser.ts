"use client";

import { createClient } from "@/shared/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single();

      return {
        id: user.id,
        email: user.email ?? "",
        name: profile?.full_name ?? "",
        avatar: profile?.avatar_url ?? "",
      };
    },
  });
}
