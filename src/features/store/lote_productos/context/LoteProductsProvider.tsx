import type { ReactNode } from "react";
import { useLoteProducts } from "../hooks/useLoteProducts";
import { LoteProductsContext } from "./LoteProductsContext";

export const LoteProductsProvider = ({ children }: { children: ReactNode }) => {
  const store = useLoteProducts();

  return (
    <LoteProductsContext.Provider value={store}>
      {children}
    </LoteProductsContext.Provider>
  );
};
