export interface StoreInventory {
  id_inventario?: number;
  cod_producto: number;
  inventario_actual: number;
}

export type UpdateStoreInventory = Partial<StoreInventory>;

export interface StoreInventoryReport {
  id_inventario?: number;
  cod_producto: number;
  id_categoria: number;
  nombre_categoria_producto: string;
  descripcion: string;
  unidad_medida: string;
  inventario_actual: number;
  tiene_lote_disponible: boolean;
}

export interface FormFilterInventory {
  categoria: string;
  descripcion: string;
  unidad_medida: string;
}
