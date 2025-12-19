import type { FormFilterEntries, StoreEntryReport } from "../types/entry";

export function filterEntradas(
  entries: StoreEntryReport[],
  formFilter: FormFilterEntries
) {
  return entries.filter((item) => {
    const rules: boolean[] = [];

    if (formFilter.categoria !== "Todas") {
      rules.push(
        (item.nombre_categoria_producto || "")
          .toLowerCase()
          .includes(formFilter.categoria.toLowerCase())
      );
    }

    if (formFilter.unidad_medida !== "Todas") {
      rules.push(
        (item.unidad_medida || "")
          .toLowerCase()
          .includes(formFilter.unidad_medida.toLowerCase())
      );
    }

    if (formFilter.descripcion.trim() !== "") {
      rules.push(
        (item.descripcion || "")
          .toLowerCase()
          .includes(formFilter.descripcion.toLowerCase())
      );
    }

    return rules.length === 0 || rules.every(Boolean);
  });
}
