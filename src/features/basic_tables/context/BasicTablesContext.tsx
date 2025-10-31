import { createContext } from "react";
import type { useBasicTables } from "../hooks/BasicTables";

export const BasicTablesContext = createContext<ReturnType<
  typeof useBasicTables
> | null>(null);
