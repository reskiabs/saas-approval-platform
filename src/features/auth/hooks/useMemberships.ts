"use client";

import { useQuery } from "@tanstack/react-query";

import { membershipApi } from "../api/membership.api";
import { membershipKeys } from "../api/membership.keys";
import { membershipMapper } from "../api/membership.mapper";
import { Membership } from "../types/membership.type";
import { useCurrentUser } from "./useCurrentUser";

export function useMemberships() {
  const { data: user } = useCurrentUser();

  return useQuery<Membership[]>({
    queryKey: membershipKeys.list(user?.id),
    enabled: !!user?.id,

    queryFn: async () => {
      const data = await membershipApi.getByUserId(user!.id);

      return data
        .map(membershipMapper.toDomain)
        .filter((m): m is Membership => m !== null);
    },
  });
}
