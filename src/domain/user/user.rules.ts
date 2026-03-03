import { UserRole } from "./user.enums";
import { User } from "./user.types";

export function isAdmin(user: User) {
  return user.role === UserRole.ADMIN;
}

export function isCreator(user: User) {
  return user.role === UserRole.CREATOR;
}

export function isApprover(user: User) {
  return user.role === UserRole.APPROVER;
}
