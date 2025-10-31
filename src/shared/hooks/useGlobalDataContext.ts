import { useContext } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";

export const useGlobalDataContext = () => {
  const ctx = useContext(GlobalDataContext);
  if (!ctx)
    throw new Error("useGlobalDataContext debe usarse dentro de OrderProvider");
  return ctx;
};
