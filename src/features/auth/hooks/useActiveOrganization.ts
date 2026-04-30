"use client";

import { useMemo, useState } from "react";
import { useMemberships } from "./useMemberships";

const STORAGE_KEY = "active-org-id";

export function useActiveOrganization() {
  const { data: memberships, isLoading } = useMemberships();

  const [storedOrgId, setStoredOrgId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEY);
  });

  const activeOrganization = useMemo(() => {
    if (!memberships || memberships.length === 0) return undefined;

    // 1. dari storage
    if (storedOrgId) {
      const found = memberships.find((m) => m.organizationId === storedOrgId);
      if (found) return found;
    }

    return memberships.find((m) => m.isDefault) ?? memberships[0];
  }, [memberships, storedOrgId]);

  const setActiveOrganization = (orgId: string) => {
    setStoredOrgId(orgId);
    localStorage.setItem(STORAGE_KEY, orgId);
  };

  return {
    activeOrganization,
    setActiveOrganization,
    isLoading,
  };
}
