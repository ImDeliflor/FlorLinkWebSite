import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error("useProductContext debe usarse dentro de OrderProvider");
  return ctx;
};
