import { createContext } from "react";
import type { useGlobalData } from "../hooks/useGlobalData";

export const GlobalDataContext = createContext<ReturnType<
  typeof useGlobalData
> | null>(null);
