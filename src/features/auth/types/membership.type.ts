export type Membership = {
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  role: string;
  isDefault: boolean;
};

export type OrganizationMember = {
  id: string;
  name: string;
  avatar?: string;
  role: string;
};
