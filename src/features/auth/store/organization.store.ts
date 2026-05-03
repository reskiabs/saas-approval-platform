import { create } from "zustand";

type OrganizationState = {
  activeOrgId: string | null;
  setActiveOrgId: (id: string) => void;
};

const STORAGE_KEY = "active-org-id";

export const useOrganizationStore = create<OrganizationState>((set) => ({
  activeOrgId:
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null,

  setActiveOrgId: (id) => {
    localStorage.setItem(STORAGE_KEY, id);
    set({ activeOrgId: id });
  },
}));
