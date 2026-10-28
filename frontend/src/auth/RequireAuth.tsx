import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "react-oidc-context";
import type { UserRole } from "../types";
import { getMainRole, homePathPerRole } from "./roles";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return null;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles) {
    const mainRole = getMainRole(auth.user);
    const hasAccess = mainRole !== undefined && allowedRoles.includes(mainRole);

    if (!hasAccess) {
      return (
        <Navigate to={mainRole ? homePathPerRole[mainRole] : "/"} replace />
      );
    }
  }

  return <>{children}</>;
};

export default RequireAuth;
