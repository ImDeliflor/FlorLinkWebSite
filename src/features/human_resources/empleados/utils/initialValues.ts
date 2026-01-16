import type { Empleado } from "../types/employee";

export const initialFilteredFormEmployee = {
  grupo: "Todos",
  nombre: "",
};

export const initialFormNewEmployee: Empleado = {
  id_tipo_documento: 0,
  nro_documento: "",
  id_ciudad_expedicion: 0,
  nombre: "",
  apellidos: "",
  id_ciudad_residencia: 0,
  celular: "",
  correo: "",
  id_cargo: 0,
  id_area: 0,
  fecha_ingreso: "",
  salario: 0,
  salario_letras: "",
  auxilio_transporte: 0,
  auxilio_transporte_letras: "",
  id_sexo: 0,
  id_eps: 0,
  id_fondo_pension: 0,
  id_fondo_cesantias: 0,
  dias_vacaciones: 0,
  fecha_nacimiento: "",
  id_estado_civil: 0,
  id_medio_transporte: 0,
  estado_empleado: "Activo",
  es_jefe: false,
  id_tipo_contrato: 0,
  id_jefe: 0,
  nickname: "",
};
