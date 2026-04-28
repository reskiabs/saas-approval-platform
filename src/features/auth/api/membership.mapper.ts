import { Membership } from "../types/membership.type";
import { MembershipDto } from "./membership.dto";

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
