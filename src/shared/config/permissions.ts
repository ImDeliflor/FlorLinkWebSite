import { Role } from "@/shared/enums/role";

// Objeto para parametrizar los permisos de cada dropdown
export const PermissionsDropdowns = {
  contabilidad: [
    Role.Admin,
    Role.AdminCompras,
    Role.AprobadorCompras,
    Role.UsuarioCompras,
  ],
  almacen: [
    Role.Admin,
    Role.AdminAlmacen,
    Role.Almacenista,
    Role.SalidasAlmacen,
  ],
  gestion_humana: [Role.Admin, Role.AdminGH, Role.UsuarioGH],
} as const;

// Objeto para parametrizar los permisos de cada sección
export const PermissionsSections = {
  contabilidad: {
    nuevaOrden: [
      Role.Admin,
      Role.AdminCompras,
      Role.AprobadorCompras,
      Role.UsuarioCompras,
    ],
    misOrdenes: [
      Role.Admin,
      Role.AdminCompras,
      Role.AprobadorCompras,
      Role.UsuarioCompras,
    ],
    ordenesEquipo: [Role.Admin, Role.AdminCompras, Role.AprobadorCompras],
    ordenes: [Role.Admin, Role.AdminCompras],
  },
  almacen: {
    productosAlmacen: [Role.Admin, Role.AdminAlmacen, Role.Almacenista],
    inventarioAlmacen: [
      Role.Admin,
      Role.AdminAlmacen,
      Role.Almacenista,
      Role.SalidasAlmacen,
    ],
    entradas: [Role.Admin, Role.AdminAlmacen, Role.Almacenista],
    salidas: [
      Role.Admin,
      Role.AdminAlmacen,
      Role.Almacenista,
      Role.SalidasAlmacen,
    ],
  },
  gestion_humana: {
    empleados: [Role.Admin, Role.AdminGH, Role.UsuarioGH],
    evaluaciones_desempenio: [Role.Admin, Role.AdminGH],
  },
} as const;

// Objeto para parametrizar los permisos de cada sección
export const IndividualPrivileges = {
  almacen: {
    // Roles permitidos para crear ajustes de inventario, NC y ND
    accesoAINCND: [Role.AdminAlmacen],
  },
  gestion_humana: {
    // Roles permitidos para visualizar y editar el salario de los empleados
    accesoSalario: [Role.AdminGH],
    evaluaciones_desempenio: {
      grupo_primario: [Role.Admin],
    },
  },
} as const;
