export interface StoreProduct {
  cod_producto?: number;
  id_categoria: number;
  descripcion: string;
  unidad_medida: string;
  fecha_registro: string;
}

export interface StoreProductReport {
  cod_producto?: number;
  id_categoria: number;
  nombre_categoria_producto: string;
  descripcion: string;
  unidad_medida: string;
  fecha_registro?: string;
}

export interface FormFilterProducts {
  categoria: string;
  descripcion: string;
  unidad_medida: string;
}
