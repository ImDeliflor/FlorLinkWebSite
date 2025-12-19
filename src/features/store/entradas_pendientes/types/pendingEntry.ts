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
