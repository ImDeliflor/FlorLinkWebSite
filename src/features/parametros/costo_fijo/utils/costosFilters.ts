import type {
  CostoFijoReport,
  FormFilterCostosFijos,
} from "../types/costoFijo";

export function filterCostos(
  costos: CostoFijoReport[],
  formFilter: FormFilterCostosFijos,
) {
  return costos.filter((item) => {
    const rules: boolean[] = [];

    if (formFilter.tipo_concepto !== "Todos") {
      rules.push(
        (item.nombre_concepto_costo || "")
          .toLowerCase()
          .includes(formFilter.tipo_concepto.toLowerCase()),
      );
    }

    if (formFilter.centro_costos !== "Todos") {
      rules.push(
        (item.nombre_centro_costos || "")
          .toLowerCase()
          .includes(formFilter.centro_costos.toLowerCase()),
      );
    }

    if (formFilter.fecha_periodo.trim() !== "") {
      rules.push(
        (item.fecha_periodo || "")
          .toLowerCase()
          .includes(formFilter.fecha_periodo.toLowerCase()),
      );
    }

    return rules.length === 0 || rules.every(Boolean);
  });
}
