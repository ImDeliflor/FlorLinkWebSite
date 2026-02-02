// Constante para los grupos de evaluación
export const GrupoEvaluacion = {
  GrupoPrimario: 1,
  JefeToColaborador: 2,
  Autoevaluacion: 3,
  ColaboradorToJefe: 4,
  JefeToOperarios: 5,
} as const;

export type GrupoEvaluacion =
  (typeof GrupoEvaluacion)[keyof typeof GrupoEvaluacion];

// Constante para los diferentes enfoques
export const EnfoqueEvaluacion = {
  Liderazgo: 1,
  Estrategico: 2,
  General: 3,
} as const;

export type EnfoqueEvaluacion =
  (typeof EnfoqueEvaluacion)[keyof typeof EnfoqueEvaluacion];

// Constante para el ADN Deliflor
export const ADNDeliflor = {
  SomosParaClientes: 1,
  ElQueSabe: 2,
  UnidosMasPoderosos: 3,
  TodoYMas: 4,
  Lideres: 5,
  Seguridad: 6,
} as const;

export type ADNDeliflor = (typeof ADNDeliflor)[keyof typeof ADNDeliflor];
