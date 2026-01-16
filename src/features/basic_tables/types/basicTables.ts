// Interfaces y types para Categoria
export interface Categoria {
  id_categoria_producto?: number;
  nombre_categoria_producto: string;
}

export type Categorias = Categoria[];

export interface Laboratorio {
  id_laboratorio: number;
  nombre_laboratorio: string;
}

export interface CentroCostos {
  id_centro_costos: number;
  nombre_centro_costos: string;
}

export interface TipoDocumento {
  id_tipo_documento: number;
  nombre_tipo_documento: string;
}

export interface Ciudad {
  id_ciudad: number;
  nombre_ciudad: string;
  id_departamento: number;
}

export interface Cargo {
  id_cargo: number;
  nombre_cargo: string;
  id_grupo: number;
}

export interface Area {
  id_area: number;
  nombre_area: string;
}

export interface Sexo {
  id_sexo: number;
  codigo: string;
  descripcion: string;
}

export interface Eps {
  id_eps: number;
  nombre_eps: string;
  estado_eps: boolean;
}

export interface FondoPensiones {
  id_fondo_pension: number;
  nombre_fondo_pensiones: string;
}

export interface FondoCesantias {
  id_fondo_cesantias: number;
  nombre_fondo_cesantias: string;
}

export interface EstadoCivil {
  id_estado_civil: number;
  nombre_estado_civil: string;
}

export interface MedioTransporte {
  id_medio_transporte: number;
  nombre_medio_transporte: string;
}

export interface TipoContrato {
  id_tipo_contrato: number;
  nombre_tipo_contrato: string;
}
