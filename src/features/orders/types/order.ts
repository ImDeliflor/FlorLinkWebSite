// Interface para las ordenes de compra
export interface Order {
  id_orden_compra?: number;
  id_grupo_colaborativo: number | null | undefined;
  fecha: string;
  observaciones: string;
  solicitado_por: number | null | undefined;
  aprobado_por?: number | null | undefined;
  estado_compra:
    | "En proceso"
    | "Aprobado por gerencia"
    | "Rechazado por gerencia"
    | "Rechazado por lider";
  fecha_validacion_orden_compra?: string;
}

export interface UpdateOrder {
  id_orden_compra?: number;
  id_grupo_colaborativo?: number;
  fecha?: string;
  observaciones?: string;
  solicitado_por?: number;
  aprobado_por?: number;
  estado_compra?:
    | "En proceso"
    | "Aprobado por gerencia"
    | "Rechazado por gerencia"
    | "Rechazado por lider";
  fecha_validacion_orden_compra?: string;
}

export type OrdersList = Order[];
