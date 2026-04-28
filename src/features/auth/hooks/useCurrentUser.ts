"use client";

import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api/user.api";
import { userKeys } from "../api/user.keys";
import { User } from "../types/user.type";

export function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: userKeys.user(),
    queryFn: userApi.getCurrentUser,
  });
}
