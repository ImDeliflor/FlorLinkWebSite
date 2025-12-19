import { createContext } from "react";
import type { useLoteProducts } from "../hooks/useLoteProducts";

export const LoteProductsContext = createContext<ReturnType<
  typeof useLoteProducts
> | null>(null);
