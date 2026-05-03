"use client";

import { useQuery } from "@tanstack/react-query";
import { membershipApi } from "../api/membership.api";
import { membershipKeys } from "../api/membership.keys";
import { memberMapper } from "../api/membership.mapper";
import { useActiveOrganization } from "./useActiveOrganization";

export function useOrganizationMembers() {
  const { activeOrganization } = useActiveOrganization();

  return useQuery({
    queryKey: membershipKeys.members(activeOrganization?.organizationId),

    enabled: !!activeOrganization?.organizationId,

    queryFn: async () => {
      const data = await membershipApi.getMembersByOrganizationId(
        activeOrganization!.organizationId,
      );

      return data.map(memberMapper.toDomain).filter(Boolean);
    },
  });
}
