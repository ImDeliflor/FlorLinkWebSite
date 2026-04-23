export interface CostoFijo {
  id_concepto_costo?: number;
  fecha_periodo: string;
  valor_total_costo: number;
  id_centro_costos: number;
  porc_impacto: number;
  fecha_registro?: string;
  created_by?: number;
}

export interface CostoFijoReport {
  id_costo: number;
  id_concepto_costo: number;
  nombre_concepto_costo: string;
  fecha_periodo: string;
  valor_total_costo: number;
  id_centro_costos: number;
  nombre_centro_costos: string;
  porc_impacto: number;
  fecha_registro: string;
  created_by: number;
  nombre_usuario: string;
}

export interface FormFilterCostosFijos {
  tipo_concepto: string;
  fecha_periodo: string;
  centro_costos: string;
}
