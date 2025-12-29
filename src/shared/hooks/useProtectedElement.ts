import { useAuthStore } from "@/shared/store/authStore";
import type { Role } from "@/shared/enums/role";

const SUPERADMIN_ROLE_ID = 3;

export const useProtectedElement = () => {
  const { user } = useAuthStore();

  const roles = user?.roles ?? [];
  const esLider = !!user?.id_jefe_grupo_colaborativo;

  const isSuperAdmin = roles.some((r) => r.id_rol === SUPERADMIN_ROLE_ID);

  const canAccess = (allowedRoles: readonly Role[]) => {
    // Superadmin ve todo
    if (isSuperAdmin) return true;

    if (!roles.length) return false;

    return roles.some((r) => allowedRoles.includes(r.id_rol as Role));
  };

  const esLiderGrupoColaborativo = () => {
    // Superadmin accede a todo
    if (isSuperAdmin) return true;

    return esLider;
  };

  const esLiderGrupoColaborativoSinSA = () => {
    return esLider;
  };

  return {
    canAccess,
    esLiderGrupoColaborativo,
    esLiderGrupoColaborativoSinSA,
    isSuperAdmin,
  };
};
