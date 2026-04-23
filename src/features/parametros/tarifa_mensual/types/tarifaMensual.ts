export interface TarifaMensual {
  id_tipo_tarifa: number;
  fecha_periodo: string;
  valor_total_factura: number;
  valor_unidad_medida: number;
  fecha_registro?: string;
  created_by?: number;
  valor_porcentual?: number | null;
  id_centro_costos?: number | null;
}

export interface TarifaMensualReport {
  id_tarifa_mensual: number;
  id_tipo_tarifa: number;
  nombre_tipo_tarifa: string;
  fecha_periodo: string;
  valor_total_factura: number;
  valor_unidad_medida: number;
  valor_porcentual: number;
  id_centro_costos: number;
  nombre_centro_costos: string;
  fecha_registro: string;
  created_by: number;
  nombre_usuario: string;
}

export interface FormFilterTarifasMensuales {
  tipo_tarifa: string;
  fecha_periodo: string;
  centro_costos: string;
}
