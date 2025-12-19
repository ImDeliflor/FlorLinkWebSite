import type { ReactNode } from "react";
import { useStoreEntries } from "../hooks/useStoreEntries";
import { StoreEntriesContext } from "./StoreEntriesContext";

export const StoreEntriesProvider = ({ children }: { children: ReactNode }) => {
  const store = useStoreEntries();

  return (
    <StoreEntriesContext.Provider value={store}>
      {children}
    </StoreEntriesContext.Provider>
  );
};
