import type { ReactNode } from "react";
import { useStoreIssues } from "../hooks/useStoreIssues";
import { StoreIssuesContext } from "./StoreIssuesContext";

export const StoreIssuesProvider = ({ children }: { children: ReactNode }) => {
  const store = useStoreIssues();

  return (
    <StoreIssuesContext.Provider value={store}>
      {children}
    </StoreIssuesContext.Provider>
  );
};
