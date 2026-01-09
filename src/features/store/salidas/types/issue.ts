export interface StoreIssue {
  id_salida_almacen?: number;
  tipo_documento: string;
  fecha_salida?: string;
  cod_producto?: number;
  cantidad: number;
  id_centro_costos: number;
  observacion: string;
  created_by?: number | undefined | null;
  id_lote_producto?: number | null;
  fecha_aplicacion?: string;
}

export type UpdateStoreIssue = Partial<StoreIssue>;

export interface StoreIssueReport extends StoreIssue {
  id_categoria: number;
  nombre_categoria_producto: string;
  descripcion: string;
  unidad_medida: string;
  nombre_centro_costos: string;
  nro_lote: string;
  fecha_ingreso_lote: string;
  fecha_vencimiento_lote: string;
  id_laboratorio_lote: number;
  categoria_toxicologica_lote: string;
  registrado_por: string;
}

export interface FormFilterIssues {
  categoria: string;
  descripcion: string;
  unidad_medida: string;
}
