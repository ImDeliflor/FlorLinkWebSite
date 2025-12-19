import type { ReactNode } from "react";
import { useStoreProducts } from "../hooks/useStoreProducts";
import { StoreProductsContext } from "./StoreProductsContext";

export const StoreProductsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const store = useStoreProducts();

  return (
    <StoreProductsContext.Provider value={store}>
      {children}
    </StoreProductsContext.Provider>
  );
};
