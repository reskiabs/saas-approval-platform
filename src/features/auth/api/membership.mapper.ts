import { Membership, OrganizationMember } from "../types/membership.type";
import { MembershipDto, OrganizationMemberDto } from "./membership.dto";

export const membershipMapper = {
  toDomain(dto: MembershipDto): Membership | null {
    if (!dto.organization) return null;

    return {
      organizationId: dto.organization.id,
      organizationName: dto.organization.name,
      organizationSlug: dto.organization.slug,
      role: dto.role,
      isDefault: dto.is_default,
    };
  },
};

export const memberMapper = {
  toDomain(dto: OrganizationMemberDto): OrganizationMember | null {
    if (!dto.user) return null;

    return {
      id: dto.user.id,
      name: dto.user.full_name,
      avatar: dto.user.avatar_url ?? undefined,
      role: dto.role,
    };
  },
};
