export type MembershipDto = {
  role: string;
  is_default: boolean;
  organization: {
    id: string;
    name: string;
    slug: string;
  } | null;
};
