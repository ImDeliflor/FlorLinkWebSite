import type { ReactNode } from "react";
import { useEmployee } from "../hooks/useEmployee";
import { EmployeeContext } from "./EmployeeContext";

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const store = useEmployee();

  return (
    <EmployeeContext.Provider value={store}>
      {children}
    </EmployeeContext.Provider>
  );
};
