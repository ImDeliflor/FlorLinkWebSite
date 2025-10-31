import type { ReactNode } from "react";
import { useProduct } from "../hooks/useProduct";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const order = useProduct();

  return (
    <ProductContext.Provider value={order}>{children}</ProductContext.Provider>
  );
};
