import { Organization } from "./organization.types";

export function createOrganization(name: string): Organization {
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date(),
  };
}
