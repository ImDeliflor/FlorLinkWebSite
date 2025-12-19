import { createContext } from "react";
import type { useStoreInventory } from "../hooks/useStoreInventory";

export const StoreInventoryContext = createContext<ReturnType<
  typeof useStoreInventory
> | null>(null);
