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
    Role.VisualizacionAlmacen,
  ],
  informes_almacen: [Role.Admin, Role.ReportAlmacenLoteVencimiento],
  gestion_humana: [
    Role.Admin,
    Role.AdminGH,
    Role.UsuarioGH,
    Role.UsuarioEvalDesempenio,
  ],
  produccion: [Role.Superadmin],
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
    productosAlmacen: [
      Role.Admin,
      Role.AdminAlmacen,
      Role.Almacenista,
      Role.VisualizacionAlmacen,
    ],
    inventarioAlmacen: [
      Role.Admin,
      Role.AdminAlmacen,
      Role.Almacenista,
      Role.SalidasAlmacen,
      Role.VisualizacionAlmacen,
    ],
    entradas: [
      Role.Admin,
      Role.AdminAlmacen,
      Role.Almacenista,
      Role.VisualizacionAlmacen,
    ],
    salidas: [
      Role.Admin,
      Role.AdminAlmacen,
      Role.Almacenista,
      Role.SalidasAlmacen,
      Role.VisualizacionAlmacen,
    ],
    informes: {
      vencimientoLotes: [
        Role.Admin,
        Role.ReportAlmacenLoteVencimiento,
        Role.Almacenista,
      ],
    },
  },
  gestion_humana: {
    empleados: [Role.Admin, Role.AdminGH, Role.UsuarioGH],
    evaluaciones_desempenio: [
      Role.Admin,
      Role.AdminGH,
      Role.UsuarioEvalDesempenio,
    ],
  },
  produccion: {
    consumo_caldera: [Role.Superadmin],
  },
} as const;

// Objeto para parametrizar los permisos de cada sección
export const IndividualPrivileges = {
  almacen: {
    // Roles permitidos para crear ajustes de inventario, NC y ND
    accesoAINCND: [Role.AdminAlmacen],
    // Roles permitidos para crear productos
    crearNuevoProducto: [Role.AdminAlmacen, Role.Almacenista],
    // Roles que no van a tener acceso a acciones de edición creación o eliminación en almacén
    visualizarAlmacen: [Role.VisualizacionAlmacen],
    // Roles que van a tener acceso a acciones de edición creación o eliminación en almacén
    administrarAlmacen: [Role.Admin, Role.AdminAlmacen, Role.Almacenista],
  },
  gestion_humana: {
    // Roles permitidos para visualizar y editar el salario de los empleados
    accesoSalario: [Role.AdminGH],
    evaluaciones_desempenio: {
      grupo_primario: [Role.Admin],
    },
  },
  produccion: {
    // Roles permitidos para crear consumos de la caldera
    crearConsumo: [Role.Superadmin],
  },
} as const;
