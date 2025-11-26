// Interface para los productos
export interface Product {
  id_detalle_compra?: number;
  id_categoria: number;
  id_orden_compra?: number;
  descripcion_producto: string;
  unidad_medida: string;
  cantidad_solicitada: number;
  estado_detalle_compra: "Pendiente" | "Aprobado" | "Rechazado";
}

// Interface para modificar los productos
export interface UpdateProduct {
  id_detalle_compra: number;
  id_categoria?: number;
  descripcion_producto?: string;
  unidad_medida?: string;
  cantidad_solicitada?: number;
  estado_detalle_compra?: "Pendiente" | "Aprobado" | "Rechazado";
  fecha_validacion_detalle_compra?: string;
}

// Interface para la vista detallada de los productos
export interface DetalleCompra {
  id_detalle_compra: number;
  fecha: string; // formato ISO (ej: "2025-10-10T12:37:58.000Z")
  nro_orden_compra: number;
  grupo_colaborativo: string;
  id_categoria: number;
  categoria_producto: string;
  descripcion_producto: string;
  cantidad_solicitada: number;
  unidad_medida: string;
  id_solicitante: number;
  solicitado_por: string;
  id_aprobador: number;
  aprobado_por: string;
  observaciones: string;
  estado_detalle_compra: "Pendiente" | "Aprobado" | "Rechazado";
  fecha_validacion_detalle_compra: string | null;
  estado_compra:
    | "En proceso"
    | "Aprobado"
    | "Rechazado"
    | "Confirmado"
    | "Cerrado";
  precio_total: number;
  fecha_validacion_orden_compra: string | null;
}
