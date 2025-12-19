import { useContext } from "react";
import { StoreEntriesContext } from "../context/StoreEntriesContext";

export const useStoreEntriesContext = () => {
  const ctx = useContext(StoreEntriesContext);
  if (!ctx)
    throw new Error(
      "useStoreEntriesContext debe usarse dentro de StoreEntriesProvider"
    );
  return ctx;
};
