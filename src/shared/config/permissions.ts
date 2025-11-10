import { Role } from "@/shared/enums/role";

export const PermissionsDropdowns = {
  contabilidad: [Role.Admin, Role.User],
} as const;

export const PermissionsSections = {
  contabilidad: {
    nuevaOrden: [Role.Admin, Role.User],
    misOrdenes: [Role.Admin, Role.User],
    ordenesEquipo: [Role.Admin, Role.User],
    ordenes: [Role.Admin],
  },
} as const;
