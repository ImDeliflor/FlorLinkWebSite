import type { ReactNode } from "react";
import { useStorePendEntries } from "../hooks/useStorePendEntries";
import { StorePendEntriesContext } from "./StorePendEntriesContext";

export const StorePendEntriesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const store = useStorePendEntries();

  return (
    <StorePendEntriesContext.Provider value={store}>
      {children}
    </StorePendEntriesContext.Provider>
  );
};
