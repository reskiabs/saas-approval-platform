"use client";

import { useMemo } from "react";
import { useOrganizationStore } from "../store/organization.store";
import { useMemberships } from "./useMemberships";

export function useActiveOrganization() {
  const { data: memberships, isLoading } = useMemberships();

  const activeOrgId = useOrganizationStore((s) => s.activeOrgId);
  const setActiveOrgId = useOrganizationStore((s) => s.setActiveOrgId);

  const activeOrganization = useMemo(() => {
    if (!memberships || memberships.length === 0) return undefined;

    if (activeOrgId) {
      const found = memberships.find((m) => m.organizationId === activeOrgId);
      if (found) return found;
    }

    return memberships.find((m) => m.isDefault) ?? memberships[0];
  }, [memberships, activeOrgId]);

  return {
    activeOrganization,
    setActiveOrganization: setActiveOrgId,
    isLoading,
  };
}
