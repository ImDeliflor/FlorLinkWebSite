import { useAuthStore } from "@/shared/store/authStore";
import type { Role } from "@/shared/enums/role";

export const useProtectedElement = () => {
  const { user } = useAuthStore();
  const userRole = user?.id_rol as Role | undefined;
  const esLider = user?.id_jefe_grupo_colaborativo;

  const canAccess = (allowedRoles: readonly Role[]) => {
    // Superadmin puede ver todo
    if (userRole === 3) return true;

    if (!userRole) return false;
    return allowedRoles.includes(userRole);
  };

  const esLiderGrupoColaborativo = () => {
    // Superadmin puede acceder a todo
    if (userRole === 3) return true;

    if (esLider) return true;

    return false;
  };

  const esLiderGrupoColaborativoSinSA = () => {
    if (esLider) return true;

    return false;
  };

  return { canAccess, esLiderGrupoColaborativo, esLiderGrupoColaborativoSinSA };
};
