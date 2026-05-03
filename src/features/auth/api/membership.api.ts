import { createClient } from "@/shared/lib/supabase/client";
import { MembershipDto } from "./membership.dto";

export const membershipApi = {
  async getByUserId(userId: string): Promise<MembershipDto[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("organization_members")
      .select(
        `
        role,
        is_default,
        organization:organizations (
          id,
          name,
          slug
        )
      `,
      )
      .eq("user_id", userId)
      .returns<MembershipDto[]>();

    if (error) throw error;

    return data ?? [];
  },

  async getMembersByOrganizationId(orgId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("organization_members")
      .select(
        `
        role,
        user:profiles (
          id,
          full_name,
          avatar_url
        )
      `,
      )
      .eq("organization_id", orgId);

    if (error) throw error;

    return data ?? [];
  },
};
