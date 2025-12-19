import { createContext } from "react";
import type { useBasicTables } from "../hooks/useBasicTables";

export const BasicTablesContext = createContext<ReturnType<
  typeof useBasicTables
> | null>(null);
