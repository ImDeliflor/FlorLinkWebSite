import type { HasLoteEnum, TipoDocumentoEnum } from "./enums";

export interface StoreEntry {
  id_entrada_almacen?: number;
  tipo_documento: TipoDocumentoEnum;
  nro_factura: string;
  fecha_entrada?: string;
  cod_producto?: number;
  cantidad: number;
  precio_unidad: number;
  observacion: string;
  created_by?: number;
  fecha_factura?: string;
}

export interface ProcessStoreEntry {
  id_entrada_almacen?: number;
  tipo_documento: TipoDocumentoEnum;
  nro_factura?: string | null;
  fecha_entrada: string;
  cod_producto?: number;
  cantidad: number;
  precio_unidad: number;
  observacion?: string;
  created_by?: number;
  fecha_factura?: string;
  has_lote: HasLoteEnum;
  motivo_ajuste_nd?: string;
  id_lote?: number;
}

export interface StoreEntryReport {
  id_entrada_almacen?: number;
  tipo_documento: "FACTURA" | "NC" | "ND";
  nro_factura: string;
  fecha_entrada: string;
  fecha_factura: string;
  cod_producto: number;
  id_categoria: number;
  nombre_categoria_producto: string;
  descripcion: string;
  unidad_medida: string;
  cantidad: number;
  precio_unidad: number;
  observacion: string;
  created_by: number;
  registrado_por: string;
}

export interface FormFilterEntries {
  categoria: string;
  descripcion: string;
  unidad_medida: string;
}
