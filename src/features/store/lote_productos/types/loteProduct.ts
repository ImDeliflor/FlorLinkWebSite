export interface LoteProduct {
  id_lote_producto?: number;
  cod_producto?: number;
  nro_lote: string;
  fecha_ingreso?: string;
  fecha_vencimiento: string;
  id_laboratorio: number;
  categoria_toxicologica: "I" | "II" | "III" | "IV" | "No aplica";
  cantidad_disponible_lote: number;
}

export type UpdateLoteProduct = Partial<LoteProduct>;
