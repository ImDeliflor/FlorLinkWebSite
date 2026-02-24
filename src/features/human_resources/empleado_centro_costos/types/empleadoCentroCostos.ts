export interface EmpleadoCentroCostos {
  id_empleado: number;
  id_centro_costos: number;
  porc_impacto: number;
}

export interface EmpleadoCentroCostosReport {
  id_empleado: number;
  nombre_empleado: string;
  id_centro_costos: number;
  nombre_centro_costos: string;
  porc_impacto: number;
}
