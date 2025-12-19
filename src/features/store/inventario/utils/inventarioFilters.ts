import {
  type FormFilterInventory,
  type StoreInventoryReport,
} from "../types/storeInventory";

export function filterInventario(
  inventario: StoreInventoryReport[],
  formFilter: FormFilterInventory
) {
  return inventario.filter((item) => {
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
