import type { CostoFijo } from "../types/costoFijo";

export const initialValueNewCosto: CostoFijo = {
  id_concepto_costo: 0,
  fecha_periodo: "",
  valor_total_costo: 0,
  id_centro_costos: 0,
  porc_impacto: 0,
};

export const initialValueTratamientoAgua: CostoFijo = {
  id_concepto_costo: 1,
  fecha_periodo: "",
  valor_total_costo: 1934265.91,
  id_centro_costos: 5,
  porc_impacto: 100,
};

export const initialValueDepreciacion: CostoFijo = {
  id_concepto_costo: 2,
  fecha_periodo: "",
  valor_total_costo: 18059666.08,
  id_centro_costos: 5,
  porc_impacto: 100,
};

export const initialValueMantenimiento: CostoFijo = {
  id_concepto_costo: 3,
  fecha_periodo: "",
  valor_total_costo: 10757873.75,
  id_centro_costos: 5,
  porc_impacto: 100,
};

export const initialValueCostos = {
  tipo_concepto: "Todos",
  fecha_periodo: "",
  centro_costos: "Todos",
};
