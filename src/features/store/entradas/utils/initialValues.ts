import type { StoreEntry } from "../types/entry";

export const initialValueEntry: StoreEntry = {
  tipo_documento: "FACTURA",
  fecha_factura: "",
  nro_factura: "",
  cantidad: 0,
  precio_unidad: 0,
  observacion: "Sin observaciones",
};
