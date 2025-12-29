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

  // 1No autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Seguridad extra
  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  const userRoles = user.roles ?? [];

  // Superadmin ve todo
  if (userRoles.some((r) => r.id_rol === Role.Superadmin)) {
    return element;
  }

  // Validar roles permitidos
  const hasPermission = allowedRoles.some((allowedRole) =>
    userRoles.some((userRole) => userRole.id_rol === allowedRole)
  );

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};
