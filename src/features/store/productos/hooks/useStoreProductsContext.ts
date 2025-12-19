import { useContext } from "react";
import { StoreProductsContext } from "../context/StoreProductsContext";

export const useStoreProductsContext = () => {
  const ctx = useContext(StoreProductsContext);
  if (!ctx)
    throw new Error(
      "useStoreProductsContext debe usarse dentro de StoreProductsProvider"
    );
  return ctx;
};
