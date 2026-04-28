import { createClient } from "@/shared/lib/supabase/client";
import { User } from "../types/user.type";
import { UserProfileDto } from "./user.dto";
import { userMapper } from "./user.mapper";

export const userApi = {
  async getCurrentUser(): Promise<User | null> {
    const supabase = createClient();

    // auth user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;

    // profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;

    return userMapper.toDomain(
      {
        id: user.id,
        email: user.email,
      },
      profile as UserProfileDto,
    );
  },
};
