import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

export const useEmployeeContext = () => {
  const ctx = useContext(EmployeeContext);
  if (!ctx)
    throw new Error(
      "useEmployeeContext debe usarse dentro de EmployeeProvider"
    );
  return ctx;
};
