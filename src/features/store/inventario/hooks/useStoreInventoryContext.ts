import { useContext } from "react";
import { StoreInventoryContext } from "../context/StoreInventoryContext";

export const useStoreInventoryContext = () => {
  const ctx = useContext(StoreInventoryContext);
  if (!ctx)
    throw new Error(
      "useStoreInventoryContext debe usarse dentro de StoreInventoryProvider"
    );
  return ctx;
};
