import { createContext } from "react";
import type { useStorePendEntries } from "../hooks/useStorePendEntries";

export const StorePendEntriesContext = createContext<ReturnType<
  typeof useStorePendEntries
> | null>(null);
