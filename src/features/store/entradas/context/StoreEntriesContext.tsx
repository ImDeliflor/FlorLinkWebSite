import { createContext } from "react";
import type { useStoreEntries } from "../hooks/useStoreEntries";

export const StoreEntriesContext = createContext<ReturnType<
  typeof useStoreEntries
> | null>(null);
