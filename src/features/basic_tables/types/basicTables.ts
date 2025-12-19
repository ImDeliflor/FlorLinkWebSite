// Interfaces y types para Categoria
export interface Categoria {
  id_categoria_producto?: number;
  nombre_categoria_producto: string;
}

export type Categorias = Categoria[];

export interface Laboratorio {
  id_laboratorio: number;
  nombre_laboratorio: string;
}

export interface CentroCostos {
  id_centro_costos: number;
  nombre_centro_costos: string;
}
