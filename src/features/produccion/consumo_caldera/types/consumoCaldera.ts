export interface ConsumoCaldera {
  id_consumo_caldera?: number | undefined;
  fecha_hora_inicio: string;
  fecha_hora_fin?: string | undefined;
  id_area_produccion: number;
  reporte_inicial_medidor: number;
  reporte_final_medidor?: number | undefined;
  fecha_creacion: string;
  fecha_modificacion?: string | undefined;
  created_by: number;
}

export interface ConsumoCalderaReport {
  id_consumo_caldera: number;
  fecha_hora_inicio: string;
  fecha_hora_fin: string;
  horas_consumo: number;
  id_area_produccion: number;
  nombre_area_produccion: string;
  id_centro_costos: number;
  nombre_centro_costos: string;
  reporte_inicial_medidor: number;
  reporte_final_medidor: number;
  total_consumo_medidor: number;
  fecha_creacion: string;
  fecha_modificacion: string;
  created_by: number;
  nombre_responsable: string;
}

export type UpdateConsumoCaldera = Partial<ConsumoCaldera>;
