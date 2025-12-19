import type { ReactNode } from "react";
import { useBasicTables } from "../hooks/useBasicTables";
import { BasicTablesContext } from "./BasicTablesContext";

export const BasicTablesProvider = ({ children }: { children: ReactNode }) => {
  const basicTables = useBasicTables();

  return (
    <BasicTablesContext.Provider value={basicTables}>
      {children}
    </BasicTablesContext.Provider>
  );
};
