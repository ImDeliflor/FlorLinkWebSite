import { Role } from "@/shared/enums/role";

export const PermissionsDropdowns = {
  contabilidad: [Role.Admin, Role.User],
  almacen: [Role.Admin],
} as const;

export const PermissionsSections = {
  contabilidad: {
    nuevaOrden: [Role.Admin, Role.User],
    misOrdenes: [Role.Admin, Role.User],
    ordenesEquipo: [Role.Admin, Role.User],
    ordenes: [Role.Admin],
  },
  almacen: {
    productosAlmacen: [Role.Admin],
    inventarioAlmacen: [Role.Admin],
    entradas: [Role.Admin],
    salidas: [Role.Admin],
  },
} as const;
