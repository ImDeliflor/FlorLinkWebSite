export interface Empleado {
  id_empleado?: number;

  id_tipo_documento: number;
  nro_documento: string;

  id_ciudad_expedicion: number;
  nombre: string;
  apellidos: string;
  nickname?: string;

  id_ciudad_residencia: number;
  celular: string;
  correo: string;

  id_cargo: number;
  id_area: number;

  fecha_ingreso: string;
  fecha_nacimiento: string;

  salario: number;
  salario_letras: string;

  auxilio_transporte: number;
  auxilio_transporte_letras: string;

  id_sexo: number;
  id_eps: number;
  id_fondo_pension: number;
  id_fondo_cesantias: number;

  dias_vacaciones: number;

  id_estado_civil: number;
  id_medio_transporte: number;

  estado_empleado: string;
  es_jefe: boolean;

  id_tipo_contrato: number;
  id_jefe?: number;
}

export type UpdateEmpleado = Partial<Empleado>;

export interface EmpleadoReport extends Empleado {
  // Documento
  tipo_documento: string;

  // Ciudades
  ciudad_expedicion: string;
  ciudad_residencia: string;

  // Organización
  cargo: string;
  grupo: string;
  area: string;

  // Sexo
  codigo_sexo: string;
  sexo: string;
  tratamiento: string;

  // Seguridad social
  eps: string;
  fondo_pension: string;
  fondo_cesantias: string;

  // Estado civil / familia
  estado_civil: string;
  cantidad_hijos: number;
  hijos: string;

  // Transporte
  medio_transporte: string;

  // Jefe
  cedula_jefe?: string;
  nombre_jefe?: string;
  correo_jefe?: string;

  // Usuario / roles
  id_usuario?: number;
  roles?: string[];

  // Grupos colaborativos
  id_jefe_grupo_colaborativo?: number;
  jefe_grupo_colaborativo?: string;

  id_grupo_colaborativo?: number;
  nombre_grupo_colaborativo?: string;

  // Contrato
  tipo_contrato: string;
}

export interface FormFilterEmployees {
  nombre: string;
}
