import { UserRole } from "./user.enums";

export type UserId = string;
export type OrganizationId = string;

export type User = {
  id: UserId;
  name: string;
  email: string;
  role: UserRole;
  organizationId: OrganizationId;
  createdAt: Date;
};
