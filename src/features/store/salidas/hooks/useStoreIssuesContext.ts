import { useContext } from "react";
import { StoreIssuesContext } from "../context/StoreIssuesContext";

export const useStoreIssuesContext = () => {
  const ctx = useContext(StoreIssuesContext);
  if (!ctx)
    throw new Error(
      "useStoreIssuesContext debe usarse dentro de StoreIssuesProvider"
    );
  return ctx;
};
