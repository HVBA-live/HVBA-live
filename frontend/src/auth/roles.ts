import type { User } from "oidc-client-ts";
import type { UserRole } from "../types";

const rolePriority: UserRole[] = ["admin", "justitie", "politie", "gebruiker"];

export const homePathPerRole: Record<UserRole, string> = {
  admin: "/admin",
  justitie: "/judge",
  politie: "/police",
  gebruiker: "/lawyer",
};

export const getRoles = (user: User | null | undefined): UserRole[] => {
  const realmAccess = user?.profile.realm_access as
    | { roles?: string[] }
    | undefined;
  const roles = realmAccess?.roles ?? [];
  return rolePriority.filter((role) => roles.includes(role));
};

export const getMainRole = (
  user: User | null | undefined,
): UserRole | undefined => {
  return getRoles(user)[0];
};
