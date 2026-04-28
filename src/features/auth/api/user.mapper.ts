import { User } from "../types/user.type";
import { UserProfileDto } from "./user.dto";

export const userMapper = {
  toDomain(
    user: {
      id: string;
      email?: string | null;
    },
    profile: UserProfileDto | null,
  ): User {
    return {
      id: user.id,
      email: user.email ?? "",

      name: profile?.full_name ?? "",
      avatar: profile?.avatar_url ?? "",
    };
  },
};
