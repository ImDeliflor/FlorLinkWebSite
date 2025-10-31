import type { ReactNode } from "react";
import { useGlobalData } from "../hooks/useGlobalData";
import { GlobalDataContext } from "./GlobalDataContext";

export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const globalData = useGlobalData();

  return (
    <GlobalDataContext.Provider value={globalData}>
      {children}
    </GlobalDataContext.Provider>
  );
};
