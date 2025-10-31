import { useContext } from "react";
import { BasicTablesContext } from "../context/BasicTablesContext";

export const useBasicTablesContext = () => {
  const ctx = useContext(BasicTablesContext);
  if (!ctx)
    throw new Error("useOrderContext debe usarse dentro de OrderProvider");
  return ctx;
};
