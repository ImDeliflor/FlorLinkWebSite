import { createContext } from "react";
import type { useStoreIssues } from "../hooks/useStoreIssues";

export const StoreIssuesContext = createContext<ReturnType<
  typeof useStoreIssues
> | null>(null);
