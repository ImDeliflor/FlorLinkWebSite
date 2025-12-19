import { useContext } from "react";
import { LoteProductsContext } from "../context/LoteProductsContext";

export const useLoteProductsContext = () => {
  const ctx = useContext(LoteProductsContext);
  if (!ctx)
    throw new Error(
      "useLoteProductsContext debe usarse dentro de LoteProductsProvider"
    );
  return ctx;
};
