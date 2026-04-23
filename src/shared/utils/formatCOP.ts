// Función para formato de pesos en COP
export const formatCOP = (value: number | null | undefined) => {
  if (!value) return "";

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};
