export interface WorkTeam {
  id_empleado: number;
  nombre: string;
  apellidos: string;
  es_jefe: boolean;
  grupo: "Administrativo" | "Operativo";
}
