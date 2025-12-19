import { createContext } from "react";
import type { useStoreProducts } from "../hooks/useStoreProducts";

export const StoreProductsContext = createContext<ReturnType<
  typeof useStoreProducts
> | null>(null);
