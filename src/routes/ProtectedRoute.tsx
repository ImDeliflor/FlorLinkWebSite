// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { Role } from "@/shared/enums/role";
import { useAuthStore } from "@/shared/store/authStore";
import type { JSX } from "react";

interface ProtectedRouteProps {
  allowedRoles: readonly Role[];
  element: JSX.Element;
}

export const ProtectedRoute = ({
  allowedRoles,
  element,
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.id_rol as Role | undefined;

  if (userRole == 3) {
    return element;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};
