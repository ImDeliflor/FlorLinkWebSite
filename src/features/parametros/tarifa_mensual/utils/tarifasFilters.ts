import type {
  FormFilterTarifasMensuales,
  TarifaMensualReport,
} from "../types/tarifaMensual";

export function filterTarifas(
  tarifas: TarifaMensualReport[],
  formFilter: FormFilterTarifasMensuales,
) {
  return tarifas.filter((item) => {
    const rules: boolean[] = [];

    if (formFilter.tipo_tarifa !== "Todas") {
      rules.push(
        (item.nombre_tipo_tarifa || "")
          .toLowerCase()
          .includes(formFilter.tipo_tarifa.toLowerCase()),
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
