export type MembershipDto = {
  role: string;
  is_default: boolean;
  organization: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type OrganizationMemberDto = {
  role: string;
  user: {
    id: string;
    full_name: string;
    avatar_url?: string | null;
  } | null;
};
