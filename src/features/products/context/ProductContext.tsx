import { createContext } from "react";
import type { useProduct } from "../hooks/useProduct";

export const ProductContext = createContext<ReturnType<
  typeof useProduct
> | null>(null);
