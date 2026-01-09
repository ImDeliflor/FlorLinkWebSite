export const HasLoteEnum = {
  SI: "si",
  NO: "no",
} as const;

export type HasLoteEnum = (typeof HasLoteEnum)[keyof typeof HasLoteEnum];

// ----------------------------------

export const TipoDocumentoEnum = {
  FACTURA: "FACTURA",
  NC: "NC",
  ND: "ND",
  AJUSTE_INVENTARIO: "AJUSTE INVENTARIO",
} as const;

export type TipoDocumentoEnum =
  (typeof TipoDocumentoEnum)[keyof typeof TipoDocumentoEnum];
