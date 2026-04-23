import type { TarifaMensual } from "../types/tarifaMensual";

export const initialValueNewTarifa: TarifaMensual = {
  id_tipo_tarifa: 0,
  fecha_periodo: "",
  valor_total_factura: 0,
  valor_unidad_medida: 0,
  valor_porcentual: null,
  id_centro_costos: null,
};

export const initialValueTarifas = {
  tipo_tarifa: "Todas",
  fecha_periodo: "",
  centro_costos: "Todos",
};
