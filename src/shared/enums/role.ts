export const Role = {
  Admin: 1,
  User: 2,
  Superadmin: 3,
  HolaAmigo: 4,
  Almacenista: 6,
  AdminCompras: 7,
  AprobadorCompras: 8,
  UsuarioCompras: 9,
  AdminAlmacen: 10,
  SalidasAlmacen: 11,
  AdminGH: 12,
  UsuarioGH: 13,
  VisualizacionAlmacen: 14,
} as const;

export type Role = (typeof Role)[keyof typeof Role];
