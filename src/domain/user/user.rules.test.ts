import { describe, expect, it } from "vitest";
import { UserRole } from "./user.enums";
import { isAdmin, isApprover, isCreator } from "./user.rules";
import type { User } from "./user.types";

function createMockUser(role: UserRole): User {
  return {
    id: "user-1",
    name: "Test User",
    email: "test@mail.com",
    role,
    organizationId: "org-1",
    createdAt: new Date(),
  };
}

describe("user.rules", () => {
  it("should detect admin role", () => {
    const user = createMockUser(UserRole.ADMIN);
    expect(isAdmin(user)).toBe(true);
  });

  it("should detect creator role", () => {
    const user = createMockUser(UserRole.CREATOR);
    expect(isCreator(user)).toBe(true);
  });

  it("should detect approver role", () => {
    const user = createMockUser(UserRole.APPROVER);
    expect(isApprover(user)).toBe(true);
  });

  it("should return false for incorrect role check", () => {
    const user = createMockUser(UserRole.CREATOR);
    expect(isAdmin(user)).toBe(false);
  });
});
