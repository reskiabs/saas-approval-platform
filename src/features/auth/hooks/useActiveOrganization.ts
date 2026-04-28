"use client";

import { useEffect, useState } from "react";
import { useMemberships } from "./useMemberships";

const STORAGE_KEY = "active-org-id";

export function useActiveOrganization() {
  const { data: memberships, isLoading } = useMemberships();

  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setActiveOrgId(stored);
  }, []);

  // Initialize default
  useEffect(() => {
    if (!memberships || memberships.length === 0) return;

    // if no active selected yet
    if (!activeOrgId) {
      const defaultOrg = memberships.find((m) => m.isDefault) ?? memberships[0];

      setActiveOrgId(defaultOrg.organizationId);
      localStorage.setItem(STORAGE_KEY, defaultOrg.organizationId);
    }
  }, [memberships, activeOrgId]);

  const activeOrganization = memberships?.find(
    (m) => m.organizationId === activeOrgId,
  );

  const setActiveOrganization = (orgId: string) => {
    setActiveOrgId(orgId);
    localStorage.setItem(STORAGE_KEY, orgId);
  };

  return {
    activeOrganization,
    setActiveOrganization,
    isLoading,
  };
}
