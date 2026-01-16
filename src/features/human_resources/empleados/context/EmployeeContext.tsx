import { createContext } from "react";
import type { useEmployee } from "../hooks/useEmployee";

export const EmployeeContext = createContext<ReturnType<
  typeof useEmployee
> | null>(null);
