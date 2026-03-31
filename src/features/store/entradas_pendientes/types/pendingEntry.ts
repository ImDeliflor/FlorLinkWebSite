export interface PendingEntry {
  id_entrada_pendiente?: number;
  cod_producto: number;
  cantidad_a_registrar: number;
  fecha_registro?: string | null;
  estado_entrada: "Pendiente" | "Ingresado";
}

export type UpdatePendingEntry = Partial<PendingEntry>;

export interface PendingEntryReport extends PendingEntry {
  id_categoria: number;
  nombre_categoria_producto: string;
  descripcion: string;
  unidad_medida: string;
}

export interface ProcessEntradaPendiente {
  entrada_pendiente: {
    id_entrada_pendiente: number;
    cantidad_a_registrar: number;
    fecha_registro: string;
  };
  lote_producto: {
    nro_lote: string;
    fecha_ingreso?: string;
    fecha_vencimiento: string;
    id_laboratorio: number;
    categoria_toxicologica: "I" | "II" | "III" | "IV" | "No aplica";
    cantidad_disponible_lote: number;
  }[];
}
